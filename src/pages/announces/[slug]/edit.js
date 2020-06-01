import React, { useContext, useRef, useState } from 'react';
import clsx from 'clsx';
import { inflate } from 'flattenjs';
import { useForm } from 'react-hook-form';
import { Col, Nav, NavItem, Row, TabContent, TabPane } from 'reactstrap';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PageViewIcon from '@material-ui/icons/Pageview';
import SaveIcon from '@material-ui/icons/Save';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { themeColors } from '../../../theme/palette';
import resolveObjectKey from '../../../libs/resolveObjectKey';
import { SelectOptionsUtils } from '../../../libs/formFieldsUtils';
import AnnounceService from '../../../services/AnnounceService';
import { useAuth } from '../../../context/AuthProvider';
import { ModalDialogContext } from '../../../context/ModalDialogContext';
import AnnounceClass from '../../../models/announce.model';
import FieldWrapper from '../../../components/Form/FieldWrapper';
import TextInput from '../../../components/Form/Inputs/TextInput';
import NumberInput from '../../../components/Form/Inputs/NumberInput';
import SelectInput from '../../../components/Form/Inputs/SelectInput';
import TagsControlled from '../../../components/Tags/TagsControlled';
import TextareaInput from '../../../components/Form/Inputs/TextareaInput';
import AnnounceImagesAutoUpload from '../../../components/Uploads/AnnounceImagesAutoUpload';
import CheckboxControlledMUI from '../../../components/Form/Inputs/CheckboxControlledMUI';
import CheckboxMultipleInput from '../../../components/Form/Inputs/CheckboxMultipleInput';
import DamageSelectorControlledCar from '../../../components/Damages/DamageSelectorControlledCar';
import Error from '../../_error';
import {
    CheckboxOptionsEquipments,
    RadioChoicesEmission,
    RadioChoicesEngine,
    RadioChoicesExternalColor,
    RadioChoicesGas,
    RadioChoicesMaterials,
    RadioChoicesPaints,
    RadioFunctionVehicle,
    RadioTypeFunction,
    RadioVehicleGeneralState,
} from '../../../components/Vehicles/car/form.data';
import GalleryViewer from '../../../components/Gallery/GalleryViewer';
import GalleryImgsLazy from '../../../components/Gallery/GalleryImgsLazy';
import NumberInputMUI from '../../../components/Form/Inputs/NumberInputMUI';

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
        display : 'flex',
    },

    button: {
        margin: '1rem',
    },

    navList: {
        width: '100%',
        boxShadow: '0 0.5rem 1rem rgba(0,0,0,0.15)',
        borderRadius: '20px',
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

    priceStarsWrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        margin: '15px 0',
    },

    wysiwyg: {
        margin: '1rem',
        padding: '1rem',
        border: '1px solid gainsboro',
        borderRadius: '5px',
    },

    damages: {
        width: '100%',
        margin: '2rem 1rem',
    },
}));

const allowedFields = {
    title: 'title',
    showCellPhone: 'showCellPhone',
    visible: 'visible',
    published: 'published',
    status: 'status',
    description: 'description',
    price: 'price',
    vehicleFunctionType: 'vehicleFunctionType',
    vehicleFunctionUse: 'vehicleFunctionUse',
    vehicleGeneralState: 'vehicleGeneralState',
    vehicleFunction: 'vehicleFunction',
    'vehicleEngine.type': 'vehicleEngine.type',
    'vehicleEngine.gas': 'vehicleEngine.gas',
    'vehicleEngine.cylinder': 'vehicleEngine.cylinder',
    'power.km': 'power.km',
    'power.ch': 'power.ch',
    'consumption.mixt': 'consumption.mixt',
    'consumption.city': 'consumption.city',
    'consumption.road': 'consumption.road',
    'consumption.gkm': 'consumption.gkm',
    mileage: 'mileage',
    equipments: 'equipments',
    damages: 'damages',
    doors: 'doors',
    seats: 'seats',
    driverCabins: 'driverCabins',
    bunks: 'bunks',
    beds: 'beds',
    bedType: 'bedType',
    paint: 'paint',
    materials: 'materials',
    externalColor: 'externalColor',
    internalColor: 'internalColor',
    emission: 'emission',
    images: 'images',
    tags: 'tags',
    'address.label': 'address.fullAddress',
    'address.value.housenumber': 'address.housenumber',
    'address.value.name': 'address.street',
    'address.value.postcode': 'address.postalcode',
    'address.value.country': 'address.country',
    'address.value.city': 'address.city',
};

