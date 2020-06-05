import React, { useContext, useRef, useState } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { inflate } from 'flattenjs';
import { useForm } from 'react-hook-form';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Col, Nav, NavItem, Row, TabContent, TabPane } from 'reactstrap';
import { useAuth } from '../../context/AuthProvider';
import { ModalDialogContext } from '../../context/ModalDialogContext';
import { themeColors } from '../../theme/palette';
import FieldWrapper from '../../components/Form/FieldWrapper';
import { EmailInput, TelInput, TextareaInput, TextInput } from '../../components/Form/Inputs';
import Typography from '@material-ui/core/Typography';
import GeoStreetsInput from '../../components/Form/Inputs/GeoAddressSearchInput';
import resolveObjectKey from '../../libs/resolveObjectKey';
import UsersService from '../../services/UsersService';
import Error from '../_error';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import AvatarPreviewUpload from '../../components/Avatar/AvatarPreviewUpload';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => ({
    stickyNav: {
        position: 'fixed',
        top: '5rem',
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

const dataMapper = {
    firstname: 'firstname',
    email: 'email',
    lastname: 'lastname',
    about: 'about',
    phone: 'phone',
    'address.label': 'address.fullAddress',
    'address.value.housenumber': 'address.housenumber',
    'address.value.name': 'address.street',
    'address.value.postcode': 'address.postalcode',
    'address.value.country': 'address.country',
    'address.value.city': 'address.city',
};

const tabs = [
    {
        title: 'Mon compte',
    },
    {
        title: 'Abonnements',
    },
    {
        title: 'Aide & contact',
    },
    {
        title: 'Paiements & factures',
    },
];

const Edit = () => {
    const theme = useTheme();
    const formRef = useRef();
    const classes = useStyles();
    const { authenticatedUser, setAuthenticatedUser, isAuthenticated } = useAuth();
    const { dispatchModal, dispatchModalError } = useContext(ModalDialogContext);
    const [activeTab, setActiveTab] = useState(0);
    const [user, setUser] = useState(authenticatedUser.getRaw);
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'), {
        defaultMatches: true,
    });
    if (!isAuthenticated) return <Error statusCode="403"/>;

    const { control, watch, errors, handleSubmit } = useForm({
        mode: 'onChange',
        validateCriteriaMode: 'all',
        defaultValues: {
            ...user,
            address: {
                label: user?.address?.fullAddress,
                value: user?.address,
            },
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

    const onSubmit = (form) => {
        const data = inflate(Object.keys(dataMapper).reduce((carry, key) => {
            const value = resolveObjectKey(form, key);
            if (value) {
                return {
                    ...carry,
                    [dataMapper[key]]: value,
                };
            } else {
                return carry;
            }
        }, {}));

        UsersService.updateUser(data)
            .then((updatedUser) => {
                setUser(updatedUser);
                setAuthenticatedUser(updatedUser);
                dispatchModal({
                    msg: 'User successufully updated',
                });
            }).catch(err => {
                dispatchModalError({ err });
            },
        );
    };

    return (
        <>
            <Typography component="h2" variant="h2" className="text-center" gutterBottom>Edition de votre
                profil
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
                        }}/>
                    </Col>
                )}

                <Col xs="12" md="9" lg="9">
                    <form className="p-3 mx-auto" ref={formRef} onSubmit={handleSubmit(onSubmit)}>
                        <TabContent activeTab={activeTab}>
                            <TabPane tabId={0}>
                                <ProfilePartialForm {...{
                                    control,
                                    errors,
                                }}/>
                            </TabPane>
                            <TabPane tabId={1}>
                                <Typography component="h2" variant="h2">Abonnements</Typography>
                            </TabPane>
                            <TabPane tabId={2}>
                                <Typography component="h2" variant="h2">Paiements & Factures</Typography>
                            </TabPane>
                            <TabPane tabId={3}>
                                <Typography component="h2" variant="h2">Aide & Contact</Typography>
                            </TabPane>
                        </TabContent>
                    </form>
                </Col>
            </Row>

            {!isDesktop && (
                <Buttons {...{
                    triggerSubmit,
                }}/>
            )}

        </>
    );
};

const ProfilePartialForm = ({ control, errors }) => {
    const classes = useStyles();

    return (
        <>
            <AvatarPreviewUpload/>
            <div className={classes.formRow}>
                <FieldWrapper label="Prénom">
                    <TextInput
                        name="firstname"
                        errors={errors}
                        control={control}
                        rules={{ required: 'Required' }}
                    />
                </FieldWrapper>

                <FieldWrapper label="Nom">
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

            <FieldWrapper label="Mot de passe" classNameWrapper="my-3">
                <Link href="/auth/reset-password">
                    <a className="m-2">
                        Reset password
                    </a>
                </Link>
            </FieldWrapper>

            <FieldWrapper label="Adresse">
                <GeoStreetsInput
                    name="address"
                    // enableGeoloc
                    // long={coordinates?.[0]}
                    // lat={coordinates?.[1]}
                    control={control}
                    errors={errors}
                    rules={{ required: 'Required' }}
                    inputProps={{
                        placeholder: '10 avenue du Prado, 13007 Marseille',
                    }}
                />
            </FieldWrapper>

            <FieldWrapper label="Numéro de téléphone">
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

const NavDesktop = ({ activeTab, toggleTab, triggerSubmit }) => {
    const classes = useStyles();
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

            <Buttons triggerSubmit={triggerSubmit}/>
        </div>
    );
};

const NavMobile = ({ activeTab, toggleTab, buttonText, triggerSubmit }) => {
    const classes = useStyles();

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

const Buttons = ({ triggerSubmit }) => {
    const classes = useStyles();

    return (
        <div className="d-flex flex-column my-3">
            <Button
                variant="contained"
                color="primary"
                size="large"
                className={classes.button}
                startIcon={<SaveIcon/>}
                type="submit"
                onClick={(e) => {
                    triggerSubmit();
                }}>
                Enregister
            </Button>
        </div>
    );
};

export default Edit;
