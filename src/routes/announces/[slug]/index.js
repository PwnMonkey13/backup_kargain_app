import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import clsx from 'clsx';
import { NextSeo } from 'next-seo';
import Link from 'next-translate/Link';
import { useRouter } from 'next/router'
import { Col, Container, Row } from 'reactstrap';
import Alert from '@material-ui/lab/Alert';
import { useMediaQuery } from '@material-ui/core';
import CommentIcon from '@material-ui/icons/Comment';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import Typography from '@material-ui/core/Typography';
import useTheme from '@material-ui/core/styles/useTheme';
import makeStyles from '@material-ui/core/styles/makeStyles';
import useTranslation from 'next-translate/useTranslation';
import { ReactComponent as StarSVG } from '../../../../public/images/svg/star.svg';
import { ReactComponent as StarSVGYellow } from '../../../../public/images/svg/star-yellow.svg';
import GalleryViewer from '../../../components/Gallery/GalleryViewer';
import GalleryImgsLazy from '../../../components/Gallery/GalleryImgsLazy';
import DamageViewerTabs from '../../../components/Damages/DamageViewerTabs';
import CarInfos from '../../../components/Products/car/CarInfos';
import Comments from '../../../components/Comments/Comments';
import TagsList from '../../../components/Tags/TagsList';
import CTALink from '../../../components/CTALink';
import AnnounceService from '../../../services/AnnounceService';
import AnnounceModel from '../../../models/announce.model';
import { ModalDialogContext } from '../../../context/ModalDialogContext';
import { useAuth } from '../../../context/AuthProvider';
import { getTimeAgo } from '../../../libs/utils';
import ModalContact from '../../../components/ModalContact';
import ModalFollowers from '../../../components/ModalFollowers';
import Error from '../../_error';

const useStyles = makeStyles(() => ({
    formRow: {
        display: 'flex',

        '& > div': {
            margin: '1rem',
            flex: 1
        }
    },
    priceRow : {
        display: 'flex',
        justifyContent : "space-between"
    },
    priceStarsWrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        margin: '15px 0',
        borderBottom : '1px solid'
    },
    wysiwyg: {
        margin: '1rem',
        padding: '1rem'
    }
}));

