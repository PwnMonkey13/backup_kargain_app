import React, { useContext, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { NextSeo } from 'next-seo';
import { Col, Container, Row } from 'reactstrap';
import Link from 'next-translate/Link';
import { useMediaQuery } from '@material-ui/core';
import MoreIcon from '@material-ui/icons/More';
import Typography from '@material-ui/core/Typography';
import useTheme from '@material-ui/core/styles/useTheme';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Alert from '@material-ui/lab/Alert';
import useTranslation from 'next-translate/useTranslation';
import { ReactComponent as StarSVG } from '../../../../public/images/svg/star.svg';
import { ReactComponent as StarSVGYellow } from '../../../../public/images/svg/star-yellow.svg';
import GalleryViewer from '../../../components/Gallery/GalleryViewer';
import GalleryImgsLazy from '../../../components/Gallery/GalleryImgsLazy';
import DamageViewerTabs from '../../../components/Damages/DamageViewerTabs';
import CarInfos from '../../../components/Vehicles/car/CarInfos';
import Comments from '../../../components/Comments/Comments';
import TitleMUI from '../../../components/TitleMUI';
import TagsList from '../../../components/Tags/TagsList';
import CTALink from '../../../components/CTALink';
import AnnounceService from '../../../services/AnnounceService';
import AnnounceModel from '../../../models/announce.model';
import { ModalDialogContext } from '../../../context/ModalDialogContext';
import { useAuth } from '../../../context/AuthProvider';
import { getTimeAgo } from '../../../libs/utils';
import Error from '../../_error';
import Button from '@material-ui/core/Button';
import ChatIcon from '@material-ui/icons/Chat';
import UserModel from '../../../models/user.model';
import ModalContact from '../../../components/ModalContact';
import ModalFollowers from '../../../components/ModalFollowers';

const useStyles = makeStyles((theme) => ({
    formRow: {
        display: 'flex',

        '& > div': {
            margin: '1rem',
            flex: 1,
        },
    },
    priceStarsWrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        margin: '15px 0',
    },
    wysiwyg: {
        margin: '1rem',
        padding: '1rem',
    },
}));

