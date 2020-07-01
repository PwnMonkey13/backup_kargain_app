import React, { useContext, useEffect, useRef, useState } from 'react';
import Link from 'next-translate/Link';
import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Col, Nav, NavItem, Row, TabContent, TabPane } from 'reactstrap';
import useTranslation from 'next-translate/useTranslation';
import { useAuth } from '../../../context/AuthProvider';
import { ModalDialogContext } from '../../../context/ModalDialogContext';
import { themeColors } from '../../../theme/palette';
import FieldWrapper from '../../../components/Form/FieldWrapper';
import { EmailInput, SelectCountryFlags, TelInput, TextareaInput, TextInput } from '../../../components/Form/Inputs';
import UsersService from '../../../services/UsersService';
import AvatarPreviewUpload from '../../../components/Avatar/AvatarPreviewUpload';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import UserModel from '../../../models/user.model';
import Error from '../../_error';
import Alert from '@material-ui/lab/Alert';
import SearchLocationInput from '../../../components/Form/Inputs/SearchLocationInput';
import ValidationErrors from '../../../components/Form/Validations/ValidationErrors';
import CTALink from '../../../components/CTALink';

const useStyles = makeStyles(() => ({
    stickyNav: {
        position: 'fixed',
    },

    nav: {
        padding: 0,
        width: '100%',
        maxWidth: '260px',
    },

    navMobile: {
        display: 'flex',
    },

    navList: {
        width: '100%',
        boxShadow: '0 0.5rem 1rem rgba(0,0,0,0.15)',
        borderRadius: '20px',
    },

    button: {
        margin: '1rem',
    },

    navItem: {
        border: 'none',
        padding: '1rem',
        borderRadius: 0,
        textAlign: 'center',
        textDecoration: 'none',
        transition: 'all .2s ease-in-out',
        cursor: 'pointer',

        '&.active': {
            fontWeight: '700',
            border: 'none',
            borderBottom: `4px solid ${themeColors.blue}`,
            color: themeColors.blue,
            textAlign: 'center',
            background: 'none',
        },

        '&:last-child': {
            borderBottom: 'unset!important',
        },
    },

    formRow: {
        display: 'flex',

        '& > div': {
            margin: '1rem',
            flex: 1,
        },
    },
}));

