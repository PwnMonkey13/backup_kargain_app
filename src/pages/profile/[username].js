import React, { useContext, useState } from 'react';
import { Row } from 'reactstrap';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import clsx from 'clsx';
import UsersService from '../../services/UsersService';
import { UserContext } from '../../context/UserContext';
import Tabs from '../../components/Tabs/Tabs';
import ProfileAvatar from '../../components/ProfileAvatar';
import { makeStyles } from '@material-ui/styles';
import Filters from '../../components/Profile/Filters';
import CarCard from '../../components/CarCard';
import Button from '@material-ui/core/Button';
import ChatIcon from '@material-ui/icons/Chat';
import AnnounceService from '../../services/AnnounceService';
import UserClass from '../../class/user.class';
import AnnounceClass from '../../class/announce.class';
import Error from '../_error';

const formConfig = {
    mode: 'onChange',
    validateCriteriaMode: 'all',
};

const useStyles = makeStyles(theme => ({

    root: {
        height: '100%',
    },
    shiftContent: {
        // paddingLeft: 240
    },
    content: {
        width: '95%',
        height: '100%',
    },
}));

const Profile = ({ profile, err, ...props }) => {
    const { session, dispatch } = useContext(UserContext);
    const { watch, control, errors, setValue, getValues, register, formState, handleSubmit } = useForm(formConfig);

    const [isModalOpen, toggleModalOpen] = useState(false);

    const [state, setState] = useState({
        loading: true,
        sorter: props.sorter,
        filters: {},
        announces: [],
        total: 0,
    });

    const User = new UserClass(profile);

    const [filtersOpened, toggleFilters] = useState(false);

    const toggleOpenFilters = () => {
        toggleFilters(open => !open);
    };

    const isLoggedInUser = session &&
        session.isLoggedIn === true &&
        session.user != null &&
        session.user.username === profile.username;

    const updateFilters = (filters) => {
        setState(state => ({
            ...state,
            filters,
        }));
    };

    const TabsContainer = () => {
        return (
            <Tabs defaultActive={0} classname="nav-tabs-profile" id="myTab">
                <Tabs.Item id="home-tab" title="Vitrine">
                    <Row className="my-2 d-flex justify-content-center">
                        {props.announces.map((announce, i) => {
                            const ad = new AnnounceClass(announce);
                            return (
                                <div key={i} className="m-2 mx-auto">
                                    <CarCard
                                        location={`/announces/${ad.getSlug}`}
                                        topText={ad.getExpirationDaysLeft && `${ad.getExpirationDaysLeft} jours`}
                                        imgSrc="/images/car4.png"
                                        title={ad.getTitle}
                                        subTitle={`${ad.getPrice} €`}
                                        excerpt={ad.getTheExcerpt()}
                                        viewsCount={ad.getCountViews}
                                        commentsCount={ad.getCountComments}
                                    />
                                </div>
                            );
                        })}
                    </Row>
                </Tabs.Item>
                <Tabs.Item id="profile-tab" title="Location">
                    <p>Content 2</p>
                </Tabs.Item>
                <Tabs.Item id="contact-tab" title="Vitrine">
                    <p>Content 3</p>
                </Tabs.Item>
                <Tabs.Item id="favoris-tab" title="Favoris">
                    <p>Content 4</p>
                </Tabs.Item>
            </Tabs>
        );
    };

    if (!profile) return <Error statusCode={err.statusCode}/>;

    return (
        <>
            <div>
                <Row className="d-flex mx-auto">

                    <div style={{ flex: 1 }}>
                        <ProfileAvatar src={User.getAvatar}/>
                    </div>

                    <div className="d-flex flex-column" style={{ flex: 3 }}>
                        <div className="d-flex justify-content-between">
                            <div className="d-flex">
                                <h2>{User.getFullName}</h2>
                                <div className="mx-2 float-left">
                                    <img src="/images/star.png" alt=""/>
                                </div>

                            </div>

                            {isLoggedInUser ? (
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
                            )
                            }
                        </div>

                        <h3>{User.getUserName}</h3>

                        <div className="d-flex">

                            {User.getAddress !== '' &&
                            <div style={{ flex: 1 }}>
                                    <span className="top-profile-location">
                                        <img src="images/location.png" alt=""/>
                                        {User.getAddress}
                                    </span>
                            </div>

                            }

                            <div style={{ flex: 1 }}>
                                 <span className="top-profile-abones">
                                    {User.getCountFollowers}
                                </span>
                            </div>

                            <div style={{ flex: 1 }}>
                                <span className="top-profile-abones">
                                    {User.getCountFollowing}
                                </span>
                            </div>

                        </div>

                        <p className="top-profile-desc">
                            {User.getDescription}
                        </p>

                    </div>

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
                    <TabsContainer/>
                </div>
            </section>
        </>
    );
};

Profile.getInitialProps = async function({ query, res }) {
    const { username } = query;
    try {
        const profile = await UsersService.getUser(username);
        const announces = await AnnounceService.getAnnouncesByUser(profile._id);
        return {
            username,
            profile,
            announces,
        };
    } catch (err) {
        return { err };
    }
};

export default Profile;
