import React, { useContext, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { inflate } from 'flattenjs';
import { useForm } from 'react-hook-form';
import { Col, Container, Nav, NavItem, Row, TabContent, TabPane } from 'reactstrap';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useTranslation from 'next-translate/useTranslation';
import { themeColors } from '../../../theme/palette';
import resolveObjectKey from '../../../libs/resolveObjectKey';
import AnnounceService from '../../../services/AnnounceService';
import { SelectOptionsUtils } from '../../../libs/formFieldsUtils';
import { ModalDialogContext } from '../../../context/ModalDialogContext';
import { useAuth } from '../../../context/AuthProvider';
import AnnounceClass from '../../../models/announce.model';
import FieldWrapper from '../../../components/Form/FieldWrapper';
import TextInput from '../../../components/Form/Inputs/TextInput';
import NumberInput from '../../../components/Form/Inputs/NumberInput';
import SelectInput from '../../../components/Form/Inputs/SelectInput';
import TagsControlled from '../../../components/Tags/TagsControlled';
import TextareaInput from '../../../components/Form/Inputs/TextareaInput';
import AnnounceImagesAutoUpload from '../../../components/Uploads/AnnounceImagesAutoUpload';
import DamageSelectorControlledCar from '../../../components/Damages/DamageSelectorControlledCar';
import GalleryViewer from '../../../components/Gallery/GalleryViewer';
import GalleryImgsLazy from '../../../components/Gallery/GalleryImgsLazy';
import NumberInputMUI from '../../../components/Form/Inputs/NumberInputMUI';
import CheckboxGroup from '../../../components/Form/Inputs/CheckboxGroup';
import CheckboxMUI from '../../../components/Form/Inputs/CheckboxMUI';
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
} from '../../../components/Products/car/form.data';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import CTALink from '../../../components/CTALink';
import ValidationErrors from '../../../components/Form/Validations/ValidationErrors';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles(() => ({

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

const AnnounceEdit = ({ announceRaw, isAdmin, isSelf, err }) => {
    const refImg = useRef();
    const formRef = useRef();
    const theme = useTheme();
    const { isAuthReady } = useAuth();
    const { dispatchModal, dispatchModalError } = useContext(ModalDialogContext);
    const [stateReady, setStateReady] = useState(false);
    const [activeTab, setActiveTab] = useState(0);
    const { t } = useTranslation();
    const [announce] = useState(new AnnounceClass(announceRaw));
    const { control, register, errors, handleSubmit } = useForm({
        mode: 'onChange',
        validateCriteriaMode: 'all',
        defaultValues: announceRaw,
    });

    const isDesktop = useMediaQuery(theme.breakpoints.up('md'), {
        defaultMatches: true,
    });

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

    const handleRemove = () => {
        AnnounceService.removeAnnounce(announce.getSlug)
            .then(() => {
                dispatchModal({ msg: 'Announce successfully removed' });
            }).catch(err => {
                dispatchModalError({ err });
            },
        );
    };

    const triggerSubmit = () => {
        formRef.current.dispatchEvent(new Event('submit'));
        window.scrollTo(0, 0);
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
            .then(() => {
                dispatchModal({
                    msg: 'Ad successfully updated', persist : true
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
    if (announceRaw === undefined || err) return <Error message={err.message} statusCode={err.statusCode}/>;

    return (
        <>
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
                            activeTab,
                            toggleTab,
                            triggerSubmit,
                            slug: announce.getSlug,
                        }}/>
                    </Col>
                )}

                <Col sm="12" md="9" lg="9">

                    {isAdmin && (
                        <Alert severity="info" className="mb-2">
                            Connected as Admin
                        </Alert>
                    )}

                    <Typography component="h2" variant="h2" className="text-center" gutterBottom>
                        {t('vehicles:edit-announce')}
                    </Typography>

                    <form className="p-3 mx-auto" ref={formRef} onSubmit={handleSubmit(onSubmit)}>
                        {errors && <ValidationErrors errors={errors}/>}

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
                                        {t('vehicles:equipments-selection')}
                                    </Typography>
                                    <CheckboxGroup
                                        name="equipments"
                                        options={CheckboxOptionsEquipments}
                                        defaultOptions={['ABS', 'ESP']}
                                        control={control}
                                        errors={errors}
                                    />
                                </div>
                            </TabPane>

                            <TabPane tabId={2}>
                                <Typography component="h3" variant="h3" className="text-center" gutterBottom>
                                    {t('vehicles:damages-potential-selection')}
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
                                            <GalleryViewer
                                                images={announce.getImages}
                                                ref={refImg}
                                            />
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
                                    handleRemove,
                                }} />
                            </TabPane>
                        </TabContent>
                    </form>
                </Col>
            </Row>

            {!isDesktop && (
                <Buttons
                    triggerSubmit={triggerSubmit}
                    announcePageLink={`/announces/${announce.getSlug}`}
                />
            )}
        </>
    );
};

const VehicleInfosPartialForm = ({ control, errors }) => {
    const { t } = useTranslation();
    return (
        <div className="form-fields">
            <Typography component="h3" variant="h3" className="text-center" gutterBottom>
                {t('vehicles:manufacturer-data')}
            </Typography>

            <Row>
                <Col sm={12} md={6} lg={3}>
                    <FieldWrapper label={t('vehicles:make')}>
                        <TextInput
                            name={'manufacturer.make.label'}
                            control={control}
                            disabled
                        />
                    </FieldWrapper>
                </Col>

                <Col sm={12} md={6} lg={3}>
                    <FieldWrapper label={t('vehicles:model')}>
                        <TextInput
                            name={'manufacturer.model.label'}
                            control={control}
                            disabled
                        />
                    </FieldWrapper>
                </Col>

                <Col sm={12} md={6} lg={3}>
                    <FieldWrapper label={t('vehicles:generation')}>
                        <TextInput
                            name={'manufacturer.generation.label'}
                            control={control}
                            disabled
                        />
                    </FieldWrapper>
                </Col>

                <Col sm={12} md={6} lg={3}>
                    <FieldWrapper label={t('vehicles:year')}>
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
                    <FieldWrapper label={t('vehicles:cylinder')}>
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
                    <FieldWrapper label={t('vehicles:gas')}>
                        <SelectInput name="vehicleEngine.gas"
                                     options={RadioChoicesGas}
                                     control={control}
                                     errors={errors}
                        />
                    </FieldWrapper>
                </Col>
                <Col>
                    <FieldWrapper label={t('vehicles:gear-box')}>
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

            <Typography component="h3" variant="h3" className="text-center" gutterBottom>
                Utilisation
            </Typography>
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
                    <FieldWrapper label={t('vehicles:vehicle-function')}>
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
                    <FieldWrapper label={t('vehicles:mileage')}>
                        <NumberInput name="mileage"
                                     placeholder="20000 km"
                                     control={control}
                                     errors={errors}

                        />
                    </FieldWrapper>
                </Col>
                <Col>
                    <FieldWrapper label={t('vehicles:vehicle-state')}>
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
                    <FieldWrapper label={t('vehicles:owners-quantity')}>
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

            <Typography component="h3" variant="h3" className="text-center" gutterBottom>
                {t('vehicles:consumption')}
            </Typography>
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
                    <FieldWrapper label={t('vehicles:class-emission')}>
                        <SelectInput
                            name="emission"
                            options={RadioChoicesEmission}
                            control={control}
                            errors={errors}
                        />
                    </FieldWrapper>
                </Col>
            </Row>

            <Typography component="h3" variant="h3" className="text-center" gutterBottom>
                {t('vehicles:additional-data')}
            </Typography>
            <Row>
                <Col>
                    <FieldWrapper label={t('vehicles:doors-quantity')}>
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
                    <FieldWrapper label={t('vehicles:seats-quantity')}>
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
                    <FieldWrapper label={t('vehicles:paint')}>
                        <SelectInput
                            name="paint"
                            options={RadioChoicesPaints}
                            control={control}
                            errors={errors}
                        />
                    </FieldWrapper>
                </Col>
                <Col>
                    <FieldWrapper label={t('vehicles:materials')}>
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
                    <FieldWrapper label={t('vehicles:internal-color')}>
                        <SelectInput
                            name="externalColor"
                            options={RadioChoicesExternalColor}
                            control={control}
                            errors={errors}
                        />
                    </FieldWrapper>
                </Col>
                <Col>
                    <FieldWrapper label={t('vehicles:external-color')}>
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

const PublicationInfosPartialForm = ({ register, control, errors, handleRemove }) => {
    const classes = useStyles();
    const { t } = useTranslation();
    const [openDialogRemove, setOpenDialogRemove] = React.useState(false);

    const handleOpenDialogRemove = () => {
        setOpenDialogRemove(true);
    };

    const handleCloseDialogRemove = () => {
        setOpenDialogRemove(false);
    };

    return (
        <div className="form-fields">
            <Typography component="h3" variant="h3" className="text-center" gutterBottom>
                Données de publication
            </Typography>

            <FieldWrapper label="Titre de l'annonce">
                <TextInput
                    name="title"
                    control={control}
                    rules={{
                        required: t('vehicles:field-is-required'),
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
                            maxItems: (v) => v.length > 5 ? 'max 5' : null,
                        },
                    }}
                    errors={errors}
                />
            </FieldWrapper>

            <Typography component="h3" variant="h3" className="text-center" gutterBottom>
                {t('vehicles:announce-management')}
            </Typography>

            <CheckboxMUI
                name="status"
                value="active"
                label={t('vehicles:archive-announce')}
                color="secondary"
                control={control}
                errors={errors}
            />

            <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                startIcon={<DeleteIcon/>}
                onClick={handleOpenDialogRemove}>
                {t('vehicles:remove-announce')}
            </Button>

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
        </div>
    );
};

const Buttons = ({ triggerSubmit, announcePageLink }) => {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <div className="d-flex flex-column mx-auto my-3" style={{ maxWidth : '300px'}}>
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
                {t('vehicles:save-announce')}
            </Button>

            <CTALink title={t('vehicles:see-announce')} href={announcePageLink}/>
        </div>
    );
};

const NavDesktop = ({ activeTab, toggleTab, triggerSubmit, slug }) => {
    const classes = useStyles();
    const { t } = useTranslation();
    const tabs = [
        {
            title: t('vehicles:vehicle-informations'),
        },
        {
            title: t('vehicles:equipments'),
        },
        {
            title: t('vehicles:vehicle-state'),
        },
        {
            title: t('vehicles:pictures'),
        },
        {
            title: t('vehicles:publication'),
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
                announcePageLink={`/announces/${slug}`}
                triggerSubmit={triggerSubmit}
            />
        </div>
    );
};

const NavMobile = ({ activeTab, toggleTab }) => {
    const { t } = useTranslation();
    const classes = useStyles();
    const tabs = [
        {
            title: t('vehicles:vehicle-informations'),
        },
        {
            title: t('vehicles:equipments'),
        },
        {
            title: t('vehicles:vehicle-state'),
        },
        {
            title: t('vehicles:pictures'),
        },
        {
            title: t('vehicles:publication'),
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

export async function getServerSideProps (ctx) {
    const { slug } = ctx.query;
    try {
        const additionalHeaders = { Cookie: ctx.req.headers['cookie'] };
        const { announce, isAdmin, isSelf } = await AnnounceService.getAnnounceBySlugSSR(slug, additionalHeaders);
        return {
            props: {
                announceRaw: announce,
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

export default AnnounceEdit;
