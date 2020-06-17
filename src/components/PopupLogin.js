import React, { memo, useContext, useState } from 'react';
import clsx from 'clsx';
import Link from 'next-translate/Link';
import { useRouter } from 'next/router';
import { Col, Row } from 'reactstrap';
import { useForm } from 'react-hook-form';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import TrackChangesIcon from '@material-ui/icons/TrackChanges';
import ExploreIcon from '@material-ui/icons/Explore';
import ForumIcon from '@material-ui/icons/Forum';
import AuthService from '../services/AuthService';
import { useAuth } from '../context/AuthProvider';
import { ModalDialogContext } from '../context/ModalDialogContext';
import { CheckBoxInput, EmailInput, PasswordInput } from './Form/Inputs';
import SSOProviders from './SSOProviders';
import { themeColors } from '../theme/palette';
import Divider from './Divider';
import TitleMUI from './TitleMUI';
import CTAButton from './CTAButton';
import CTALink from './CTALink';
import useTranslation from 'next-translate/useTranslation';

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
        paddingTop: '3rem',
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
        // width: '450px',
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
        maxWidth: '300px',
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
    const theme = useTheme();
    const classes = useStyles();
    const router = useRouter();
    const { isAuthenticated } = useAuth();
    const { control, errors, handleSubmit } = useForm(formConfig);
    const { dispatchModal, dispatchModalError } = useContext(ModalDialogContext);
    const [openLoginModal, toggleLoginModal] = useState(!isAuthenticated);
    const isMobile = useMediaQuery(theme.breakpoints.up('sm'), {
        defaultMatches: true,
    });

    const onSubmit = (form) => {
        const { email, password } = form;
        AuthService.login({
            email,
            password,
        })
            .then(user => {
                router.reload();
                toggleLoginModal(false);
                dispatchModal({
                    msg: `Welcome back ${user.firstname}`,
                });
            }).catch(err => {
                dispatchModalError({ err });
                close();
            },
        );
    };

    if (!openLoginModal) return null;

    return (
        <div className={classes.popupOverlay}>
            <Row className={classes.popupContent}>
                {!isMobile && (
                    <Col sm={12} md={6}>
                        <div className={classes.wrapperLeft}>
                            <LeftBlock/>
                        </div>
                    </Col>
                )}

                <Col sm={12} md={isMobile ? 12 : 6}>
                    <div className={classes.wrapperForm}>
                        <div className="d-flex flex-column">
                            <SSOProviders/>
                        </div>
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
                                    <CTAButton
                                        title="Se connecter"
                                        submit
                                    />
                                </div>
                            </form>

                            <div className="d-block text-center">
                                <Link href="/auth/reset-password">
                                    <a>Mot de passe oublié</a>
                                </Link>

                            </div>

                            <Divider className="m-3"/>
                            <CTALink
                                className="submit"
                                title="Créer un compte"
                                href="/auth/register"
                            />
                            <CTALink
                                className="submit"
                                title="S'enregistrer en tant que Pro"
                                href="/auth/register-pro"
                            />
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

const LeftBlock = memo(() => {
    const classes = useStyles();
    const { t, lang } = useTranslation();
    console.log(lang);
    return (
        <>
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
        </>
    );
});
