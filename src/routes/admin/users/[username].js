import React from 'react';
import Link from 'next-translate/Link';
import { Row } from 'reactstrap';
import { useForm } from 'react-hook-form';
import UsersService from '../../../services/UsersService';
import { useAuth } from '../../../context/AuthProvider';
import { SelectOptionsUtils } from '../../../libs/formFieldsUtils';
import SelectInput from '../../../components/Form/Inputs/SelectInput';
import Tabs from '../../../components/Tabs/Tabs';
import User from '../../../models/user.model';

const formConfig = {
    mode: 'onChange',
    validateCriteriaMode: 'all',
};

const Profile = (props) => {
    const { profile } = props;
    const user = new User(profile);
    const { authenticatedUser } = useAuth();
    const { watch, control, errors, setValue, getValues, register, formState, handleSubmit } = useForm(formConfig);

    if (!profile) {
        return <p> TODO, unknown user</p>;
    }

    return (
        <main>
            <Row>
                <div className="top-profile-wrapper">
                    <img src={user.getAvatar} alt="" className="img-profile-wrapper"/>
                    <div className="top-profile-content-wrapper">
                        <div className="top-profile-name-btn">
                            <p className="top-profile-name">
                                {user.getFullName}
                                <img src="images/star.png" alt=""/>
                            </p>
                            {
                                authenticatedUser && authenticatedUser.username === user.getUsername && (
                                    <div>
                                        <Link href={'/profile/edit'}>
                                            <a className="btn btn-outline-dark">Editer profil</a>
                                        </Link>
                                    </div>
                                )
                            }

                        </div>
                        <p className="top-profile-login"> {user.getUsername} </p>
                        <div className="top-profile-data-wrapper">
                            {user.getAddressParts.fullAddress &&
                            <p className="top-profile-location">
                                <img src="images/location.png" alt=""/>
                                {user.getAddressParts.fullAddress}
                            </p>
                            }

                            <p className="top-profile-abonnes">
                                {user.getCountFollowers} abonnés
                            </p>

                            <p className="top-profile-abonnes">
                                {user.getCountFollowing} abonnements
                            </p>

                        </div>
                        <p className="top-profile-desc">
                            {user.getDescription}
                        </p>
                    </div>
                </div>
            </Row>

            <Tabs defaultActive={0} classname="nav-tabs-profile" id="myTab">
                <Tabs.Item id="home-tab" title="Vitrine">
                    <form>
                        <div className="profile-marque-wrapper">
                            <div className="dropdown-wrapper ml-0">
                                <span>Catégorie :</span>
                                <div style={{ width: '220px' }}>
                                    <SelectInput
                                        name="car"
                                        control={control}
                                        options={SelectOptionsUtils(['A5', 'A6', 'A7'])}
                                    />
                                </div>

                            </div>
                            <div className="dropdown-wrapper ml-0">
                                <span>Marque :</span>
                                <div style={{ width: '220px' }}>
                                    <SelectInput
                                        name="car"
                                        control={control}
                                        options={SelectOptionsUtils(['A5', 'A6', 'A7'])}
                                    />
                                </div>
                            </div>
                            <div className="d-flex align-items-end flex-column">
                                <div className="dropdown-wrapper ml-0 drop-mb">
                                    <span>Modèle :</span>
                                    <div style={{ width: '220px' }}>
                                        <SelectInput
                                            name="car"
                                            control={control}
                                            options={SelectOptionsUtils(['A5', 'A6', 'A7'])}
                                        />
                                    </div>
                                </div>
                                <div className="dropdown-wrapper dropdown-wrapper-alone">
                                    <span>Trier par :</span>
                                    <div style={{ width: '220px' }}>
                                        <SelectInput
                                            name="car"
                                            control={control}
                                            options={SelectOptionsUtils(['A5', 'A6', 'A7'])}
                                        />
                                    </div>
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
                                            <div className="eye-img"/>
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
                    </form>
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
        </main>
    );
};

Profile.getInitialProps = async function(ctx) {
    const { username } = ctx.query;

    try {
        const profile = await UsersService.getUser(username);
        return {
            username,
            profile,
        };
    } catch (err) {
        return { err };
    }
};

export default Profile;
