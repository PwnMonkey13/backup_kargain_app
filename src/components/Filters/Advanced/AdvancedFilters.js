import React, { memo, useEffect,  useState } from 'react'
import { useForm } from 'react-hook-form';
import { flatten } from 'flattenjs';
import clsx from 'clsx';
import useDimensions from 'react-use-dimensions';
import Button from '@material-ui/core/Button';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import FilterListIcon from '@material-ui/icons/FilterList';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useTranslation from 'next-translate/useTranslation';
import announcesFiltersMapper from '../../../libs/announcesFiltersMapper';
import resolveObjectKey from '../../../libs/resolveObjectKey';
import getFiltersVehicleComponent from './index';
import { Col, Row } from 'reactstrap'

const useStyles = makeStyles(() => ({
    filtersContainer: {
        padding: '.5rem'
    },

    filtersTop: {
        display: 'flex',
        alignItems: 'center',
        borderBottom: '1px solid gainsboro'
    },

    filtersHidden: {
        display: 'none'
    }
}));

const AnnounceTypes = [
    {
        value: 'sale',
        label: 'Vente'
    },
    {
        value: 'sale-pro',
        label: 'Vente pro'
    },
    {
        value: 'rent',
        label: 'Location'
    }
]

const AdvancedFilters = ({ vehicleType, defaultFilters, updateFilters }) => {
    const classes = useStyles();
    const { t } = useTranslation();
    const isMobile = useMediaQuery('(max-width:768px)');
    const [hiddenForm, hideForm] = useState(isMobile);
    const [changes, setChanges] = useState({});
    const [ref, { width }] = useDimensions();
    const DynamicFiltersComponent = getFiltersVehicleComponent(vehicleType);
    const { watch, register, control, setValue, formState, errors, handleSubmit } = useForm({
        mode: 'onChange',
        validateCriteriaMode: 'all',
        defaultValues: defaultFilters
    });

    const filterProps = formData => {
        return Object.keys(announcesFiltersMapper).reduce((carry, key) => {
            const property = announcesFiltersMapper[key];
            const field = resolveObjectKey(formData, key);
            if (field && property) {
                if (typeof property === 'object') {
                    if (Array.isArray(field) && property.type === 'array') {
                        const values = field.map(item => item[property.selector]);
                        return {
                            ...carry,
                            [property.name]: values
                        };
                    }
                }

                return {
                    ...carry,
                    [property]: !isNaN(Number(field)) ? Number(field) : field
                };
            }
            return carry;
        }, {});
    };

    const onSubmit = (form, e) => {
        const { coordinates, radius } = form;
        const filtersFlat = filterProps(form);
        const data = { ...filtersFlat };

        if (coordinates && radius) {
            data.radius = radius;
            data.coordinates = coordinates;
            data.enableGeocoding = true;
        }

        e.preventDefault();
        setChanges(flatten(formState.touched));
        updateFilters(data);
    };

    const resetValue = (field) => {
        setValue(field, defaultFilters[field]);
        setChanges(changes => {
            const { [field]: rm, ...rest } = changes;
            return rest;
        });
    };

    const toggleFilters = () => {
        hideForm(hiddenForm => !hiddenForm);
    };

    useEffect(()=>{
        register("vehicleType")
    },[])

    useEffect(()=>{
        setValue("vehicleType", vehicleType)
    },[vehicleType])

    return (
        <div className={classes.filtersContainer} ref={ref}>
            <div className={classes.filtersTop} onClick={() => toggleFilters()}>
                <Typography variant="h4">
                    {t('filters:select-filters')}
                    <i className={clsx('ml-2', 'arrow_nav', hiddenForm ? 'is-top' : 'is-bottom')}/>
                </Typography>
            </div>

            {Object.keys(changes).length !== 0 && (
                <>
                    <Typography variant="h4">{t('vehicles:filtered-by')} : </Typography>
                    <ul className="list-style-none">
                        {changes && Object.keys(changes).map((field, index) => {
                            return (
                                <li key={index} className="my-1">
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        endIcon={<HighlightOffIcon/>}
                                        onClick={() => resetValue(field)}
                                    >
                                        {t(`filters:${field}`)}
                                    </Button>
                                </li>
                            );
                        })}
                    </ul>
                </>
            )}

            <form className="filters_form" onSubmit={handleSubmit(onSubmit)}>
                <div className={clsx(hiddenForm && classes.filtersHidden)}>
                    <Typography component="h4" variant="h4" gutterBottom className="text-center">{t('vehicles:announce-type')}</Typography>
                    <Row className="justify-content-center">
                        {AnnounceTypes && AnnounceTypes.map((tab, index) => {
                            return (
                                <Col key={index} xs={4} sm={4} md={width < 500 ? 12 : 4} lg={4}>
                                    <div className="form-check-transparent">
                                        <input id={`ad_type${index}`}
                                            type="radio"
                                            name="adType"
                                            value={tab.value}
                                            ref={register}
                                        />
                                        <label htmlFor={`ad_type${index}`}>
                                            {tab.label}
                                        </label>
                                    </div>
                                </Col>
                            )
                        })}
                    </Row>

                    {DynamicFiltersComponent && (
                        <DynamicFiltersComponent
                            control={control}
                            errors={errors}
                            watch={watch}
                        />
                    )}
                </div>
                <ControlButtons/>
            </form>
        </div>
    );
};

const ControlButtons = () => {
    const { t } = useTranslation();

    return (
        <div className="d-flex flex-column my-3">
            <Button
                className="my-1"
                variant="contained"
                color="primary"
                startIcon={<FilterListIcon/>}
                type="submit"
            >
                {t('vehicles:apply-filters')}
            </Button>
        </div>
    );
};

AdvancedFilters.defaultProps = {
    vehicleType : 'car',
    defaultFilters: {
        vehicleType: 'car',
        adType: 'sale',
        price: [0, 200000],
        'vehicleEngine.cylinder': [1, 20],
        mileage: [0, 200000],
        'power.kw': [0, 200],
        radius: 0,
        'consumption.gkm': [0, 200],
        doors: [1, 10],
        seats: [1, 10]
    }
};

export default memo(AdvancedFilters);
