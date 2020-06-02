import React, { useContext, useState } from 'react';
import Link from 'next/link';
import { Col, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import IconButton from '@material-ui/core/IconButton';
import { PhotoCamera } from '@material-ui/icons';
import Typography from '@material-ui/core/Typography';
import { ReactComponent as StarSVG } from '../../public/images/svg/star.svg';
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

const AnnounceCard = ({ announceRaw, featuredImgHeight }) => {
    const announce = new AnnounceClass(announceRaw);
    const { dispatchModalError } = useContext(ModalDialogContext);
    const [likesCounter, setLikesCounter] = useState(announce.getLikesLength);
    const { isAuthenticated, authenticatedUser, setForceLoginModal } = useAuth();
    const isAuthor = isAuthenticated && authenticatedUser.getID === announce.getAuthor?.getID;

    const handleClickLikeButton = async () => {
        if (!isAuthenticated) return setForceLoginModal(true);
        if(isAuthor) return
        try {
            const likesCount = await AnnounceService.toggleUserLike(announce.getID);
            setLikesCounter(likesCount);
        } catch (err) {
            dispatchModalError({ err });
        }
    };

    return (
        <div className="objava-wrapper cardAd my-1">
            <Row className="my-1">
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
                        <small> il y a {getTimeAgo(announce.getCreationDate.raw)}</small>
                    </div>
                </Col>
            </Row>

            <div>
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

                <div className="cardAd_Featured">
                    {announce.getFeaturedImg && (
                        <Link href={`/announces/${announce.getSlug}`} prefetch={false}>
                            <a>
                                <LazyLoadImage
                                    effect="blur"
                                    src={announce.getFeaturedImg.getLocation}
                                    alt={announce.getFeaturedImg.getName}
                                    height={featuredImgHeight}
                                />
                            </a>
                        </Link>
                    )}

                    <div className="moreThumbs">
                        <IconButton>
                            <PhotoCamera/>
                            {announce.getCountImages}
                        </IconButton>
                    </div>
                </div>

                <div className="price-stars-wrapper">
                    <div className="icons-profile-wrapper">
                        <div className="icons-star-prof icons-star-current"
                             onClick={handleClickLikeButton}>
                            <StarSVG/>
                            <span>{likesCounter}</span>
                        </div>
                        <a href="#" className="icons-star-prof">
                            <img src="/images/svg/comment.svg" alt=""/>
                            <span>{announce.getCountComments}</span>
                        </a>
                    </div>
                    <p className="price-announce">
                        {announce.getPrice} €TTC
                        {authenticatedUser.isPro && (
                            <span> {announce.getPriceHT} €HT</span>
                        )}
                    </p>
                </div>

                <CarInfos announce={announce}/>

                <TagsList tags={announce.getTags}/>

                {announce.getCountComments > 0 && (
                    <>
                        <TitleMUI as="p" variant="h4">Commentaires ({announce.getCountComments})</TitleMUI>
                        <CommentsListLight comments={announce.getComments}/>
                    </>
                )}

                <div className="my-2 text-center">
                    <CTALink
                        title="Voir l'annonce"
                        href={`/announces/${announce.getSlug}`}
                    />

                    {isAuthor && (
                        <CTALink
                            title="Modifier"
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
