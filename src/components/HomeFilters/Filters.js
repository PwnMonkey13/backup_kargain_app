import React, { memo, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { flatten } from 'flattenjs';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import FilterListIcon from '@material-ui/icons/FilterList';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useTranslation from 'next-translate/useTranslation';
import announcesFiltersMapper from '../../libs/announcesFiltersMapper';
import resolveObjectKey from '../../libs/resolveObjectKey';
import useIsMounted from '../../hooks/useIsMounted';
import RadioGroupInput from '../Form/Inputs/RadioGroupInput';
import getFiltersVehicleComponent from './Vehicles';
import VehicleTypeFilterSelector from './VehicleTypeFilterSelector';
import Header from '../Header';

const useStyles = makeStyles((theme) => ({
    filtersContainer: {
        padding: '.5rem',
    },

    filtersTop: {
        display: 'flex',
        alignItems: 'center',
        borderBottom: '1px solid gainsboro',
    },

    filtersHidden: {
        display: 'none',
    },
}));

const Filters = memo(({ defaultFilters, updateFilters: fireFilters }) => {
    const isMounted = useIsMounted();
    const formRef = useRef(null);
    const classes = useStyles();
    const { t } = useTranslation();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'), {
        defaultMatches: true,
    });

    const { watch, control, setValue, formState, errors, handleSubmit } = useForm({
        mode: 'onChange',
        validateCriteriaMode: 'all',
        defaultValues: defaultFilters,
    });

    const { touched } = formState;
    const [filters, setFilters] = useState(defaultFilters);
    const [hiddenForm, hideForm] = useState(false);
    const [changes, setChanges] = useState({});

    const DynamicFiltersComponent = getFiltersVehicleComponent(filters.vehicleType);

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
                            [property.name]: values,
                        };
                    }
                }

                return {
                    ...carry,
                    [property]: !isNaN(Number(field)) ? Number(field) : field,
                };
            }
            return carry;
        }, {});
    };

    const onSubmit = (data, e) => {
        e.preventDefault();
        setChanges(flatten(touched));
        setFilters(data);
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

    useEffect(() => {
        hideForm(isMobile);
    }, [isMobile]);

    useEffect(() => {
        if (isMounted) {
            const { coordinates, radius } = filters;
            const filtersFlat = filterProps(filters);
            const data = { ...filtersFlat };

            if (coordinates && radius) {
                data.radius = radius;
                data.coordinates = coordinates;
                data.enableGeocoding = true;
            }
            fireFilters(data);
        }
    }, [filters]);

    return (
        <div className={classes.filtersContainer}>
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

            <div className={clsx(hiddenForm && classes.filtersHidden)}>
                <form className="filters_form" ref={formRef} onSubmit={handleSubmit(onSubmit)}>
                    <ControlButtons/>
                    <Header p strong className="m-0" text={t('vehicles:vehicle-type')}/>
                    <RadioGroupInput
                        name="adType"
                        noInputClass
                        control={control}
                        errors={errors}
                        options={[
                            {
                                label: t('vehicles:rent'),
                                value: 'rent',
                            },
                            {
                                label: t('vehicles:sale'),
                                value: 'sale',
                            }]
                        }
                    />

                    <Header p strong className="my-2" text={t('vehicles:vehicle-type')}/>
                    <VehicleTypeFilterSelector
                        name="vehicleType"
                        control={control}
                    />

                    {DynamicFiltersComponent && (
                        <DynamicFiltersComponent
                            control={control}
                            errors={errors}
                            watch={watch}
                        />
                    )}

                    <ControlButtons/>
                </form>
            </div>
        </div>

    );
});

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

Filters.defaultProps = {
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
        seats: [1, 10],

    },
};

export default Filters;
