import React, { useContext, useRef, useState } from 'react';
import clsx from 'clsx';
import { NextSeo } from 'next-seo';
import { Col, Container, Row } from 'reactstrap';
import { useMediaQuery } from '@material-ui/core';
import PhoneIcon from '@material-ui/icons/Phone';
import Typography from '@material-ui/core/Typography';
import useTheme from '@material-ui/core/styles/useTheme';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Alert from '@material-ui/lab/Alert';
import useTranslation from 'next-translate/useTranslation';
import { ReactComponent as StarSVG } from '../../../../public/images/svg/star.svg';
import { ReactComponent as StarSVGYellow } from '../../../../public/images/svg/star-yellow.svg';
import GoogleMapStatic from '../../../components/GoogleMapStatic';
import GalleryViewer from '../../../components/Gallery/GalleryViewer';
import GalleryImgsLazy from '../../../components/Gallery/GalleryImgsLazy';
import DamageViewerTabs from '../../../components/Damages/DamageViewerTabs';
import CarInfos from '../../../components/Vehicles/car/CarInfos';
import Comments from '../../../components/Comments/Comments';
import TitleMUI from '../../../components/TitleMUI';
import TagsList from '../../../components/Tags/TagsList';
import CTALink from '../../../components/CTALink';
import AnnounceService from '../../../services/AnnounceService';
import AnnounceClass from '../../../models/announce.model';
import { ModalDialogContext } from '../../../context/ModalDialogContext';
import { useAuth } from '../../../context/AuthProvider';
import { getTimeAgo } from '../../../libs/utils';
import Error from '../../_error';

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
        border: '1px solid gainsboro',
        borderRadius: '5px',
    },
}));

const Announce = ({ slug, announceRaw, err, ...props }) => {
    const refImg = useRef();
    const theme = useTheme();
    const classes = useStyles();
    const { isAuthenticated, authenticatedUser, setForceLoginModal } = useAuth();
    const { dispatchModalError } = useContext(ModalDialogContext);
    const announce = new AnnounceClass(announceRaw);
    const { t, lang } = useTranslation();
    const [likesCounter, setLikesCounter] = useState(announce.getLikesLength);
    const isAuthor = isAuthenticated && authenticatedUser.getID === announce.getAuthor?.getID;
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'), {
        defaultMatches: true,
    });

    if (announceRaw === undefined || err) {
        return <Error message={err.message} statusCode={err.statusCode}/>;
    }

    const handleCLickImg = (index) => {
        if (refImg.current) {
            refImg.current.slideToIndex(index);
            refImg.current.fullScreen();
        }
    };

    const alreadyLikeCurrentUser = () => {
        const matchUserFavorite = authenticatedUser.getFavorites.find(favorite => favorite.id === announce.getID);
        const matchAnnounceLike = announce.getLikes.find(like => like.user === authenticatedUser.getID);
        return !!matchUserFavorite || !!matchAnnounceLike;
    };

    const handleClickLikeButton = async () => {
        if (!isAuthenticated) return setForceLoginModal(true);
        try {
            if (alreadyLikeCurrentUser()) {
                await AnnounceService.addLikeLoggedInUser(announce.getID);
                setLikesCounter(likesCount => likesCount + 1);
            } else {
                await AnnounceService.removeLikeLoggedInUser(announce.getID);
                setLikesCounter(likesCount => likesCount - 1);
            }
        } catch (err) {
            dispatchModalError({ err });
        }
    };

    return (
        <Container>
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
                            <TitleMUI as="h1" variant="h1"><strong>{announce.getTitle}</strong></TitleMUI>
                            <div className={classes.formRow}>
                                <Typography as="h2" variant="h2">
                                    {announce.getManufacturerFormated}
                                </Typography>
                                <div>
                                    <small>{getTimeAgo(announce.getCreationDate.raw, lang)}</small>
                                </div>
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

                            <div className="pic" style={{ flex: 4 }}>
                                <Typography variant="h3" component="h2">
                                    {announce.getAuthor.getFullName}
                                </Typography>

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
                                        <PhoneIcon/>
                                        <small>{announce.getAuthor.getPhone}</small>
                                    </p>
                                )}

                                {isAuthor && (
                                    <div className="mx-2">
                                        <CTALink
                                            href={`/announces/${slug}/edit`}
                                            title={t('vehicles:edit-announce')}
                                        />
                                    </div>
                                )}

                            </div>
                        </div>

                        <div className={clsx('price-stars-wrapper', classes.priceStarsWrapper)}>
                            <div className="icons-profile-wrapper">
                                <div
                                    className="icons-star-prof icons-star-current"
                                    onClick={handleClickLikeButton}
                                    title={t('vehicles:like')}>
                                    {alreadyLikeCurrentUser() ? <StarSVGYellow/> : <StarSVG/>}
                                    <span>{likesCounter}</span>
                                </div>
                                <a href="#comments" className="icons-star-prof" title="Commenter">
                                    <img src="/images/svg/comment.svg" alt=""/>
                                    <span>{announce.getCountComments}</span>
                                </a>
                            </div>
                            <p className="price-announce">
                                {announce.getPrice} €TTC
                                <span> {announce.getPriceHT} €HT</span>
                            </p>
                        </div>

                        <Typography component="p" variant="h4" gutterBottom>Tags
                            ({announce.getTags.length})</Typography>
                        <TagsList tags={announce.getTags}/>

                    </Col>
                </Row>

                <section className="my-2">
                    <div className={classes.wysiwyg}>
                        {announce.getDescription}
                    </div>
                </section>

                <section className="my-2">
                    <Typography component="h3" variant="h3">{t('vehicles:vehicle-informations')}</Typography>
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
                    <TitleMUI as="h3" variant="h3">{t('vehicles:localiastion')}</TitleMUI>
                    {announce.getLocation.latitude && announce.getLocation.longitude && (
                        <GoogleMapStatic
                            width={600}
                            height={300}
                            markers={[
                                [announce.getLocation.latitude, announce.getLocation.longitude].join(' ')]
                            }
                        />
                    )}
                </section>

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
        const announceRaw = await AnnounceService.getAnnounceBySlugSSR(slug, additionalHeaders);
        return {
            props: {
                slug,
                additionalHeaders,
                announceRaw,
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