const Announce = () => {
    const refImg = useRef();
    const theme = useTheme();
    const classes = useStyles();
    const router = useRouter();
    const { slug } = router.query
    const { t, lang } = useTranslation();
    const { isAuthenticated, authenticatedUser, setForceLoginModal } = useAuth();
    const { dispatchModalError } = useContext(ModalDialogContext);
    const [openModalContact, setOpenModalContact] = useState(false);
    const [openModalFollowers, setOpenModalFollowers] = useState(false);
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'), {
        defaultMatches: true
    });

    const [state, setState] = useState({
        err : null,
        stateReady : false,
        isSelf : false,
        isAdmin : false,
        announce : new AnnounceModel(),
        likesCounter : 0

    });

    const handleOpenModalContact = () => {
        setOpenModalContact(true);
    };

    const handleCloseModalContact = () => {
        setOpenModalContact(false);
    };

    const handleOpenModalFollowers = () => {
        setOpenModalFollowers(true);

    };

    const handleCloseModalFollowers = () => {
        setOpenModalFollowers(false);
    };

    const handleCLickImg = (index) => {
        if (refImg.current) {
            refImg.current.slideToIndex(index);
            refImg.current.fullScreen();
        }
    };

    const checkIfAlreadyLike = () => {
        const matchUserFavorite = authenticatedUser.getFavorites.find(favorite => favorite?.id === state.announce.getID);
        const matchAnnounceLike = state.announce.getLikes.find(like => like?.user?.id === authenticatedUser.getID);
        return !!matchUserFavorite || !!matchAnnounceLike;
    };

    const alreadyLikeCurrentUser = checkIfAlreadyLike();

    const handleClickLikeButton = async () => {
        if (!isAuthenticated) return setForceLoginModal(true);
        let counter = state.likesCounter;
        try {
            if (alreadyLikeCurrentUser) {
                await AnnounceService.removeLikeLoggedInUser(state.announce.getID);
                counter -= 1;
            } else {
                await AnnounceService.addLikeLoggedInUser(state.announce.getID);
                counter += 1;
            }
            if (counter < 0) counter = 0;
            setState(state => ({
                ...state,
                counter
            }))

        } catch (err) {
            dispatchModalError({ err });
        }
    };

    const fetchAnnounce = useCallback(async () => {
        try{
            const result = await AnnounceService.getAnnounceBySlug(slug);
            const { announce, isAdmin, isSelf } = result
            setState(state => ({
                ...state,
                stateReady : true,
                announce : new AnnounceModel(announce),
                isAdmin,
                isSelf
            }))
        } catch (err) {
            setState(state => ({
                ...state,
                stateReady: true,
                err
            }))
        }
    },[slug])

    useEffect(()=>{
        fetchAnnounce()
    },[fetchAnnounce])

    if (!state.stateReady) return null;
    if (state.err) return <Error statusCode={state.err?.statusCode}/>;

    console.log(state)

    return (
        <Container>
            <ModalContact
                recipient={state.announce.getAuthor}
                handleClose={handleCloseModalContact}
                open={openModalContact}
            />

            <ModalFollowers
                likes={state.announce.getLikes}
                handleClose={handleCloseModalFollowers}
                open={openModalFollowers}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            />

            {state.isAdmin && (
                <Alert severity="info" className="mb-2">
                    Connected as Admin
                </Alert>
            )}

            <div className="objava-wrapper">
                <NextSeo
                    title={`${state.announce.getTitle} - Kargain`}
                    description={state.announce.getTheExcerpt()}
                />

                {!state.announce.getIsActivated && (
                    <Alert severity="warning">
                        Your announce is hidden from public & waiting for moderator activation
                    </Alert>
                )}

                {!state.announce.getIsVisible && (
                    <Alert color="warning">
                        Your announce is currently not published (draft mode)
                    </Alert>
                )}

                <Row>
                    <Col sm={12} md={6}>
                        <div className="top">
                            <Typography as="h2" variant="h2">
                                {state.announce.getTitle}
                            </Typography>
                            <Typography as="h2" variant="h3">
                                {state.announce.getManufacturerFormated}
                            </Typography>

                            <div className={classes.priceRow}>
                                <p className="price-announce">
                                    {state.announce.getPrice} €TTC
                                    <span> {state.announce.getPriceHT} €HT</span>
                                </p>

                                <p>
                                    <small>{getTimeAgo(state.announce.getCreationDate.raw, lang)}</small>
                                    <img
                                        className="mx-1"
                                        src='/images/share.png'
                                        alt="share"
                                        onClick={() => {
                                            console.log('TODO SHARE')
                                        }}
                                    />
                                </p>
                            </div>
                        </div>

                        <div className="pics">
                            {state.announce.getCountImages > 0 && (
                                <>
                                    <GalleryViewer images={state.announce.getImages} ref={refImg}/>
                                    {isDesktop && (
                                        <GalleryImgsLazy
                                            images={state.announce.getImages}
                                            handleCLickImg={handleCLickImg}
                                        />
                                    )}
                                </>
                            )}
                        </div>
                    </Col>

                    <Col sm={12} md={6}>
                        <div className={classes.formRow}>
                            <div className="pic" style={{ flex: 1 }}>
                                <img
                                    src={state.announce.getAuthor.getAvatar}
                                    className="img-profile-wrapper avatar-preview"
                                    width={80}
                                    alt={state.announce.getTitle}
                                />
                            </div>

                            <div style={{ flex: 4 }}>
                                <Link href={`/profile/${state.announce.getAuthor.getUsername}`}>
                                    <a>
                                        <Typography variant="h3" component="h2">
                                            {state.announce.getAuthor.getFullName}
                                        </Typography>
                                    </a>
                                </Link>

                                {state.announce.getAdOrAuthorCustomAddress(['city', 'postCode']) && (
                                    <div className="top-profile-data-wrapper">
                                        <a href={state.announce.buildAddressGoogleMapLink()}
                                            target="_blank"
                                            rel="noreferrer">
                                            <span className="top-profile-location">
                                                <img className="mx-1" src="/images/location.png" alt=""/>
                                                {state.announce.getAdOrAuthorCustomAddress()}
                                            </span>
                                        </a>
                                    </div>
                                )}
                                {state.announce.showCellPhone && <p> {state.announce.getAuthor.getPhone} </p> }
                            </div>
                        </div>

                        <TagsList tags={state.announce.getTags}/>

                        <div className={clsx('price-stars-wrapper', classes.priceStarsWrapper)}>
                            <div className="icons-profile-wrapper">
                                <div className="icons-star-prof">
                                    <span onClick={()=>handleClickLikeButton()}>
                                        {alreadyLikeCurrentUser ? <StarSVGYellow/> : <StarSVG/>}
                                    </span>
                                    <span onClick={() => handleOpenModalFollowers()}>
                                        {state.likesCounter}
                                    </span>
                                </div>

                                <div className="icons-star-prof">
                                    <CommentIcon/>
                                    <span>{state.announce.getCountComments}</span>
                                </div>

                                {state.isSelf ? (
                                    <div className="mx-2">
                                        <CTALink
                                            href={state.announce.getAnnounceEditLink}
                                            title={t('vehicles:edit-announce')}
                                        />
                                    </div>
                                ) : (
                                    <div
                                        className="icons-star-prof mx-2"
                                        onClick={()=>handleOpenModalContact(true)}>
                                        <MailOutlineIcon/>
                                    </div>
                                )}
                            </div>
                        </div>

                        <Comments announceRaw={state.announce.getRaw}/>
                    </Col>
                </Row>

                <section className="my-2">
                    <Typography component="h3" variant="h3">{t('vehicles:vehicle-data')}</Typography>
                    <CarInfos
                        announce={state.announce}
                        enableThirdColumn
                    />
                </section>

                <section className="my-2">
                    <Typography component="h3" variant="h3">{t('vehicles:equipments')}</Typography>
                    <Row>
                        {state.announce.getVehicleEquipments && state.announce.getVehicleEquipments.map((equipment, index) => {
                            return (
                                <Col sm={6} md={3} key={index}>
                                    <div className="equipment m-3">
                                        <Typography>{equipment.label}</Typography>
                                    </div>
                                </Col>
                            );
                        })}
                    </Row>
                </section>

                <section className="my-2">
                    <Typography component="h3" variant="h3">{t('vehicles:description')}</Typography>
                    <div className={classes.wysiwyg}>
                        {state.announce.getDescription}
                    </div>
                </section>

                <section className="my-2">
                    <Typography component="h3" variant="h3">
                        {t('vehicles:data-sheet')} ({state.announce.getCountDamages})
                    </Typography>
                    <DamageViewerTabs
                        tabs={state.announce.getDamagesTabs}
                        vehicleType={state.announce.getVehicleType}
                    />
                </section>
            </div>
        </Container>
    );
};

export default Announce;
