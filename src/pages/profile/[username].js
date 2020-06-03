import React, { useState } from 'react';
import { Col, Row } from 'reactstrap';
import Link from 'next/link';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import ChatIcon from '@material-ui/icons/Chat';
import { useAuth } from '../../context/AuthProvider';
import UsersService from '../../services/UsersService';
import AvatarPreview from '../../components/Avatar/AvatarPreview';
import Filters from '../../components/Profile/Filters';
import Tabs from '../../components/Tabs/Tabs';
import UserModel from '../../models/user.model';
import Error from '../_error';
import Typography from '@material-ui/core/Typography';
import AnnounceCard from '../../components/AnnounceCard';
import CTALink from '../../components/CTALink';

const Profile = ({ profileRaw, username, err, ...props }) => {
    if (!profileRaw || err) return <Error statusCode={err?.statusCode}/>;
    const { authenticatedUser, isAuthenticated } = useAuth();
    const [isModalOpen, toggleModalOpen] = useState(false);
    const profile = new UserModel(profileRaw);
    const [filtersOpened, toggleFilters] = useState(false);
    const [state, setState] = useState({
        loading: true,
        sorter: props.sorter,
        filters: {},
        total: 0,
    });

    const isAuthor = isAuthenticated &&
        authenticatedUser &&
        authenticatedUser.getUsername === profile.getUsername;

    const toggleOpenFilters = () => {
        toggleFilters(open => !open);
    };

    const updateFilters = (filters) => {
        setState(state => ({
            ...state,
            filters,
        }));
    };

        return (
        <>
            <div>
                <Row className="mx-auto">
                    <Col md={2}>
                        <AvatarPreview src={profile.getAvatar}/>
                    </Col>
                    <Col md={10}>
                        <div className="d-flex justify-content-between">
                            <div className="d-flex">
                                <h2>{profile.getFullName}</h2>
                                <div className="mx-2 float-left">
                                    <img src="/images/star.png" alt=""/>
                                </div>

                            </div>

                            {isAuthor ? (
                                <div className="mx-2">
                                    <Link href={'/profile/edit'}>
                                        <a className="btn btn-outline-dark">Editer mon profil</a>
                                    </Link>
                                </div>
                            ) : (
                                <div className="mx-2">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        startIcon={<ChatIcon/>}
                                        onClick={() => {
                                            toggleModalOpen(true);
                                        }}
                                    >
                                        Contacter
                                    </Button>
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
                                <span className="top-profile-abonnes">
                                    {profile.getCountFollowers} abonnés
                                </span>
                            </Col>
                            <Col>
                                  <span className="top-profile-abonnes">
                                    {profile.getCountFollowing} abonnements
                                </span>
                            </Col>
                        </Row>

                        <p className="top-profile-desc">
                            {profile.getDescription}
                        </p>

                    </Col>
                </Row>
            </div>
            <section className="content_tabs">

                <div className={clsx('cd-filter-trigger', filtersOpened && 'filter-is-visible')}
                     onClick={() => toggleOpenFilters()}>
                    <img src="/images/svg/icon_filter_white.svg" alt=""/>
                </div>

                <div className={clsx('cd-filter', filtersOpened && 'filter-is-visible')}>
                    <Filters updateFilters={updateFilters}/>
                    <span className="cd-close-trigger" onClick={() => toggleOpenFilters()}/>
                </div>

                <div className={clsx('cd-gallery', filtersOpened && 'filter-is-visible')}>
                    <TabsContainer {...{
                        profile,
                        isAuthor,
                        isAuthenticated,
                    }} />
                </div>
            </section>
        </>
    );
};

const TabsContainer = ({ profile, isAuthor }) => {
    return (
        <Tabs defaultActive={0} className="nav-tabs-profile" id="myTab">
            <Tabs.Item id="home-tab" title="Vitrine">
                <Row className="my-2 d-flex justify-content-center">
                    {profile.getGarage.length ? profile.getGarage.map((announceRaw, index) => (
                        <Col key={index} sm={12} md={12} lg={6} xl={6}>
                            <AnnounceCard announceRaw={announceRaw}/>
                        </Col>
                    )) : (
                        <div className="d-flex flex-column align-items-center smy-2">
                            <p>No announces found</p>
                            <CTALink
                                title="Créer votre première annonce"
                                href="/deposer-une-annonce"
                                className="cta_nav_link"
                            />
                        </div>

                    )}
                </Row>
            </Tabs.Item>

            {isAuthor && (
                <Tabs.Item id="profile-tab" title="Location">
                    <p>Content 2</p>
                </Tabs.Item>
            )}

            {isAuthor && (
                <Tabs.Item id="favoris-tab" title="Favoris">
                    <Row className="my-2 d-flex justify-content-center">
                        {profile.getFavorites.length && profile.getFavorites.map((announceRaw, index) => (
                            <Col key={index} sm={12} md={12} lg={6} xl={6}>
                                <AnnounceCard announceRaw={announceRaw}/>
                            </Col>
                        ))}
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
                    message: err.message,
                    statusCode: err.statusCode,
                },
            },
        };
    }
};

export default Profile;
