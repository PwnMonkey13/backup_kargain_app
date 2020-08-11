import React, { memo, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import FilterListIcon from '@material-ui/icons/FilterList';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useTranslation from 'next-translate/useTranslation';
import { cleanObj } from '../../../libs/utils'
import filterProps from '../../../libs/filterProps'
import FiltersChanges from '../FiltersChanges'
import { SelectInput } from '../../Form/Inputs'
import FieldWrapper from '../../Form/FieldWrapper'
import { useAuth } from '../../../context/AuthProvider'
import getFiltersVehicleComponent from './index';

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

const   vehicleTypes = [
    {
        value: 'car',
        label: 'Voiture'
    },
    {
        value: 'moto',
        label: 'Moto'
    },
    {
        value: 'utility',
        label: 'Utilitaire'

    },
    {
        value: 'camper',
        label: 'Camping car'
    }
];

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

const AdvancedFilters = ({ defaultFilters, updateFilters, ...props }) => {
    const classes = useStyles();
    const { t } = useTranslation();
    const { isAuthReady, authenticatedUser } = useAuth();
    const isMobile = useMediaQuery('(max-width:768px)');
    const [hiddenForm, hideForm] = useState(isMobile);
    const [changes, setChanges] = useState({});
    const [vehicleType, setVehicleType] = useState(props.vehicleType)
    const DynamicFiltersComponent = getFiltersVehicleComponent(vehicleType);
    const [announceTypesFiltered, setAnnouncesTypesFiltered] = useState(AnnounceTypes);
    const {watch, control, setValue, errors, handleSubmit } = useForm({
        mode: 'onChange',
        validateCriteriaMode: 'all',
        defaultValues: {
            ...defaultFilters,
            vehicleType : vehicleTypes[0],
            adType : AnnounceTypes[0]
        }
    });

    const onSubmit = (form, e) => {
        const { coordinates, radius } = form;
        const changes = cleanObj(form)
        const filtersFlat = filterProps(form);
        const data = { ...filtersFlat };

        if (coordinates && radius) {
            data.radius = radius;
            data.coordinates = coordinates;
            data.enableGeocoding = true;
        }

        e.preventDefault();
        setChanges(changes);
        updateFilters(data);
    };

    const resetValue = (field) => {
        const defaultValue = defaultFilters[field]
        setValue(field, defaultValue);
        setChanges(changes => {
            const { [field]: rm, ...rest } = changes;
            return rest;
        });
    };

    const toggleFilters = () => {
        hideForm(hiddenForm => !hiddenForm);
    };

    useEffect(()=>{
        const isPro = authenticatedUser.getIsPro
        if(!isPro) setAnnouncesTypesFiltered(types => types.filter(type => type.value !== 'sale-pro'))
    },[authenticatedUser, isAuthReady])

    return (
        <div className={classes.filtersContainer}>
            <div className={classes.filtersTop} onClick={() => toggleFilters()}>
                <Typography variant="h4">
                    {t('filters:select-filters')}
                    <i className={clsx('ml-2', 'arrow_nav', hiddenForm ? 'is-top' : 'is-bottom')}/>
                </Typography>
            </div>

            <FiltersChanges {...{changes, resetValue}} />

            <form className="filters_form" onSubmit={handleSubmit(onSubmit)}>
                <ControlButtons/>
                <div className={clsx(hiddenForm && classes.filtersHidden)}>

                    <FieldWrapper label={t('vehicles:vehicle-type')}>
                        <SelectInput
                            name="vehicleType"
                            control={control}
                            errors={errors}
                            options={vehicleTypes}
                            onChange={selected =>{
                                setVehicleType(selected.value)
                                return selected
                            }}
                        />
                    </FieldWrapper>

                    <FieldWrapper label={t('vehicles:announce-type')}>
                        <SelectInput
                            name="adType"
                            control={control}
                            errors={errors}
                            options={announceTypesFiltered}
                        />
                    </FieldWrapper>

                    {DynamicFiltersComponent && (
                        <DynamicFiltersComponent
                            control={control}
                            errors={errors}
                            watch={watch}
                        />
                    )}
                </div>
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
    vehicleType : vehicleTypes[0].value
};

export default memo(AdvancedFilters);
