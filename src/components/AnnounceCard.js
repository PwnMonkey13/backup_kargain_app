import React, { useContext, useState } from 'react';
import { Col, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import IconButton from '@material-ui/core/IconButton';
import { PhotoCamera } from '@material-ui/icons';
import Typography from '@material-ui/core/Typography';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next-translate/Link';
import { ReactComponent as StarSVG } from '../../public/images/svg/star.svg';
import { ReactComponent as StarSVGYellow } from '../../public/images/svg/star-yellow.svg';
import { ModalDialogContext } from '../context/ModalDialogContext';
import CommentsListLight from './Comments/CommentsListLight';
import AnnounceService from '../services/AnnounceService';
import AnnounceClass from '../models/announce.model';
import { useAuth } from '../context/AuthProvider';
import { getTimeAgo } from '../libs/utils';
import CarInfos from './Vehicles/car/CarInfos';
import TagsList from './Tags/TagsList';
import TitleMUI from './TitleMUI';
import CTALink from './CTALink';

const AnnounceCard = ({ announceRaw, featuredImgHeight, detailsFontSize }) => {
    const announce = new AnnounceClass(announceRaw);
    const { dispatchModalError } = useContext(ModalDialogContext);
    const [likesCounter, setLikesCounter] = useState(announce.getLikesLength);
    const { isAuthenticated, authenticatedUser, setForceLoginModal } = useAuth();
    const isAuthor = isAuthenticated && authenticatedUser.getID === announce.getAuthor?.getID;
    const { t, lang } = useTranslation();

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
        <div className="objava-wrapper cardAd">
            {announce.getFeaturedImg && (
                <div className="cardAd_Featured">
                    <Link href={`/announces/${announce.getSlug}`} prefetch={false}>
                        <a>
                            <LazyLoadImage
                                effect="blur"
                                src={announce.getFeaturedImg.getLocation}
                                alt={announce.getFeaturedImg.getName}
                                height={featuredImgHeight}
                                width="100%"
                            />
                        </a>
                    </Link>
                    <div className="moreThumbs">
                        <IconButton>
                            <PhotoCamera/>
                            {announce.getCountImages}
                        </IconButton>
                    </div>
                </div>
            )}
            <div className="cardAd_Content">
                <Row>
                    <Col sm={3} md={3} className="p-2">
                        <Link href={announce.getAuthor.getProfileLink} prefetch={false}>
                            <a className="decoration-none">
                                <img className="img-profile-wrapper rounded-circle"
                                     src={announce.getAuthor.getAvatar}
                                     alt={announce.getTitle}
                                     width={70}
                                />
                            </a>
                        </Link>
                    </Col>

                    <Col sm={9} md={9} className="cardAd_Title p-2">
                        <Link href={`/announces/${announce.getSlug}`} prefetch={false}>
                            <a className="decoration-none">
                                <Typography component="p" variant="h3">
                                    {announce.getTitle}
                                </Typography>
                            </a>
                        </Link>
                        <div className="d-flex align-items-center">
                            <span className="mr-2">{announce.getManufacturerFormated}</span>
                            <small> {getTimeAgo(announce.getCreationDate.raw, lang)}</small>
                        </div>
                    </Col>
                </Row>
                <div className="d-flex flex-column">
                    <div className="top-profile-name-btn">
                        <Link href={announce.getAuthor.getProfileLink} prefetch={false}>
                            <a className="top-profile-name">
                                <Typography as="p" variant="h4">{announce.getAuthor.getFullName}</Typography>
                            </a>
                        </Link>
                    </div>

                    {announce.getAdOrAuthorCustomAddress(['city', 'postCode', 'country']) && (
                        <div className="top-profile-data-wrapper">
                            <div className="top-profile-location">
                                <img src="/images/location.png" alt=""/>
                                {announce.getAdOrAuthorCustomAddress(['city', 'postCode', 'country'])}
                            </div>
                        </div>
                    )}
                </div>


                <div className="price-stars-wrapper">
                    <div className="icons-profile-wrapper">
                        <div className="icons-star-prof icons-star-current"
                             title={t('vehicles:i-like')}
                             onClick={handleClickLikeButton}>
                            {alreadyLikeCurrentUser() ? <StarSVGYellow/> : <StarSVG/>}
                            <span>{likesCounter}</span>
                        </div>
                        <div className="icons-star-prof"
                             title={t('vehicles:comment_plural')}>
                            <img src="/images/svg/comment.svg" alt=""/>
                            <span>{announce.getCountComments}</span>
                        </div>
                    </div>
                    <p className="price-announce">
                        {announce.getPrice} €TTC
                        {authenticatedUser.isPro && (
                            <span> {announce.getPriceHT} €HT</span>
                        )}
                    </p>
                </div>

                <CarInfos
                    announce={announce}
                    fontSize={detailsFontSize}
                />

                <TagsList tags={announce.getTags}/>

                {announce.getCountComments > 0 && (
                    <>
                        <TitleMUI as="p" variant="h4">{t('vehicles:comment_plural')} ({announce.getCountComments})</TitleMUI>
                        <CommentsListLight comments={announce.getComments}/>
                    </>
                )}

                <div className="my-2 text-center">
                    <CTALink
                        title={t('vehicles:see-announce')}
                        href={`/announces/${announce.getSlug}`}
                    />

                    {isAuthor && (
                        <CTALink
                            title={t('vehicles:edit-announce')}
                            href={`/announces/${announce.getSlug}/edit`}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

AnnounceCard.propTypes = {
    announceRaw: PropTypes.any.isRequired,
    featuredImgHeight: PropTypes.number,
};

AnnounceService.defaultProps = {
    featuredImgHeight: 500,
};
export default AnnounceCard;
