import React, { useContext, useEffect, useState } from 'react';
import { Col, Container, Row } from 'reactstrap';
import Link from 'next-translate/Link';
import clsx from 'clsx';
import ChatIcon from '@material-ui/icons/Chat';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import useTranslation from 'next-translate/useTranslation';
import { useAuth } from '../../../context/AuthProvider';
import { ModalDialogContext } from '../../../context/ModalDialogContext';
import UsersService from '../../../services/UsersService';
import AvatarPreview from '../../../components/Avatar/AvatarPreview';
import Filters from '../../../components/HomeFilters/Filters';
import AnnounceCard from '../../../components/AnnounceCard';
import CTALink from '../../../components/CTALink';
import Tabs from '../../../components/Tabs/Tabs';
import UserModel from '../../../models/user.model';
import Error from '../../_error';
import { ReactComponent as StarSVGYellow } from '../../../../public/images/svg/star-yellow.svg';
import { ReactComponent as StarSVG } from '../../../../public/images/svg/star.svg';
import ModalContact from '../../../components/ModalContact';
import Alert from '@material-ui/lab/Alert';

const Profile = ({ profileRaw, isAdmin, isSelf, err }) => {
    const { t } = useTranslation();
    const { isAuthReady, authenticatedUser, isAuthenticated, setForceLoginModal } = useAuth();
    const { dispatchModalError } = useContext(ModalDialogContext);
    const profile = new UserModel(profileRaw);
    const [stateReady, setStateReady] = useState(false);
    const [followerCounter, setFollowersCounter] = useState(profile.getCountFollowers);
    const [alreadyFollowProfile, setAlreadyFollowProfile] = useState(!!profile.getFollowers.find(follower => follower.user === authenticatedUser.getID));
    const [openModalContact, setOpenModalContact] = useState(false);

    const handleOpenModalContact = () => {
        if (!isAuthenticated) {
            return setForceLoginModal(true);
        } else {
            setOpenModalContact(true);
        }
    };

    const handleCloseModalContact = () => {
        setOpenModalContact(false);
    };

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

    useEffect(() => {
        if (isAuthReady) setStateReady(true);
    }, [isAuthReady]);

    if (!stateReady) return null;
    if (profileRaw === undefined || err) return <Error statusCode={err?.statusCode}/>;

    return (
        <Container>
            <ModalContact
                recipient={profile}
                handleClose={handleCloseModalContact}
                open={openModalContact}
            />

            {isAdmin && (
                <Alert severity="info" className="mb-2">
                    Connected as Admin
                </Alert>
            )}

            <Row className="mx-auto">
                <Col md={2}>
                    <AvatarPreview src={profile.getAvatar}/>
                </Col>
                <Col md={10}>
                    <div className="top-profile-name-btn">
                        <h2>{profile.getFullName} <img className="mx-2" src="/images/star.png" alt=""/></h2>

                        {isSelf ? (
                            <div className="mx-2">
                                <Link href={profile.getProfileEditLink}>
                                    <a className="btn btn-outline-dark">
                                        {t('vehicles:edit-my-profile')}
                                    </a>
                                </Link>
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

                    <p className="top-profile-login">
                        @{profile.getUsername}
                    </p>

                    <Row>
                        {profile.getAddressParts.fullAddress && (
                            <Col xs={12} sm={4} md={4}>
                                <span className="top-profile-location">
                                    <img src="/images/location.png" alt=""/>
                                    {profile.addressBuilder(['city', 'postalCode', 'country'])}
                                </span>
                            </Col>
                        )}
                        <Col xs={12} sm={4} md={4}>
                            <span className="top-profile-followers" onClick={handleFollowProfile}>
                                {alreadyFollowProfile ? <StarSVGYellow/> : <StarSVG/>}
                                {followerCounter} {t('vehicles:followers')}
                            </span>
                        </Col>
                        <Col xs={12} sm={4} md={4}>
                              <span className="top-profile-followers">
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
                isSelf,
            }}/>
        </Container>
    );
};

