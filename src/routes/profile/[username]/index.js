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
import { useAuth } from '../../../context/AuthProvider';
import { ModalDialogContext } from '../../../context/ModalDialogContext';
import UsersService from '../../../services/UsersService';
import AvatarPreview from '../../../components/Avatar/AvatarPreview';
import AnnounceCard from '../../../components/AnnounceCard';
import CTALink from '../../../components/CTALink';
import Tabs from '../../../components/Tabs/Tabs';
import UserModel from '../../../models/user.model';
import Loader from '../../../components/Loader';
import ModalContact from '../../../components/ModalContact';
import ModalFollowers from '../../../components/ModalFollowers'
import AdvancedFilters from '../../../components/Filters/Advanced/AdvancedFilters'
import AnnounceService from '../../../services/AnnounceService'
import { ReactComponent as StarSVGYellow } from '../../../../public/images/svg/star-yellow.svg'
import { ReactComponent as StarSVG } from '../../../../public/images/svg/star.svg'
import Error from '../../_error'

const Profile = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const { username } = router.query
    const { authenticatedUser, isAuthenticated, setForceLoginModal } = useAuth();
    const { dispatchModalError } = useContext(ModalDialogContext);
    const [state, setState] = useState({
        err: null,
        stateReady: false,
        isSelf: false,
        isAdmin: false,
        profile: new UserModel()
    });

    const [filterState, setFilterState] = useState({
        loading: false,
        sorter: {},
        filters: {},
        page: 1,
        total: 0
    });

    const profile = state.profile
    const [followerCounter, setFollowersCounter] = useState(0);
    const [alreadyFollowProfile, setAlreadyFollowProfile] = useState(false);
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
                await UsersService.unFollowUser(profile.getID);
                setFollowersCounter(followerCounter => followerCounter - 1);
                setAlreadyFollowProfile(false);
            } else {
                await UsersService.followUser(profile.getID);
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

    const fetchAnnounces = useCallback(async () => {
        try{
            const { sorter, filters, page } = filterState;

            setFilterState(filterState => ({
                ...filterState,
                loading: true
            }));

            const params = {
                page,
                sort_by: sorter.key,
                sort_ord: sorter.asc ? 'ASC' : null,
                ...filters,
                user : profile.getID
            };

            const result = await AnnounceService.getProfileAnnounces(params)

            setState(state => ({
                ...state,
                profile: new UserModel({
                    ...profile.getRaw,
                    garage : result.rows
                })
            }))

            setFilterState(filterState => ({
                ...filterState,
                loading: false
            }));

        } catch (err) {
            setFilterState(filterState => ({
                ...filterState,
                loading: false,
                err
            }))
        }
    },[filterState.sorter, filterState.filters, filterState.page]);

    const updateFilters = (filters) => {
        setFilterState(filterState => ({
            ...filterState,
            filters: filters
        }))
    }

    useEffect(() => {
        setFollowersCounter(profile.getCountFollowers)
        setAlreadyFollowProfile(!!profile.getFollowers.find(follower =>
          follower?.user?.id === authenticatedUser.getID));
    }, [profile]);

    useEffect(() => {
        console.log('fetch profile')
        fetchProfile();
        window.scrollTo(0, 0);
    }, [fetchProfile]);

    useEffect(() => {
        if(state.stateReady){
            console.log('fetch announces')
            fetchAnnounces();
        }
    }, [fetchAnnounces]);

    if (!state.stateReady) return null;
    if(filterState.loading) return <Loader/>
    if (state.err) return <Error statusCode={state.err?.statusCode}/>;

    return (
        <Container>
            {!state.isSelf && (
                <ModalContact
                    recipient={profile}
                    handleClose={handleCloseModalContact}
                    open={openModalContact}
                />
            )}

            <ModalFollowers
                title={t('vehicles:followers')}
                likes={profile.getFollowers}
                handleClose={handleCloseModalFollowers}
                open={openModalFollowers}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            />

            <ModalFollowers
                title={t('vehicles:subscriptions')}
                likes={profile.getFollowings}
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
                    <AvatarPreview src={profile.getAvatar}/>
                </Col>
                <Col md={10}>
                    <div className="top-profile-name-btn">
                        <h2>
                            {profile.getFullName}
                            {(profile.getIsPro && profile.getIsActivated) && <img className="mx-2" src="/images/star.png" alt=""/>}
                        </h2>

                        {state.isSelf ? (
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
                                <a href={profile.buildAddressGoogleMapLink()}
                                    target="_blank"
                                    rel="noreferrer">
                                    <span className="top-profile-location">
                                        <img className="mx-1" src="/images/location.png" alt=""/>
                                        {profile.buildAddressString()}
                                    </span>
                                </a>
                            </Col>
                        )}

                        <Col xs={12} sm={4} md={4}>
                            <div className="follow_container" onClick={() => handleOpenModalFollowers()}>
                                <div className="top-profile-followers">
                                    {state.isSelf ? (
                                        <>
                                            <span className="mx-1">
                                                {alreadyFollowProfile ? <StarSVGYellow/> : <StarSVG/>}
                                            </span>
                                            <span>
                                                {followerCounter} {t('vehicles:followers', {count : followerCounter})}
                                            </span>
                                        </>
                                    ) : (
                                        <>
                                            <span className="mx-1" onClick={(e) => {
                                                e.stopPropagation();
                                                handleFollowProfile()
                                            }}>
                                                {alreadyFollowProfile ? <StarSVGYellow/> : <StarSVG/>}
                                            </span>
                                            <span>
                                                {followerCounter} {t('vehicles:followers', {count : followerCounter})}
                                            </span>
                                        </>
                                    )}
                                </div>

                                {profile.getCountFollowers !== 0 && (
                                    <div className="my-2">
                                        <ul className="d-flex align-items-center list-style-none">
                                            {profile.getFollowers.slice(0, 3)
                                                .map((userLike, index) => {
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
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </Col>

                        <Col xs={12} sm={4} md={4}>
                            <div className="follow_container" onClick={() => handleOpenModalFollowings()}>
                                <span className="top-profile-followers">
                                    {profile.getCountFollowing} {t('vehicles:subscriptions', { count : profile.getCountFollowing})}
                                </span>

                                {profile.getCountFollowing !== 0 && (
                                    <div className="my-2">
                                        <ul className="d-flex align-items-center list-style-none">
                                            {profile.getFollowings.slice(0, 3)
                                                .map((userLike, index) => {
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
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </Col>
                    </Row>

                    <p className="top-profile-desc">
                        {profile.getDescription}
                    </p>

                </Col>
            </Row>
            <TabsContainer {...{
                state,
                filterState,
                updateFilters
            }}/>
        </Container>
    );
};

const TabsContainer = ({ state, filterState, updateFilters }) => {
    const { t } = useTranslation();
    const [refWidth, { width }] = useDimensions();
    const { isAuthenticated } = useAuth();
    const [filtersOpened] = useState(false);
    const { profile, isSelf } = state;

    return (
        <Container>
            <Row>
                <Col sm={12} md={4}>
                    <Typography component="p" variant="h2">
                        {t('vehicles:{count}_results_search', { count : filterState.total})}
                    </Typography>
                    <AdvancedFilters updateFilters={updateFilters}/>
                </Col>
                <Col sm={12} md={8}>
                    <div ref={refWidth}>
                        <Tabs defaultActive={0} className="nav-tabs-profile">
                            <Tabs.Item id="home-tab" title="Vitrine">
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
                                                    href={isAuthenticated ? '/feed' : '/'}
                                                    className="cta_nav_link my-2"
                                                />
                                            </div>
                                        )}
                                    </Row>
                                </section>
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
                                                    href={isAuthenticated ? '/feed' : '/'}
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
                                                    href={isAuthenticated ? '/feed' : '/'}
                                                    className="cta_nav_link my-2"
                                                />
                                            </div>
                                        )}
                                    </Row>
                                </Tabs.Item>
                            )}
                        </Tabs>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Profile;
