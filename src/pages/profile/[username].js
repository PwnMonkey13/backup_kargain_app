import React, { useContext } from 'react'
import Link from 'next/link'
import nextCookie from 'next-cookies'
import { useRouter } from 'next/router';
import { Row, Col } from 'reactstrap'
import UsersService from '../../services/UsersService'
import { UserContext } from '../../components/Context/UserContext';
import {ModalDialogContext} from "../../components/Context/ModalDialogContext";
import Tabs from "../../components/Tabs/Tabs";

const Profile = (props) => {
    const { profile } = props;
    const router = useRouter();
    const { session, dispatch } = useContext(UserContext);
    const { dispatchModal } = useContext(ModalDialogContext);

    const getProfileAvatar = () => {
       return profile.avatar || 'images/profile.png';
    };

    const getProfileName = () => {
        return profile.fullname;
    };

    const getUserLocationAdress = () => {
        return profile.fullAddress;
    };

    const getProfileUserName = () => {
        return `@${profile.username}`;
    };

    const getProfileCountFollowers = () => {
       const count = profile.followersCount || 100;
       return `${count} abonnés`;
    };

    const getProfileCountFollowing = () => {
        const count = profile.followingCount || 100;
        return `${count} abonnements`;
    };

    const getUserDescription = () => {
        return profile.about;
    };

    return ( profile ?
        <main>
            <Row>
                <div className="top-profile-wrapper">
                    <img src={getProfileAvatar()} alt="" className="img-profile-wrapper"/>
                    <div className="top-profile-content-wrapper">
                        <div className="top-profile-name-btn">
                            <p className="top-profile-name">
                                { getProfileName() }
                                <img src="images/star.png" alt=""/>
                            </p>
                            {
                                session
                                && session.isLoggedIn === true
                                && session.user !== null
                                && session.user.username === profile.username &&
                                <div>
                                    <Link href={`/profile/edit`}>
                                    <a className="btn btn-outline-dark">Editer profil</a>
                                    </Link>
                                </div>
                            }

                        </div>
                        <p className="top-profile-login"> { getProfileUserName() } </p>
                        <div className="top-profile-data-wrapper">
                            { getUserLocationAdress() !== "" &&
                                <p className="top-profile-location">
                                    <img src="images/location.png" alt=""/>
                                    { getUserLocationAdress() }
                                </p>
                            }

                            <p className="top-profile-abones">
                                { getProfileCountFollowers() }
                            </p>

                            <p className="top-profile-abones">
                                { getProfileCountFollowing() }
                            </p>

                        </div>
                        <p className="top-profile-desc">
                            { getUserDescription() }
                        </p>
                    </div>
                </div>
            </Row>

            <Tabs defaultActive={0} classname="nav-tabs-profile" id="myTab">
                <Tabs.Item id="home-tab" title="Vitrine">
                    <div className="profile-marque-wrapper">
                        <div className="dropdown-wrapper ml-0">
                            <span>Catégorie :</span>
                            <select>
                                <option value="1">Voiture</option>
                                <option value="1">A6</option>
                                <option value="1">A7</option>
                            </select>
                        </div>
                        <div className="dropdown-wrapper ml-0">
                            <span>Marque :</span>
                            <select>
                                <option value="1">Audi</option>
                                <option value="1">A6</option>
                                <option value="1">A7</option>
                            </select>
                        </div>
                        <div className="d-flex align-items-end flex-column">
                            <div className="dropdown-wrapper ml-0 drop-mb">
                                <span>Modèle :</span>
                                <select>
                                    <option value="1">A5</option>
                                    <option value="1">A6</option>
                                    <option value="1">A7</option>
                                </select>
                            </div>
                            <div className="dropdown-wrapper dropdown-wrapper-alone">
                                <span>Trier par :</span>
                                <select>
                                    <option value="1">Prix croissant</option>
                                    <option value="1">A6</option>
                                    <option value="1">A7</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="cars-profile-wrapper cars-profile-wrapper-no-stock cars-profile-wrapper-border">
                            <div className="car-profile-wrapper">
                                <p className="probeg">50 jours restants</p>
                                <div className="car-profile-img-container">
                                    <img src="images/car2.png" alt="" className="car-profile-probeg"/>
                                </div>
                                <a href="#" className="car-profile-desc">Lorem ipsum dolor amet sit consectetur
                                    adipiscing</a>
                                <div className="car-profile-footer">
                                    <div className="comments-views-wrapper">
                                        <div className="comment-count-wrapper eye-view">
                                            <div className="eye-img"></div>
                                            6
                                        </div>
                                        <a href="#" className="comment-count-wrapper comment-count-wrapper2">
                                            <img src="images/comment.svg" alt=""/>
                                                6
                                        </a>
                                    </div>
                                    <div className="mod-sup-wrapper">
                                        <a href="#">Modifier</a>
                                        <span>|</span>
                                        <a href="#">Supprimer</a>
                                    </div>
                                </div>
                            </div>
                        </div>
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
        </main> : <p> TODO, unknown user</p>
    );
};

Profile.getInitialProps = async function(ctx) {
    const { username } = ctx.query;
    try{
        const profile = await UsersService.getUsers(username);
        return { username, profile };
    } catch (err) {
        return { err };
    }
};

export default Profile;