const TabsContainer = ({ profile, isSelf }) => {
    const { t } = useTranslation();

    const [filtersOpened] = useState(false);
    const [, setFilters] = useState({});

    const updateFilters = (filters) => {
        setFilters(filters);
    };

    return (
        <Container>
            <Tabs defaultActive={0} className="nav-tabs-profile" id="myTab">
                <Tabs.Item id="home-tab" title="Vitrine">
                    <Row>
                        <Col sm={12} md={4}>
                            <Typography component="p" variant="h2">
                                {profile.getGarage.length} résultats de recherche
                            </Typography>
                            <Filters updateFilters={updateFilters}/>
                        </Col>
                        <Col sm={12} md={8}>
                            <section className={clsx('cd-gallery', filtersOpened && 'filter-is-visible')}>
                                <Row className="my-2 d-flex justify-content-center">
                                    {profile.getGarage.length ? profile.getGarage.map((announceRaw, index) => (
                                        <Col key={index} sm={12} md={12} lg={6} xl={6} className="my-2">
                                            <AnnounceCard announceRaw={announceRaw}/>
                                        </Col>
                                    )) : (
                                        <div className="d-flex flex-column align-items-center smy-2">
                                            <p>{t('vehicles:no-found-announces')}</p>
                                            <CTALink
                                                title={t('vehicles:create-my-first-ad')}
                                                href="/deposer-une-annonce"
                                                className="cta_nav_link my-2"
                                            />

                                            <CTALink
                                                title={t('vehicles:explore-ads')}
                                                href="/"
                                                className="cta_nav_link my-2"
                                            />
                                        </div>
                                    )}
                                </Row>
                            </section>
                        </Col>
                    </Row>
                </Tabs.Item>

                {isSelf && (
                    <Tabs.Item id="favoris-tab" title={t('vehicles:garage')}>
                        <Row className="my-2 d-flex justify-content-center">
                            {profile.getHiddenGarage.length ? profile.getHiddenGarage.map((announceRaw, index) => (
                                <Col key={index} sm={12} md={12} lg={6} xl={6} className="my-2">
                                    <AnnounceCard announceRaw={announceRaw}/>
                                </Col>
                            )) : (
                                <div className="d-flex flex-column align-items-center smy-2">
                                    <p>{t('vehicles:no-hidden-announces')}</p>

                                    <CTALink
                                        title={t('vehicles:create-my-first-ad')}
                                        href="/deposer-une-annonce"
                                        className="cta_nav_link my-2"
                                    />

                                    <CTALink
                                        title={t('vehicles:explore-ads')}
                                        href="/"
                                        className="cta_nav_link my-2"
                                    />
                                </div>
                            )}
                        </Row>
                    </Tabs.Item>
                )}

                {isSelf && (
                    <Tabs.Item id="favoris-tab" title={t('vehicles:favorites')}>
                        <Row className="my-2 d-flex justify-content-center">
                            {profile.getFavorites.length ? profile.getFavorites.map((announceRaw, index) => (
                                <Col key={index} sm={12} md={12} lg={6} xl={6} className="my-2">
                                    <AnnounceCard announceRaw={announceRaw}/>
                                </Col>
                            )) : (
                                <div className="d-flex flex-column align-items-center smy-2">
                                    <p>{(t('vehicles:no-favorite-announces'))}</p>

                                    <CTALink
                                        title={t('vehicles:create-my-first-ad')}
                                        href="/deposer-une-annonce"
                                        className="cta_nav_link my-2"
                                    />

                                    <CTALink
                                        title={t('vehicles:explore-ads')}
                                        href="/"
                                        className="cta_nav_link my-2"
                                    />
                                </div>
                            )}
                        </Row>
                    </Tabs.Item>
                )}
            </Tabs>
        </Container>

    );
};

export async function getServerSideProps (ctx) {
    const { username } = ctx.query;
    const additionalHeaders = { Cookie: ctx.req.headers['cookie'] };
    try {
        const { user, isAdmin, isSelf } = await UsersService.getUserByUsernameSSR(username, additionalHeaders);
        return {
            props: {
                profileRaw: user,
                isAdmin: isAdmin ?? false,
                isSelf: isSelf ?? false,
            },
        };
    } catch (err) {
        return {
            props: {
                additionalHeaders,
                username,
                err: {
                    message: err?.message ?? null,
                    statusCode: err?.statusCode ?? 404,
                },
            },
        };
    }
}

export default Profile;
