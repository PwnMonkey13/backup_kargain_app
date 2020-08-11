import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Col, Container, Row } from 'reactstrap';
import clsx from 'clsx';
import useDimensions from 'react-use-dimensions'
import { useRouter } from 'next/router'
import Link from 'next-translate/Link';
import useTranslation from 'next-translate/useTranslation';
import ChatIcon from '@material-ui/icons/Chat';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import MoreIcon from '@material-ui/icons/More'
import { useAuth } from '../../../context/AuthProvider';
import { ModalDialogContext } from '../../../context/ModalDialogContext';
import UsersService from '../../../services/UsersService';
import AvatarPreview from '../../../components/Avatar/AvatarPreview';
import AnnounceCard from '../../../components/AnnounceCard';
import CTALink from '../../../components/CTALink';
import Tabs from '../../../components/Tabs/Tabs';
import UserModel from '../../../models/user.model';
import ModalContact from '../../../components/ModalContact';
import ModalFollowers from '../../../components/ModalFollowers'
import { ReactComponent as StarSVGYellow } from '../../../../public/images/svg/star-yellow.svg';
import { ReactComponent as StarSVG } from '../../../../public/images/svg/star.svg';
import AdvancedFilters from '../../../components/Filters/Advanced/AdvancedFilters'
import Error from '../../_error'