const Announce = ({ data, announceRaw, isAdmin, isSelf, err }) => {
    const refImg = useRef();
    const theme = useTheme();
    const classes = useStyles();
    const { t, lang } = useTranslation();
    const { isAuthReady, isAuthenticated, authenticatedUser, setForceLoginModal } = useAuth();
    const [stateReady, setStateReady] = useState(false);
    const { dispatchModalError } = useContext(ModalDialogContext);
    const announce = new AnnounceModel(announceRaw);
    const [likesCounter, setLikesCounter] = useState(announce.getLikesLength);
    const [openModalContact, setOpenModalContact] = useState(false);
    const [openModalFollowers, setOpenModalFollowers] = useState(false);
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'), {
        defaultMatches: true,
    });

    console.log(err);
    console.log(announceRaw);

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
        const matchUserFavorite = authenticatedUser.getFavorites.find(favorite => favorite?.id === announce.getID);
        const matchAnnounceLike = announce.getLikes.find(like => like?.user?.id === authenticatedUser.getID);
        return !!matchUserFavorite || !!matchAnnounceLike;
    };

    const alreadyLikeCurrentUser = checkIfAlreadyLike();

    const handleClickLikeButton = async () => {
        if (!isAuthenticated) return setForceLoginModal(true);
        let counter = likesCounter;
        try {
            if (alreadyLikeCurrentUser) {
                await AnnounceService.removeLikeLoggedInUser(announce.getID);
                counter -= 1;
            } else {
                await AnnounceService.addLikeLoggedInUser(announce.getID);
                counter += 1;
            }
            if (counter < 0) counter = 0;
            setLikesCounter(counter);

        } catch (err) {
            dispatchModalError({ err });
        }
    };

    useEffect(() => {
        if (isAuthReady) setStateReady(true);
    }, [isAuthReady]);

    if (!stateReady) return null;
    if (announceRaw === undefined || err) return <Error statusCode={err?.statusCode}/>;

    return (
        <Container>
            <ModalContact
                recipient={announce.getAuthor}
                handleClose={handleCloseModalContact}
                open={openModalContact}
            />

            <ModalFollowers
                likes={announce.getLikes}
                handleClose={handleCloseModalFollowers}
                open={openModalFollowers}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            />

            {isAdmin && (
                <Alert severity="info" className="mb-2">
                    Connected as Admin
                </Alert>
            )}

            <div className="objava-wrapper">
                <NextSeo
                    title={`${announce.getTitle} - Kargain`}
                    description={announce.getTheExcerpt()}
                />

                {!announce.getIsActivated && (
                    <Alert severity="warning">
                        Your announce is hidden from public & waiting for moderator activation
                    </Alert>
                )}

                {!announce.getIsVisible && (
                    <Alert color="warning">
                        Your announce is currently not published (draft mode)
                    </Alert>
                )}

                <Row>
                    <Col sm={12} md={6}>
                        <div className="top">
                            <Typography as="h2" variant="h2">
                                {announce.getTitle}
                            </Typography>
                            <Typography as="h2" variant="h3">
                                {announce.getManufacturerFormated}
                            </Typography>

                            <div className={classes.formRow}>
                                <p className="price-announce">
                                    {announce.getPrice} €TTC
                                    <span> {announce.getPriceHT} €HT</span>
                                </p>

                                <p>
                                    <small>{getTimeAgo(announce.getCreationDate.raw, lang)}</small>
                                </p>
                            </div>
                        </div>

                        <div className="pics">
                            {announce.getCountImages > 0 && (
                                <>
                                    <GalleryViewer images={announce.getImages} ref={refImg}/>
                                    {isDesktop && (
                                        <GalleryImgsLazy
                                            images={announce.getImages}
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
                                    src={announce.getAuthor.getAvatar}
                                    className="img-profile-wrapper avatar-preview"
                                    width={80}
                                    alt={announce.getTitle}
                                />
                            </div>

                            <div style={{ flex: 4 }}>
                                <Link href={`/profile/${announce.getAuthor.getUsername}`}>
                                    <a>
                                        <Typography variant="h3" component="h2">
                                            {announce.getAuthor.getFullName}
                                        </Typography>
                                    </a>
                                </Link>

                                {announce.getAdOrAuthorCustomAddress(['city', 'postCode']) && (
                                    <div className="top-profile-data-wrapper">
                                        <div className="top-profile-location">
                                            <img src="/images/location.png" alt=""/>
                                            {announce.getAdOrAuthorCustomAddress(['city', 'postCode'])}
                                        </div>
                                    </div>
                                )}

                                {announce.showCellPhone && (
                                    <p>
                                        {/*<PhoneIcon/>*/}
                                        <small>{announce.getAuthor.getPhone}</small>
                                    </p>
                                )}
                            </div>
                        </div>

                        <TagsList tags={announce.getTags}/>

                        <div className={clsx('price-stars-wrapper', classes.priceStarsWrapper)}>
                            <div className="icons-profile-wrapper">
                                <div className="icons-star-prof" onClick={handleClickLikeButton}
                                     title={t('vehicles:like')}>
                                    {alreadyLikeCurrentUser ? <StarSVGYellow/> : <StarSVG/>}
                                    <span>{likesCounter}</span>
                                </div>

                                <a href="#comments" className="icons-star-prof" title="Commenter">
                                    <img src="/images/svg/comment.svg" alt=""/>
                                    <span>{announce.getCountComments}</span>
                                </a>

                                {isSelf ? (
                                    <div className="mx-2">
                                        <CTALink
                                            href={announce.getAnnounceEditLink}
                                            title={t('vehicles:edit-announce')}
                                        />
                                    </div>
                                ) : (
                                    <div className="mx-2">
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            startIcon={<ChatIcon/>}
                                            onClick={() => {
                                                handleOpenModalContact(true);
                                            }}
                                        >
                                            {t('vehicles:contact')}
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {announce.getLikes.length && (
                            <div className="my-2">
                                <ul className="d-flex align-items-center list-style-none">
                                    {announce.getLikes.slice(0, 5).map((userLike, index) => {
                                        const user = new UserModel(userLike?.user);
                                        return (
                                            <li key={index} className="nav-item navbar-dropdown p-1">
                                                <img className="dropdown-toggler rounded-circle"
                                                     width="30"
                                                     height="30"
                                                     src={user.getAvatar}
                                                     title={user.getFullName}
                                                     alt={user.getUsername}
                                                />
                                            </li>
                                        );
                                    })}
                                    <li>
                                        <Button
                                            type="button"
                                            onClick={() => handleOpenModalFollowers()}
                                            startIcon={<MoreIcon/>}>
                                        </Button>
                                    </li>
                                </ul>
                            </div>
                        )}

                    </Col>
                </Row>

                <section className="my-2">
                    <Typography component="h3" variant="h3">{t('vehicles:vehicle-data')}</Typography>
                    <CarInfos
                        announce={announce}
                        enableThirdColumn
                    />
                </section>

                <section className="my-2">
                    <Typography component="h3" variant="h3">{t('vehicles:equipments')}</Typography>
                    <Row>
                        {announce.getVehicleEquipments && announce.getVehicleEquipments.map((equipment, index) => {
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
                        {announce.getDescription}
                    </div>
                </section>

                {/*<section className="my-2">*/}
                {/*    <TitleMUI as="h3" variant="h3">{t('vehicles:localiastion')}</TitleMUI>*/}
                {/*    {announce.getLocation.latitude && announce.getLocation.longitude && (*/}
                {/*        <GoogleMapStatic*/}
                {/*            width={600}*/}
                {/*            height={300}*/}
                {/*            markers={[*/}
                {/*                [announce.getLocation.latitude, announce.getLocation.longitude].join(' ')]*/}
                {/*            }*/}
                {/*        />*/}
                {/*    )}*/}
                {/*</section>*/}

                <section className="my-2">
                    <TitleMUI as="h3" variant="h3">{t('vehicles:data-sheet')} ({announce.getCountDamages})</TitleMUI>
                    <DamageViewerTabs tabs={announce.getDamagesTabs}/>
                </section>

                <Comments announceRaw={announceRaw}/>
            </div>
        </Container>
    );
};

export async function getServerSideProps (ctx) {
    const { slug } = ctx.query;
    const additionalHeaders = { Cookie: ctx.req.headers['cookie'] };
    try {
        const { announce, isAdmin, isSelf } = await AnnounceService.getAnnounceBySlugSSR(slug, additionalHeaders);
        return {
            props: {
                announceRaw: announce,
                isAdmin: isAdmin ?? false,
                isSelf: isSelf ?? false,
            },
        };
    } catch (err) {
        return {
            props: {
                slug,
                additionalHeaders,
                err: {
                    message: err?.message ?? null,
                    statusCode: err?.statusCode ?? 404,
                },
            },
        };
    }
}

export default Announce;