const tabs = [
    {
        title: 'Caractéristiques du véhicule',
    },
    {
        title: 'Equipements',
    },
    {
        title: 'Etat du véhicule',
    },
    {
        title: 'Photos',
    },
    {
        title: 'Publication',
    },
];

const AnnounceEdit = ({ announceRaw, err }) => {
    const refImg = useRef();
    const formRef = useRef();
    const theme = useTheme();
    const { isAuthenticated, authenticatedUser } = useAuth();
    const { dispatchModal, dispatchModalError } = useContext(ModalDialogContext);
    const [activeTab, setActiveTab] = useState(1);
    const [buttonText, setButtonText] = useState('Enregistrer et publier');
    const [announce, setAnnounce] = useState(new AnnounceClass(announceRaw));
    const isAuthor = isAuthenticated && authenticatedUser.getID === announce.getAuthor?.getID;
    const { control, register, getValues, setValue, watch, errors, handleSubmit } = useForm({
        mode: 'onChange',
        validateCriteriaMode: 'all',
        defaultValues: announceRaw,
    });

    const isDesktop = useMediaQuery(theme.breakpoints.up('md'), {
        defaultMatches: true,
    });

    if (!announceRaw) return <Error statusCode="404"/>;
    if (!isAuthenticated) return <Error statusCode="403"/>;
    if (!isAuthor) return <Error statusCode="403"/>;

    const handleCLickImg = (index) => {
        if (refImg.current) {
            refImg.current.slideToIndex(index);
            refImg.current.fullScreen();
        }
    };

    const toggleTab = (tabIndex) => {
        if (activeTab !== tabIndex) {
            setActiveTab(tabIndex);
        }
    };

    const triggerSubmit = () => {
        formRef.current.dispatchEvent(new Event('submit'));
    };

    const onSubmit = (form) => {
        const updates = inflate(Object.keys(allowedFields).reduce((carry, key) => {
            const value = resolveObjectKey(form, key);
            if (value) {
                return {
                    ...carry,
                    [allowedFields[key]]: value,
                };
            } else {
                return carry;
            }
        }, {}));

        AnnounceService.updateAnnounce(announce.getSlug, updates)
            .then((updatedAd) => {
                setAnnounce(updatedAd);
                dispatchModal({
                    msg: 'Ad successufully updated',
                });
            }).catch(err => {
                dispatchModalError({ err });
            },
        );
    };

    return (
        <>
            <Typography component="h2" variant="h2" className="text-center" gutterBottom>Edition de votre
                annonce
            </Typography>

            {!isDesktop && (
                <NavMobile {...{
                    activeTab,
                    toggleTab,
                }}/>
            )}

            <Row>
                {isDesktop && (
                    <Col sm="12" md="4" lg="4">
                        <NavDesktop {...{
                            activeTab,
                            toggleTab,
                            buttonText,
                            triggerSubmit,
                        }}/>
                    </Col>
                )}

                <Col sm="12" md="8" lg="8">
                    <form className="p-3 mx-auto" ref={formRef} onSubmit={handleSubmit(onSubmit)}>
                        <TabContent activeTab={activeTab}>
                            <TabPane tabId={0}>
                                <VehicleInfosPartialForm {...{
                                    control,
                                    errors,
                                }} />
                            </TabPane>
                            <TabPane tabId={1}>
                                <div className="form-fields">
                                    <Typography component="h3" variant="h3" className="text-center" gutterBottom>
                                        Sélection des équipements
                                    </Typography>
                                    <CheckboxMultipleInput
                                        name="equipments"
                                        options={CheckboxOptionsEquipments}
                                        defaultOptions={['ABS', 'ESP']}
                                        control={control}
                                        errors={errors}
                                    />
                                </div>
                            </TabPane>

                            <TabPane tabId={2}>
                                <Typography component="h3" variant="h3" className="text-center" gutterBottom>Sélection
                                    des dégats éventuels
                                </Typography>
                                <DamageSelectorControlledCar
                                    name="damages"
                                    control={control}
                                    defaultValues={announce.getDamagesTabs}
                                    selectorFullWidth
                                />
                            </TabPane>

                            <TabPane tabId={3}>
                                <div className="pics">
                                    {announce.getCountImages > 0 && (
                                        <>
                                            <GalleryViewer images={announce.getFormatedImagesViewer} ref={refImg}/>
                                            {isDesktop && (
                                                <GalleryImgsLazy
                                                    images={announce.getImages}
                                                    handleCLickImg={handleCLickImg}
                                                />
                                            )}
                                        </>
                                    )}
                                </div>
                                <AnnounceImagesAutoUpload
                                    announceSlug={announce.getSlug}
                                    enableRefreshAfterUpload
                                />
                            </TabPane>

                            <TabPane tabId={4}>
                                <PublicationInfosPartialForm {...{
                                    control,
                                    errors,
                                    register,
                                }} />
                            </TabPane>
                        </TabContent>
                    </form>
                </Col>
            </Row>

            {!isDesktop && (
                <Buttons {...{buttonText, triggerSubmit}}/>
            )}
        </>
    );
};