const Edit = ({ profileRaw, isAdmin, isSelf, err }) => {
    const theme = useTheme();
    const formRef = useRef();
    const classes = useStyles();
    const { t } = useTranslation();
    const { isAuthReady, updateAuthenticatedRawUser } = useAuth();
    const { dispatchModal, dispatchModalError } = useContext(ModalDialogContext);
    const [stateReady, setStateReady] = useState(false);
    const [activeTab, setActiveTab] = useState(0);
    const [profile, setProfile] = useState(new UserModel(profileRaw));
    const [openDialogRemove, setOpenDialogRemove] = useState(false);
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'), {
        defaultMatches: true,
    });

    const { register, control, watch, errors, handleSubmit } = useForm({
        mode: 'onChange',
        validateCriteriaMode: 'all',
        defaultValues: {
            ...profile.getRaw,
            address: profile.getAddressParts,
        },
    });

    const toggleTab = (tabIndex) => {
        if (activeTab !== tabIndex) {
            setActiveTab(tabIndex);
        }
    };

    const triggerSubmit = () => {
        formRef.current.dispatchEvent(new Event('submit'));
    };

    const handleOpenDialogRemove = () => {
        setOpenDialogRemove(true);
    };

    const handleCloseDialogRemove = () => {
        setOpenDialogRemove(false);
    };

    const handleRemove = () => {
        UsersService.removeUser(profile.getUsername)
            .then(() => {
                dispatchModal({ msg: 'User successfully removed (disabled)' });
            }).catch(err => {
                dispatchModalError({ err });
            },
        );
    };

    const onSubmit = (form) => {
        UsersService.updateUser(form)
            .then(updatedUser => {
                setProfile(new UserModel(updatedUser));
                if (isSelf) updateAuthenticatedRawUser(updatedUser);
                dispatchModal({
                    msg: 'User successfully updated',
                });
            }).catch(err => {
                dispatchModalError({ err });
            },
        );
    };

    useEffect(() => {
        if (isAuthReady) setStateReady(true);
    }, [isAuthReady]);

    if (!stateReady) return null;
    if (!isSelf && !isAdmin) return <Error statusCode={404}/>;
    if (err) return <Error message={err.message} statusCode={err.statusCode}/>;

    return (
        <>
            <Dialog
                open={openDialogRemove}
                onClose={handleCloseDialogRemove}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" disableTypography>
                    {t('vehicles:confirm-suppression')}
                </DialogTitle>

                <DialogActions>
                    <Button onClick={handleCloseDialogRemove} color="primary" autoFocus>
                        {t('vehicles:cancel')}
                    </Button>
                    <Button
                        variant="contained"
                        color="warning"
                        className={classes.button}
                        startIcon={<DeleteIcon/>}
                        onClick={() => handleRemove}>
                        {t('vehicles:remove-announce')}
                    </Button>
                </DialogActions>
            </Dialog>

            {isAdmin && (
                <Alert severity="info" className="mb-2">
                    Connected as Admin
                </Alert>
            )}

            <Typography component="h2" variant="h2" className="text-center" gutterBottom>
                {t('vehicles:edit-my-profile')}
            </Typography>

            {!isDesktop && (
                <NavMobile {...{
                    activeTab,
                    toggleTab,
                }}/>
            )}

            <Row className="justify-content-center">
                {isDesktop && (
                    <Col sm="12" md="3" lg="3">
                        <NavDesktop {...{
                            classes,
                            activeTab,
                            toggleTab,
                            triggerSubmit,
                            profilePageLink: profile.getProfileLink,
                        }}/>
                    </Col>
                )}

                <Col xs="12" md="9" lg="9">
                    <form className="p-3 mx-auto" ref={formRef} onSubmit={handleSubmit(onSubmit)}>
                        {errors && <ValidationErrors errors={errors}/>}
                        <TabContent activeTab={activeTab}>
                            <TabPane tabId={0}>
                                <ProfilePartialForm {...{
                                    control,
                                    watch,
                                    errors,
                                }}/>
                            </TabPane>
                            <TabPane tabId={1}>
                                <Typography component="h2" variant="h2">
                                    {t('vehicles:subscriptions')}
                                </Typography>
                            </TabPane>
                            <TabPane tabId={2}>
                                <Typography component="h2" variant="h2">
                                    {t('vehicles:payments-bills')}
                                </Typography>
                            </TabPane>
                            <TabPane tabId={3}>
                                <Typography component="h2" variant="h2">
                                    todo notifs
                                </Typography>
                            </TabPane>
                            <TabPane tabId={4}>
                                <Typography component="h2" variant="h2">
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        className={classes.button}
                                        startIcon={<DeleteIcon/>}
                                        onClick={handleOpenDialogRemove}>
                                        {t('vehicles:remove-announce')}
                                    </Button>
                                </Typography>
                            </TabPane>
                        </TabContent>

                        {!isDesktop && (
                            <Buttons {...{
                                profilePageLink: profile.getProfileLink,
                                triggerSubmit,
                            }}/>
                        )}
                    </form>
                </Col>
            </Row>
        </>
    );
};