const Profile = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const { username } = router.query
    const { authenticatedUser, isAuthenticated, setForceLoginModal } = useAuth();
    const { dispatchModalError } = useContext(ModalDialogContext);
    const [state, setState] = useState({
        err : null,
        stateReady : false,
        isSelf : false,
        isAdmin : false,
        profile : new UserModel()
    });
    const [followerCounter, setFollowersCounter] = useState(state.profile.getCountFollowers);
    const [alreadyFollowProfile, setAlreadyFollowProfile] = useState(!!state.profile.getFollowers
        .find(follower => follower.user === authenticatedUser.getID));
    const [openModalContact, setOpenModalContact] = useState(false);
    const [openModalFollowers, setOpenModalFollowers] = useState(false);
    const [openModalFollowings, setOpenModalFollowings] = useState(false);

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

    const handleOpenModalFollowers = () => {
        setOpenModalFollowers(true);
    };

    const handleCloseModalFollowers = () => {
        setOpenModalFollowers(false);
    };

    const handleOpenModalFollowings = () => {
        setOpenModalFollowings(true);
    };

    const handleCloseModalFollowings = () => {
        setOpenModalFollowings(false);
    };

    const handleFollowProfile = async () => {
        if (!isAuthenticated) return setForceLoginModal(true);
        try {
            if (alreadyFollowProfile) {
                await UsersService.unFollowUser(state.profile.getID);
                setFollowersCounter(followerCounter => followerCounter - 1);
                setAlreadyFollowProfile(false);
            } else {
                await UsersService.followUser(state.profile.getID);
                setFollowersCounter(followerCounter => followerCounter + 1);
                setAlreadyFollowProfile(true);
            }
        } catch (err) {
            dispatchModalError({ err, persist : true });
        }
    };

    const fetchProfile = useCallback(async () => {
        try{
            const result = await UsersService.getUserByUsername(username);
            const { user, isAdmin, isSelf } = result
            setState(state => ({
                ...state,
                stateReady : true,
                profile : new UserModel(user),
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
    },[username])

    useEffect(()=>{
        fetchProfile()
    },[fetchProfile])

    if (!state.stateReady) return null;
    if (state.err) return <Error statusCode={state.err?.statusCode}/>;

    return (
        <Container>
            {!state.isSelf && (
                <ModalContact
                    recipient={state.profile}
                    handleClose={handleCloseModalContact}
                    open={openModalContact}
                />
            )}

            <ModalFollowers
                likes={state.profile.getFollowers}
                handleClose={handleCloseModalFollowers}
                open={openModalFollowers}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            />

            <ModalFollowers
                likes={state.profile.getFollowings}
                handleClose={handleCloseModalFollowings}
                open={openModalFollowings}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            />

            {state.isAdmin && (
                <Alert severity="info" className="mb-2">
                    Connected as Admin
                </Alert>
            )}

            <Row className="mx-auto">
                <Col md={2}>
                    <AvatarPreview src={state.profile.getAvatar}/>
                </Col>
                <Col md={10}>
                    <div className="top-profile-name-btn">
                        <h2>{state.profile.getFullName} <img className="mx-2" src="/images/star.png" alt=""/></h2>

                        {state.isSelf ? (
                            <div className="mx-2">
                                <Link href={state.profile.getProfileEditLink}>
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
                        @{state.profile.getUsername}
                    </p>

                    <Row>
                        {state.profile.getAddressParts.fullAddress && (
                            <Col xs={12} sm={4} md={4}>
                                <span className="top-profile-location">
                                    <img className="mx-1" src="/images/location.png" alt=""/>
                                    {state.profile.addressBuilder(['city', 'postalCode', 'country'])}
                                </span>
                            </Col>
                        )}
                        <Col xs={12} sm={4} md={4}>
                            <span className="top-profile-followers" onClick={handleFollowProfile}>
                                {alreadyFollowProfile ? <StarSVGYellow/> : <StarSVG/>}
                                {followerCounter} {t('vehicles:followers_plural', {count : followerCounter})}
                            </span>

                            {state.profile.getCountFollowers !== 0 && (
                                <div className="my-2">
                                    <ul className="d-flex align-items-center list-style-none">
                                        {state.profile.getFollowers.slice(0, 3).map((userLike, index) => {
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
                        <Col xs={12} sm={4} md={4}>
                            <span className="top-profile-followers">
                                {state.profile.getCountFollowing} {t('vehicles:subscriptions_plural', { count : state.profile.getCountFollowing})}
                            </span>

                            {state.profile.getCountFollowing !== 0 && (
                                <div className="my-2">
                                    <ul className="d-flex align-items-center list-style-none">
                                        {state.profile.getFollowings.slice(0, 3).map((userLike, index) => {
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
                                                onClick={() => handleOpenModalFollowings()}
                                                startIcon={<MoreIcon/>}>
                                            </Button>
                                        </li>
                                    </ul>
                                </div>
                            )}

                        </Col>
                    </Row>

                    <p className="top-profile-desc">
                        {state.profile.getDescription}
                    </p>

                </Col>
            </Row>
            <TabsContainer {...{
                profile : state.profile,
                isSelf : state.isSelf
            }}/>
        </Container>
    );
};

const TabsContainer = ({ profile, isSelf }) => {
    const { t } = useTranslation();
    const [refWidth, { width }] = useDimensions();
    const [filtersOpened] = useState(false);
    const [state, setState] = useState({
        searchLength : profile.getGarage.length,
        loading: false,
        sorter: {},
        filters: {},
        page: 1,
        announces: [],
        total: 0
    });

    const updateFilters = (filters) => {
        setState(state => ({
            ...state,
            filters
        }))
    }

    return (
        <Container>
            <div ref={refWidth}>
                <Tabs
                    defaultActive={0}
                    className="nav-tabs-profile">
                    <Tabs.Item id="home-tab" title="Vitrine">
                        <Row>
                            <Col sm={12} md={4}>
                                <Typography component="p" variant="h2">{state.searchLength} résultats de recherche</Typography>
                                <AdvancedFilters
                                    updateFilters={updateFilters}
                                />

                            </Col>
                            <Col sm={12} md={8}>
                                <section className={clsx('cd-gallery', filtersOpened && 'filter-is-visible')}>
                                    <Row className="my-2 d-flex justify-content-center">
                                        {profile.getGarage.length ? profile.getGarage.map((announceRaw, index) => (
                                            <Col key={index} sm={12} md={12} lg={width < 1200 ? 12 : 6} xl={width < 1200 ? 12 : 6} className="my-2">
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
            </div>
        </Container>
    );
};

export default Profile;