const VehicleInfosPartialForm = ({ control, errors }) => {
    return (
        <div className="form-fields">
            <Typography component="h3" variant="h3" className="text-center" gutterBottom>Données
                constructeur
            </Typography>

            <Row>
                <Col sm={12} md={6} lg={3}>
                    <FieldWrapper label="Marque">
                        <TextInput
                            name={'manufacturer.make.label'}
                            control={control}
                            disabled
                        />
                    </FieldWrapper>
                </Col>

                <Col sm={12} md={6} lg={3}>
                    <FieldWrapper label="Modele">
                        <TextInput
                            name={'manufacturer.model.label'}
                            control={control}
                            disabled
                        />
                    </FieldWrapper>
                </Col>

                <Col sm={12} md={6} lg={3}>
                    <FieldWrapper label="Version">
                        <TextInput
                            name={'manufacturer.generation.label'}
                            control={control}
                            disabled
                        />
                    </FieldWrapper>
                </Col>

                <Col sm={12} md={6} lg={3}>
                    <FieldWrapper label="Année">
                        <TextInput
                            name={'manufacturer.year.label'}
                            control={control}
                            disabled
                        />
                    </FieldWrapper>
                </Col>
            </Row>

            <Row>
                <Col>
                    <FieldWrapper label="Cylindrée">
                        <NumberInput name="vehicleEngine.cylinder"
                                     control={control}
                                     errors={errors}
                                     placeholder="150 ch"

                        />
                    </FieldWrapper>
                </Col>

            </Row>

            <Row>
                <Col>
                    <FieldWrapper label="Carburant" required>
                        <SelectInput name="vehicleEngine.gas"
                                     options={RadioChoicesGas}
                                     control={control}
                                     errors={errors}
                        />
                    </FieldWrapper>
                </Col>
                <Col>
                    <FieldWrapper label="Boite de vitesse">
                        <SelectInput
                            name="vehicleEngine.type"
                            options={RadioChoicesEngine}
                            control={control}
                            errors={errors}
                        />
                    </FieldWrapper>
                </Col>
            </Row>

            <Row>
                <Col>
                    <FieldWrapper label="Puissance kW">
                        <NumberInput name="power.kw"
                                     control={control}
                                     errors={errors}
                                     placeholder={0}


                        />
                    </FieldWrapper>
                </Col>
                <Col>
                    <FieldWrapper label="Puissance CH">
                        <NumberInput name="power.ch"
                                     control={control}
                                     errors={errors}
                                     placeholder={0}
                        />
                    </FieldWrapper>
                </Col>
            </Row>

            <Typography component="h3" variant="h3" className="text-center" gutterBottom>Utilisation</Typography>
            <Row>
                <Col>
                    <FieldWrapper label="Type">
                        <SelectInput name="vehicleFunctionType"
                                     options={RadioTypeFunction}
                                     control={control}
                                     errors={errors}
                        />
                    </FieldWrapper>
                </Col>
                <Col>
                    <FieldWrapper label="Fonction du véhicule">
                        <SelectInput
                            name="vehicleFunction"
                            options={RadioFunctionVehicle}
                            control={control}
                            errors={errors}
                        />
                    </FieldWrapper>
                </Col>
            </Row>

            <Row>
                <Col>
                    <FieldWrapper label="Kilométrage" required>
                        <NumberInput name="mileage"
                                     placeholder="20000 km"
                                     control={control}
                                     errors={errors}

                        />
                    </FieldWrapper>
                </Col>
                <Col>
                    <FieldWrapper label="Etat général">
                        <SelectInput
                            name="vehicleGeneralState"
                            options={RadioVehicleGeneralState}
                            control={control}
                            errors={errors}
                        />
                    </FieldWrapper>
                </Col>
            </Row>

            <Row>
                <Col>
                    <FieldWrapper label="Nombre de propriétaires">
                        <SelectInput
                            name="ownersCount"
                            options={SelectOptionsUtils([2, 3, 4, 5])}
                            placeholder="Select number of owners"
                            control={control}
                            errors={errors}
                        />
                    </FieldWrapper>
                </Col>


            </Row>

            <Typography component="h3" variant="h3" className="text-center" gutterBottom>Consommation</Typography>
            <Row>
                <Col>
                    <FieldWrapper label="Mixte (g/km)">
                        <NumberInput
                            name="consumption.mixt"
                            control={control}
                            errors={errors}
                            placeholder="20 g/100"

                        />
                    </FieldWrapper>
                </Col>
                <Col>
                    <FieldWrapper label="Ville (g/km)">
                        <NumberInput
                            name="consumption.city"
                            control={control}
                            errors={errors}
                            placeholder="20 g/100"

                        />
                    </FieldWrapper>
                </Col>
            </Row>

            <Row>
                <Col>
                    <FieldWrapper label="Route (g/km)">
                        <NumberInput
                            name="consumption.road"
                            control={control}
                            errors={errors}
                            placeholder="20 g/100"

                        />
                    </FieldWrapper>
                </Col>
                <Col>
                    <FieldWrapper label="CO2 (g/km)">
                        <NumberInput
                            name="consumption.gkm"
                            control={control}
                            errors={errors}
                            placeholder={0}

                        />
                    </FieldWrapper>
                </Col>
            </Row>

            <Row>
                <Col>
                    <FieldWrapper label="Classe d'émission">
                        <SelectInput
                            name="emission"
                            options={RadioChoicesEmission}
                            control={control}
                            errors={errors}
                        />
                    </FieldWrapper>
                </Col>
            </Row>

            <Typography component="h3" variant="h3" className="text-center" gutterBottom>Données
                supplémentaires</Typography>
            <Row>
                <Col>
                    <FieldWrapper label="Nombre de portes">
                        <SelectInput
                            name="doors"
                            options={SelectOptionsUtils([2, 3, 4, 5])}
                            placeholder="Select number of doors"
                            control={control}
                            errors={errors}
                        />
                    </FieldWrapper>
                </Col>
                <Col>
                    <FieldWrapper label="Nombre de places">
                        <SelectInput
                            name="seats"
                            options={SelectOptionsUtils([2, 3, 4, 5])}
                            placeholder="Select number of seats"
                            control={control}
                            errors={errors}
                        />
                    </FieldWrapper>
                </Col>
            </Row>

            <Row>
                <Col>
                    <FieldWrapper label="Peinture">
                        <SelectInput
                            name="paint"
                            options={RadioChoicesPaints}
                            control={control}
                            errors={errors}
                        />
                    </FieldWrapper>
                </Col>
                <Col>
                    <FieldWrapper label="Matériaux">
                        <SelectInput
                            name="materials"
                            isMulti
                            options={RadioChoicesMaterials}
                            control={control}
                            errors={errors}
                        />
                    </FieldWrapper>
                </Col>
            </Row>

            <Row>
                <Col>
                    <FieldWrapper label="Couleur extérieure">
                        <SelectInput
                            name="externalColor"
                            options={RadioChoicesExternalColor}
                            control={control}
                            errors={errors}
                        />
                    </FieldWrapper>
                </Col>
                <Col>
                    <FieldWrapper label="Couleur intérieure">
                        <SelectInput
                            name="internalColor"
                            options={RadioChoicesExternalColor}
                            control={control}
                            errors={errors}
                        />
                    </FieldWrapper>
                </Col>
            </Row>
        </div>
    );
};

