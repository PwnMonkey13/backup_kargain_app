import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import { PhotoCamera } from '@material-ui/icons';
import AnnounceClass from '../models/announce.model';
import { getTimeAgo } from '../libs/utils';
import TitleMUI from './TitleMUI';
import CommentsListLight from './Comments/CommentsListLight';
import Typography from '@material-ui/core/Typography';
import AnnounceService from '../services/AnnounceService';
import { ModalDialogContext } from '../context/ModalDialogContext';
import makeStyles from '@material-ui/core/styles/makeStyles';
import TagsList from './Tags/TagsList';

const useStyles = makeStyles((theme) => ({
    cardHeader: {
        padding: '1rem 2rem',
    },
    avatarContainer: {
        flex: 1,
    },
    titleContainer: {
        flex: 6,
    },
}));

const AnnounceCardLight = ({ announceRaw, featuredImgHeight }) => {
    const classes = useStyles();
    const { dispatchModalError } = useContext(ModalDialogContext);
    const announce = new AnnounceClass(announceRaw);
    const [likesCounter, setLikesCounter] = useState(announce.getLikesLength);

    const handleClickLikeButton = () => {
        AnnounceService.toggleUserLike(announce.getID).then(likesCount => {
            setLikesCounter(likesCount);
        }).catch(err => {
            dispatchModalError({ err });
        });
    };

    return (
        <div className="objava-wrapper cardAd my-1">
            <div className={classes.cardHeader}>
                <div className="d-flex">
                    <div className={classes.avatarContainer}>
                        <Link href={announce.getAuthor.getProfileLink} prefetch={false}>
                            <a className="decoration-none">
                                <img className="img-profile-wrapper rounded-circle"
                                     src={announce.getAuthor.getAvatar}
                                     width={70}
                                     alt={announce.getTitle}
                                />
                            </a>
                        </Link>
                    </div>
                    <div className={clsx(classes.titleContainer, 'cardAd_Title')}>
                        <Link href={`/announces/${announce.getSlug}`} prefetch={false}>
                            <a className="decoration-none">
                                <Typography as="p" variant="h3">
                                    {announce.getTitle}
                                </Typography>
                                <Typography as="p" variant="h4">
                                    {announce.getManufacturerFormated}
                                </Typography>
                            </a>
                        </Link>
                    </div>
                </div>
                <div className="d-flex flex-column">

                    <div className="top-profile-name-btn">
                        <Link href={announce.getAuthor.getProfileLink} prefetch={false}>
                            <a className="top-profile-name">
                                <Typography as="p" variant="h4">{announce.getAuthor.getFullName}</Typography>
                            </a>
                        </Link>
                    </div>

                    {announce.getAdOrAuthorCustomAddress(['city', 'postCode']) && (
                        <div className="top-profile-data-wrapper">
                            <div className="top-profile-location">
                                <img src="/images/location.png" alt=""/>
                                {announce.getAdOrAuthorCustomAddress(['city', 'postCode'])}
                            </div>
                        </div>
                    )}
                    <small> il y a {getTimeAgo(announce.getCreationDate.raw)}</small>
                </div>
            </div>

            <div className="cardAd_Featured">
                {
                    announce.getFeaturedImg && (
                        <Link href={`/announces/${announce.getSlug}`} prefetch={false}>
                            <a>
                                <img src={announce.getFeaturedImg.getLocation} alt="" height={featuredImgHeight}/>
                            </a>
                        </Link>
                    )
                }

                <div className="moreThumbs">
                    <IconButton>
                        <PhotoCamera/>
                        {announce.getCountImages}
                    </IconButton>
                </div>
            </div>
            <div className="price-stars-wrapper">
                <div className="icons-profile-wrapper">
                    <div className="icons-star-prof icons-star-current" onClick={handleClickLikeButton}>
                        <img src="images/svg/star.svg" alt=""/>
                        <span>{likesCounter}</span>
                    </div>
                    <a href="#" className="icons-star-prof">
                        <img src="images/svg/comment.svg" alt=""/>
                        <span>{announce.getCountComments}</span>
                    </a>
                </div>
                <p className="price-announce">
                    {announce.getPrice} €TTC
                    <span> {announce.getPriceHT} €HT</span>
                </p>
            </div>

            <Typography component="p" variant="h4">Tags ({announce.getTags.length})</Typography>
            <TagsList tags={announce.getTags}/>

            {announce.getCountComments > 0 && (
                <>
                    <TitleMUI as="p" variant="h4">Commentaires ({announce.getCountComments})</TitleMUI>
                    <CommentsListLight comments={announce.getComments}/>
                </>
            )}

        </div>
    );
};

AnnounceCardLight.propTypes = {
    announceRaw: PropTypes.any.isRequired,
    featuredImgHeight: PropTypes.number,
};

AnnounceCardLight.defaultProps = {
    featuredImgHeight: 500,
};
export default AnnounceCardLight;
