import React, { useContext, useState } from 'react';
import { Col, Row } from 'reactstrap';
import Link from 'next-translate/Link';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import useTranslation from 'next-translate/useTranslation';
import { useAuth } from '../../context/AuthProvider';
import UsersService from '../../services/UsersService';
import AvatarPreview from '../../components/Avatar/AvatarPreview';
import Filters from '../../components/HomeFilters/Filters';
import AnnounceCard from '../../components/AnnounceCard';
import CTALink from '../../components/CTALink';
import Tabs from '../../components/Tabs/Tabs';
import UserModel from '../../models/user.model';
import Error from '../_error';
import { ModalDialogContext } from '../../context/ModalDialogContext';
import { ReactComponent as StarSVGYellow } from '../../../public/images/svg/star-yellow.svg';
import { ReactComponent as StarSVG } from '../../../public/images/svg/star.svg';

const Profile = ({ profileRaw, ...props }) => {

    if (profileRaw === undefined || props.err) {
        return <Error statusCode={props.err?.statusCode}/>;
    }

    const { authenticatedUser, isAuthenticated, setForceLoginModal } = useAuth();
    const profile = new UserModel(profileRaw);
    const { t } = useTranslation();
    const { dispatchModalError } = useContext(ModalDialogContext);
    const [followerCounter, setFollowersCounter] = useState(profile.getCountFollowers);
    const [alreadyFollowProfile, setAlreadyFollowProfile] = useState(!!profile.getFollowers.find(follower => follower.user === authenticatedUser.getID));
    const isCurrentLoggedUser = isAuthenticated && authenticatedUser.getUsername === profile.getUsername;

    const handleFollowProfile = async () => {
        if (!isAuthenticated) return setForceLoginModal(true);
        try {
            if (alreadyFollowProfile) {
                await UsersService.unFollowUser(profile.getID);
                setFollowersCounter(followerCounter => followerCounter - 1);
                setAlreadyFollowProfile(false);
            } else {
                await UsersService.followUser(profile.getID);
                setFollowersCounter(followerCounter => followerCounter + 1);
                setAlreadyFollowProfile(true);
            }
        } catch (err) {
            dispatchModalError({ err });
        }
    };

    return (
        <>
            <Row className="mx-auto">
                <Col md={2}>
                    <AvatarPreview src={profile.getAvatar}/>
                </Col>
                <Col md={10}>
                    <div className="d-flex justify-content-between mt-2">
                        <div className="d-flex">
                            <h2>{profile.getFullName}</h2>
                            <div className="mx-2 float-left">
                                <img src="/images/star.png" alt=""/>
                            </div>

                        </div>

                        {isCurrentLoggedUser ? (
                            <div className="mx-2">
                                <Link href={'/profile/edit'}>
                                    <a className="btn btn-outline-dark">
                                        {t('vehicles:edit-my-profile')}
                                    </a>
                                </Link>
                            </div>
                        ) : (
                            <div className="mx-2">
                                {/*<Button*/}
                                {/*    variant="contained"*/}
                                {/*    color="primary"*/}
                                {/*    startIcon={<ChatIcon/>}*/}
                                {/*    onClick={() => {*/}
                                {/*        toggleModalOpen(true);*/}
                                {/*    }}*/}
                                {/*>*/}
                                {/*    {t('vehicles:contact')}*/}
                                {/*</Button>*/}
                            </div>
                        )}
                    </div>

                    <Typography>{profile.getUsername}</Typography>

                    <Row>
                        {profile.getAddressParts.fullAddress && (
                            <Col sm={12}>
                                <span className="top-profile-location">
                                    <img src="/images/location.png" alt=""/>
                                    {profile.getAddressParts.fullAddress}
                                </span>
                            </Col>
                        )}
                        <Col>
                            <span className="top-profile-abonnes" onClick={handleFollowProfile}>
                                {alreadyFollowProfile ? <StarSVGYellow/> : <StarSVG/>}
                                {followerCounter} {t('vehicles:followers')}
                            </span>
                        </Col>
                        <Col>
                              <span className="top-profile-abonnes">
                                {profile.getCountFollowing} {t('vehicles:subscriptions')}
                            </span>
                        </Col>
                    </Row>

                    <p className="top-profile-desc">
                        {profile.getDescription}
                    </p>

                </Col>
            </Row>
            <TabsContainer {...{
                profile,
                isCurrentLoggedUser,
            }}/>
        </>
    );
};

const TabsContainer = ({ profile, isCurrentLoggedUser }) => {
    const { t } = useTranslation();
    const [filtersOpened, toggleFilters] = useState(false);
    const [filters, setFilters] = useState({});

    const toggleOpenFilters = () => {
        toggleFilters(open => !open);
    };

    const updateFilters = (filters) => {
        setFilters(filters);
    };

    console.log(filters);

    return (
        <Tabs defaultActive={0} className="nav-tabs-profile" id="myTab">
            <Tabs.Item id="home-tab" title="Vitrine">
                <div className="filters_container">
                    {profile.getGarage.length !== 0 && (
                        <>
                            <div className={clsx('cd-filter-trigger', filtersOpened && 'filter-is-visible')}
                                 onClick={() => toggleOpenFilters()}>
                                <img src="/images/svg/icon_filter_white.svg" alt=""/>
                            </div>

                            <div className={clsx('cd-filter', filtersOpened && 'filter-is-visible')}>
                                <Filters updateFilters={updateFilters}/>
                                <span className="cd-close-trigger" onClick={() => toggleOpenFilters()}/>
                            </div>
                        </>
                    )}

                    <section className={clsx('cd-gallery', filtersOpened && 'filter-is-visible')}>
                        <Row className="my-2 d-flex justify-content-center">
                            {profile.getGarage.length ? profile.getGarage.map((announceRaw, index) => (
                                <Col key={index} sm={12} md={12} lg={6} xl={6} className="my-2">
                                    <AnnounceCard announceRaw={announceRaw}/>
                                </Col>
                            )) : (
                                <div className="d-flex flex-column align-items-center smy-2">
                                    <p>{t('vehicles:no-ads-found')}</p>
                                    <CTALink
                                        title={t('vehicles:create-my-first-ad')}
                                        href="/deposer-une-annonce"
                                        className="cta_nav_link"
                                    />
                                </div>
                            )}
                        </Row>
                    </section>
                </div>
            </Tabs.Item>

            {isCurrentLoggedUser && (
                <Tabs.Item id="favoris-tab" title={t('vehicles:favorites')}>
                    <Row className="my-2 d-flex justify-content-center">
                        {profile.getFavorites.length ? profile.getFavorites.map((announceRaw, index) => (
                            <Col key={index} sm={12} md={12} lg={6} xl={6} className="my-2">
                                <AnnounceCard announceRaw={announceRaw}/>
                            </Col>
                        )) : (
                            <p>No favorites</p>
                        )}
                    </Row>
                </Tabs.Item>
            )}
        </Tabs>
    );
};

export async function getServerSideProps (ctx) {
    const { username } = ctx.query;
    try {
        const additionalHeaders = { Cookie: ctx.req.headers['cookie'] };
        const profileRaw = await UsersService.getUserByUsernameSSR(username, additionalHeaders);
        return {
            props: {
                username,
                profileRaw,
            },
        };
    } catch (err) {
        return {
            props: {
                err: {
                    message: err?.message ?? null,
                    statusCode: err?.statusCode ?? 404,
                },
            },
        };
    }
}

export default Profile;