const PublicationInfosPartialForm = ({ register, control, errors }) => {
    return (
        <div className="form-fields">
            <Typography component="h3" variant="h3" className="text-center" gutterBottom>Données de
                publication
            </Typography>

            <FieldWrapper label="Titre de l'annonce">
                <TextInput
                    name="title"
                    control={control}
                    rules={{
                        required: 'Title is required',
                    }}
                />
            </FieldWrapper>

            <FieldWrapper label="Description de l'annonce">
                <TextareaInput
                    name="description"
                    control={control}
                    errors={errors}
                />
            </FieldWrapper>

            <FieldWrapper label="Prix de l'annonce">
                <NumberInputMUI
                    name="price"
                    control={control}
                    errors={errors}
                    rules={{
                        required: 'Price is required',
                        validate: val => {
                            const value = Number(val);
                            if (value < 500) return 'Min 500€';
                            if (value > 200000) return 'Max 200 000€';
                        },
                    }}
                />
            </FieldWrapper>

            <FieldWrapper label="Tags">
                <TagsControlled
                    name="tags"
                    control={control}
                    register={register}
                    rules={{
                        validate: {
                            maxItems: (v) => {
                                console.log(v);
                                return v.length > 5 ? 'max 5' : null;
                            },
                        },
                    }}
                    errors={errors}
                />
            </FieldWrapper>

            <Typography component="h3" variant="h3" className="text-center" gutterBottom>Gestion de l'announce
            </Typography>

            <CheckboxControlledMUI
                name="status"
                value="visible"
                label="Publier l'announce"
                control={control}
                errors={errors}
            />

            <CheckboxControlledMUI
                name="status"
                value="archived"
                label="Archiver l'announce"
                color="warning"
                control={control}
                errors={errors}
            />

            <CheckboxControlledMUI
                name="status"
                value="deleted"
                label="Supprimer l'announce"
                color="error"
                control={control}
                errors={errors}
            />
        </div>
    );
};

const Buttons = ({buttonText, triggerSubmit }) => {
    const classes = useStyles();

    return(
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
                {buttonText}
            </Button>

            <Button
                color="secondary"
                size="medium"
                className={classes.button}
                startIcon={<PageViewIcon/>}
            >
                Voir l'annonce
            </Button>
        </div>
    )
}

const NavDesktop = ({ activeTab, toggleTab, buttonText, triggerSubmit }) => {
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

            <Buttons {...{buttonText, triggerSubmit}}/>
        </div>
    );
};

const NavMobile = ({ activeTab, toggleTab }) => {
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

export async function getServerSideProps (ctx) {
    const { slug } = ctx.query;
    try {
        const additionalHeaders = { Cookie: ctx.req.headers['cookie'] };
        const announceRaw = await AnnounceService.getAnnounceBySlugSSR(slug, additionalHeaders);
        return { props: { announceRaw } };
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
}

export default AnnounceEdit;
