import React, { memo, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '@material-ui/core/Button';
import FilterListIcon from '@material-ui/icons/FilterList';
import useTranslation from 'next-translate/useTranslation';
import announcesFiltersMapper from '../../libs/announcesFiltersMapper';
import resolveObjectKey from '../../libs/resolveObjectKey';
import useIsMounted from '../../hooks/useIsMounted';
import RadioGroupInput from '../Form/Inputs/RadioGroupInput';
import getFiltersVehicleComponent from './Vehicles';
import VehicleTypeFilterSelector from './VehicleTypeFilterSelector';
import Header from '../Header';

const Filters = memo(({ defaultFilters, updateFilters: fireFilters }) => {
    const isMounted = useIsMounted();
    const formRef = useRef(null);
    const [filters, setFilters] = useState(defaultFilters);
    const DynamicFiltersComponent = getFiltersVehicleComponent(filters.vehicleType);
    const { t } = useTranslation();

    const formConfig = {
        mode: 'onChange',
        validateCriteriaMode: 'all',
        defaultValues: defaultFilters,
    };

    const { watch, control, errors, handleSubmit } = useForm(formConfig);

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
        setFilters(data);
    };

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

    console.log('render filters');

    return (
        <form className="filters_form" ref={formRef} onSubmit={handleSubmit(onSubmit)}>
            <ControlButtons/>
            <Header as="h3" text={t('vehicles:filter-by')}/>
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
                        label: t('vehicles:save'),
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

            <Button
                className="my-1"
                variant="contained"
                onClick={(e) => {
                    e.preventDefault();
                    window.location.reload();
                }}>
                {t('vehicles:reset-filters')}
            </Button>
        </div>
    );
};

Filters.defaultProps = {
    defaultFilters: {
        vehicleType: 'car',
        adType: 'sale',
    },
};

export default Filters;