const ProfilePartialForm = ({ control, watch, errors }) => {
    const classes = useStyles();
    const { t } = useTranslation();
    const countrySelect = watch('countrySelect');
    return (
        <>
            <AvatarPreviewUpload/>
            <div className={classes.formRow}>
                <FieldWrapper label={t('vehicles:firstname')}>
                    <TextInput
                        name="firstname"
                        errors={errors}
                        control={control}
                        rules={{ required: 'Required' }}
                    />
                </FieldWrapper>

                <FieldWrapper label={t('vehicles:lastname')}>
                    <TextInput
                        name="lastname"
                        errors={errors}
                        control={control}
                        rules={{ required: 'Required' }}
                    />
                </FieldWrapper>
            </div>

            <FieldWrapper label="Email">
                <EmailInput
                    name="email"
                    errors={errors}
                    control={control}
                    disabled
                    rules={{ required: 'Required' }}
                />
            </FieldWrapper>

            <FieldWrapper label={t('vehicles:password')} classNameWrapper="my-3">
                <Link href="/auth/forgotten">
                    <a className="m-2">
                        Reset password
                    </a>
                </Link>
            </FieldWrapper>

            <FieldWrapper label={t('vehicles:country')}>
                <SelectCountryFlags
                    name="countrySelect"
                    errors={errors}
                    control={control}
                />
            </FieldWrapper>

            <FieldWrapper label={t('vehicles:address')}>
                <SearchLocationInput
                    name="address"
                    country={countrySelect?.value}
                    control={control}
                    rules={{ required: 'Required' }}>
                </SearchLocationInput>
            </FieldWrapper>

            <FieldWrapper label={t('vehicles:phone')}>
                <TelInput
                    name="phone"
                    errors={errors}
                    control={control}
                    rules={{ required: 'Field required' }}
                    innerProps={{
                        country: 'fr',
                    }}
                />
            </FieldWrapper>

            <FieldWrapper label="Description">
                <TextareaInput
                    name="about"
                    control={control}
                    errors={errors}
                />
            </FieldWrapper>
        </>
    );
};

const NavDesktop = ({ activeTab, toggleTab, triggerSubmit, profilePageLink }) => {
    const classes = useStyles();
    const { t } = useTranslation();
    const tabs = [
        {
            title: t('vehicles:my-profile'),
        },
        {
            title: t('vehicles:subscriptions'),
        },
        {
            title: t('vehicles:payments-bills'),
        },
        {
            title: t('vehicles:notifications'),
        },
        {
            title: t('vehicles:confidentiality-security'),
        },
    ];
    return (
        <div className={clsx(classes.nav, classes.stickyNav)}>
            <div className="my-2">
                <Nav vertical className={classes.navList}>
                    {tabs && tabs.map((tab, index) => (
                        <NavItem
                            key={index}
                            className={clsx(classes.navItem, activeTab === index && 'active')}
                            onClick={() => toggleTab(index)}>
                            {tab.title}
                        </NavItem>
                    ))}
                </Nav>
            </div>

            <Buttons
                triggerSubmit={triggerSubmit}
                profilePageLink={profilePageLink}
            />
        </div>
    );
};

const NavMobile = ({ activeTab, toggleTab }) => {
    const classes = useStyles();
    const { t } = useTranslation();
    const tabs = [
        {
            title: t('vehicles:my-profile'),
        },
        {
            title: t('vehicles:subscriptions'),
        },
        {
            title: t('vehicles:payments-bills'),
        },
        {
            title: t('vehicles:notifications'),
        },
        {
            title: t('vehicles:confidentiality-security'),
        },
    ];
    return (
        <Nav className={clsx(classes.navList, classes.navMobile)}>
            {tabs && tabs.map((tab, index) => (
                <NavItem
                    key={index}
                    className={clsx(classes.navItem, activeTab === index && 'active')}
                    onClick={() => toggleTab(index)}>
                    {tab.title}
                </NavItem>
            ))}
        </Nav>
    );
};

const Buttons = ({ triggerSubmit, profilePageLink }) => {
    const classes = useStyles();
    const { t } = useTranslation();
    return (
        <div className="d-flex flex-column mx-auto my-3" style={{ maxWidth: '300px' }}>
            <Button
                variant="contained"
                color="primary"
                size="large"
                className={classes.button}
                startIcon={<SaveIcon/>}
                type="submit"
                onClick={() => {
                    triggerSubmit();
                }}>
                {t('vehicles:save')}
            </Button>

            <CTALink title="back to profile" href={profilePageLink}/>
        </div>
    );
};

export async function getServerSideProps (ctx) {
    const { username } = ctx.query;
    try {
        const additionalHeaders = { Cookie: ctx.req.headers['cookie'] };
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
                err: {
                    message: err?.message ?? null,
                    statusCode: err?.statusCode ?? 404,
                },
            },
        };
    }
}

export default Edit;
