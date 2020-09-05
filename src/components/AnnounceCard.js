import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import IconButton from '@material-ui/core/IconButton';
import { PhotoCamera } from '@material-ui/icons';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next-translate/Link';
import useDimensions from 'react-use-dimensions'
import clsx from 'clsx'
import { ReactComponent as StarSVG } from '../../public/images/svg/star.svg';
import { ReactComponent as StarSVGYellow } from '../../public/images/svg/star-yellow.svg';
import { ModalDialogContext } from '../context/ModalDialogContext';
import CommentsListLight from './Comments/CommentsListLight';
import AnnounceService from '../services/AnnounceService';
import AnnounceClass from '../models/announce.model';
import { useAuth } from '../context/AuthProvider';
import { getTimeAgo } from '../libs/utils';
import TagsList from './Tags/TagsList';
import CTALink from './CTALink';

const useStyles = makeStyles((theme) => ({
    card: {
        background: '#FFF',
        position: 'relative',
        height: '100%',
        padding: 0,
        border: '1px solid $grey',
        //border-radius : 10px;
        //box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
        transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',
        fontSize: '13px'
    },

    cardTop: {
        display: 'flex',
        margin: '1rem',
        [theme.breakpoints.down('md')]: {
            margin: '.3rem'
        }
    },

    cardTopInfos: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        margin: '0 1rem'
    },

    cardTopSubInfos : {
        display : 'flex',
        justifyContent : 'space-between'
    }
}));

const AnnounceCard = ({ announceRaw, featuredImgHeight }) => {
    const classes = useStyles();
    const announce = new AnnounceClass(announceRaw);
    const [refWidth, { width }] = useDimensions();
    const { dispatchModalError } = useContext(ModalDialogContext);
    const [likesCounter, setLikesCounter] = useState(announce.getLikesLength);
    const { isAuthenticated, authenticatedUser, setForceLoginModal } = useAuth();
    const isAuthor = isAuthenticated && authenticatedUser.getID === announce.getAuthor?.getID;
    const { t } = useTranslation();

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
        <div className="objava-wrapper cardAd" ref={refWidth}>
            <div className={classes.cardTop}>
                <div className="avatar">
                    <Link href={announce.getAuthor.getProfileLink} prefetch={false}>
                        <a className="decoration-none">
                            <img className="img-profile-wrapper rounded-circle"
                                src={announce.getAuthor.getAvatar}
                                alt={announce.getAuthor.getUsername}
                                width={70}
                            />
                        </a>
                    </Link>
                </div>

                <div className={classes.cardTopInfos}>
                    <div className="top-profile-name-btn">
                        <Link href={announce.getAuthor.getProfileLink} prefetch={false}>
                            <a className="top-profile-name">
                                <Typography as="p" variant="h4">{announce.getAuthor.getFullName}</Typography>
                            </a>
                        </Link>
                    </div>

                    {width >= 500 && (
                        <CardTopSubInfos
                            announce={announce}
                            width={width}
                        />
                    )}
                </div>
            </div>

            {width < 500 && (
                <div className="m-2">
                    <CardTopSubInfos
                        announce={announce}
                        width={width}
                    />
                </div>
            )}

            {announce.getFeaturedImg && (
                <div className="cardAd_Featured">
                    <Link href={announce.getAnnounceLink} prefetch={false}>
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
                <div className="price-stars-wrapper">
                    <div className="icons-profile-wrapper">
                        <div style={{ flex: 2, display: 'flex' }}>
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
                        <div style={{ flex: 3 }}>
                            <div className="price-announce">
                                {announce.getPrice} €TTC
                                <span> {announce.getPriceHT} €HT</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="cardAd_Title">
                    <Link href={`/announces/${announce.getSlug}`} prefetch={false}>
                        <a className="decoration-none">
                            <Typography component="p" variant="h3">
                                {announce.getTitle}
                            </Typography>
                        </a>
                    </Link>
                    <div className="d-flex align-items-center">
                        <span className="mr-2">{announce.getManufacturerFormated}</span>
                    </div>
                </div>

                <TagsList tags={announce.getTags}/>

                {announce.getCountComments > 0 && (
                    <CommentsListLight comments={announce.getComments}/>
                )}

                <div className="my-2 text-center">
                    <CTALink
                        title={t('vehicles:see-announce')}
                        href={announce.getAnnounceLink}
                    />

                    {isAuthor && (
                        <CTALink
                            title={t('vehicles:edit-announce')}
                            href={announce.getAnnounceEditLink}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

const CardTopSubInfos = ({width, announce}) => {
    const classes = useStyles()
    const { lang } = useTranslation()

    return(
        <div className={clsx(classes.cardTopSubInfos, width <= 500 && 'flex-column')}>
            {announce.getAdOrAuthorCustomAddress(['city', 'postCode', 'country']) && (
                <div className="top-profile-location">
                    <img className="mx-1" src="/images/location.png" alt=""/>
                    {announce.getAdOrAuthorCustomAddress(['city', 'postCode', 'country'])}
                </div>
            )}
            <div>
                <small className="mx-2"> {getTimeAgo(announce.getCreationDate.raw, lang)}</small>
                <img src="/images/share.png" alt=""/>
            </div>
        </div>
    )
}

AnnounceCard.propTypes = {
    announceRaw: PropTypes.any.isRequired,
    featuredImgHeight: PropTypes.number
};

AnnounceService.defaultProps = {
    featuredImgHeight: 500
};
export default AnnounceCard;
