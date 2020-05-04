import React, { memo, useContext, useState } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import makeStyles from '@material-ui/core/styles/makeStyles';
import TrackChangesIcon from '@material-ui/icons/TrackChanges';
import ExploreIcon from '@material-ui/icons/Explore';
import ForumIcon from '@material-ui/icons/Forum';
import AuthService from '../services/AuthService';
import { UserContext } from '../context/UserContext';
import { ModalDialogContext } from '../context/ModalDialogContext';
import { CheckBoxInput, EmailInput, PasswordInput } from './Form/Inputs';
import { themeColors } from '../theme/palette';
import Divider from './Divider';
import TitleMUI from './TitleMUI';

const formConfig = {
    mode: 'onChange',
    reValidateMode: 'onChange',
    validateCriteriaMode: 'all',
};

const useStyles = makeStyles(() => ({

    popupOverlay: {
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        background: 'rgba(0, 0, 0,0.5)',
        display: 'flex',
        zIndex: 999,
    },

    popupContent: {
        display: 'flex',
        position: 'relative',
        overflow: 'hidden',
        width: '800px',
        height: '80vh',
        margin: 'auto',
        zIndex: 5,
    },

    wrapperLeft: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '450px',
        height: '100%',
        textAlign: 'center',
        borderRadius: '10px',
        color: themeColors.white,
        transition: 'all .5s',
        backgroundColor: '#3D4348',
    },

    contentLeft: {
        display: 'flex',
        flexDirection: 'column',
    },

    wrapperForm: {
        borderRadius: '10px',
        backgroundColor: '#fff',
        width: '300px',
        height: '100%',
        padding: '1rem',
        margin: 'auto',
        position: 'relative',
        zIndex: 10,
        overflow: 'hidden',
        transition: 'all .5s',
    },

}));

export default () => {
    const classes = useStyles();
    const { control, errors, setValue, getValues, formState, watch, register, handleSubmit } = useForm(formConfig);

    const { session, dispatchLoginSuccess } = useContext(UserContext);
    const { dispatchModal } = useContext(ModalDialogContext);
    const [openLoginModal, toggleLoginModal] = useState(!session.isLoggedIn);

    const onSubmit = (form) => {
        const { email, password } = form;
        AuthService.login({ email, password })
            .then(data => {
                const { user } = data;
                toggleLoginModal(false);
                dispatchLoginSuccess({payload: data})
                dispatchModal({ type: 'success', msg: `Welcome back ${user.firstname}`,
                });
            }).catch(err => {
                dispatchModal({
                    type: 'error',
                    err,
                });
                close();
            },
        );
    };

    const LeftBlock = memo(() => {
        return (
            <div className={classes.wrapperLeft}>
                <div style={{ flex: 1 }}>
                    <div className="over-header m-b-lg">
                        <img className="img-fluid" width={300} src="/images/kargain-logo-white.png" alt="kargain"/>
                    </div>
                </div>
                <div className={clsx(classes.contentleft, 'm-3')} style={{ flex: 3 }}>
                    <div className="p-2">
                        <TrackChangesIcon fontSize="large"/>
                        <TitleMUI as="h4" variant="h3" color="white">
                            Petites annonces automobiles
                        </TitleMUI>
                    </div>

                    <div className="p-2">
                        <ExploreIcon fontSize="large"/>
                        <TitleMUI as="h4" variant="h3" color="white">
                            Trouvez, vendez des véhicules prés de chez vous
                        </TitleMUI>
                    </div>

                    <div className="p-2">
                        <ForumIcon fontSize="large"/>
                        <TitleMUI as="h4" variant="h3" color="white">
                            Publiez et partagez du contenu avec la communauté
                        </TitleMUI>
                    </div>
                </div>
            </div>
        );
    });

    const Providers = memo(() => {
        return (
            <div className="d-flex flex-column">
                <Link href="#">
                    <a className="p-2 register-fb">
                        <img src="/images/fb.png" alt=""/>
                        Se connecter avec Facebook
                    </a>
                </Link>
                <Link href="#">
                    <a className="p-2 register-g">
                        <img src="/images/g+.png" alt=""/>
                        Se connecter avec Google+
                    </a>
                </Link>
            </div>
        );
    });

    if (!openLoginModal) return null;

    return (
        <div className={classes.popupOverlay}>
            <div className={classes.popupContent}>
                <LeftBlock/>

                <div className={classes.wrapperForm}>

                    <Providers/>
                    <Divider className="m-3"/>
                    <div className="auth_form m-auto">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mt-2 form-group">
                                <EmailInput
                                    name="email"
                                    placeholder="email"
                                    errors={errors}
                                    control={control}
                                    rules={{
                                        required: 'field required',
                                    }}
                                />
                            </div>

                            <div className="mt-2 form-group">
                                <PasswordInput
                                    name="password"
                                    placeholder="Mot de passe"
                                    errors={errors}
                                    control={control}
                                    rules={{
                                        required: 'field required',
                                    }}
                                />
                            </div>

                            <div className="mt-2 form-group">
                                <CheckBoxInput
                                    name="confirm"
                                    label="Se souvenir de moi"
                                    errors={errors}
                                    control={control}
                                />

                            </div>

                            <div className="submit">
                                <button className="p-2 btn btn-outline-primary" type="submit">Se connecter</button>
                            </div>
                        </form>

                        <div className="d-block text-center">
                            <Link href="/auth/reset-password">
                                <a>Mot de passe oublié</a>
                            </Link>

                        </div>

                        <Divider className="m-3"/>
                        <Link href='/auth/register'>
                            <a className="p-2 lead btn btn-outline-primary submit">
                                Créer un compte
                            </a>
                        </Link>
                        <Link href="/auth/register-pro">
                            <a className="p-2 lead btn btn-outline-primary submit">
                                S'enregistrer en tant que Pro
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
