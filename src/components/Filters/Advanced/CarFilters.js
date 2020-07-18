import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import useTranslation from 'next-translate/useTranslation';
import {  SelectInput, SliderInput } from '../../Form/Inputs';
import SelectCountryFlags from '../../Form/Inputs/SelectCountryFlags';
import SearchLocationInput from '../../Form/Inputs/SearchLocationInput'
import useAddress from '../../../hooks/useAddress';
import {
    CheckboxOptionsEquipments,
    RadioChoicesEmission,
    RadioChoicesEngine,
    RadioChoicesExternalColor,
    RadioChoicesGas,
    RadioChoicesPaints,
    RadioTypeFunction,
    RadioVehicleGeneralState
} from '../../Products/car/form.data';

const CarFilters = ({ control, watch, errors }) => {
    const [, , coordinates] = useAddress();
    const { t } = useTranslation();
    const popularMakesOptions = [
        {
            label: 'AlphaRomeo',
            value: 3
        },
        {
            label: 'Audi',
            value: 9
        },
        {
            label: 'BMW',
            value: 16
        },
        {
            label: 'Peugeot',
            value: 107
        },
        {
            label: 'Renault',
            value: 117
        },
        {
            label: 'Citroen',
            value: 28
        },
        {
            label: 'Volkswagen',
            value: 147
        },
        {
            label: 'Ford',
            value: 48
        },
        {
            label: 'Mercedes-Benz',
            value: 88
        },
        {
            label: 'Opel',
            value: 182
        },
        {
            label: 'Fiat',
            value: 47
        },
        {
            label: 'Toyota',
            value: 140
        },
        {
            label: 'Susuki',
            value: 133
        }
    ];

    useEffect(() => {
        control.register({ name: 'coordinates' });
        control.setValue('coordinates', coordinates);
    }, [coordinates]);

    const countrySelect = watch('countrySelect');

    return (
        <>
            <Typography component="span">{t('vehicles:make')}</Typography>
            <SelectInput
                name="manufacturer.make"
                control={control}
                errors={errors}
                options={popularMakesOptions}
            />

            <Typography component="span" gutterBottom>{t('vehicles:price')}</Typography>
            <SliderInput
                classNames="my-4 mt-2"
                name="price"
                defaultValue={[1000, 50000]}
                min={0}
                max={200000}
                step={1000}
                errors={errors}
                control={control}
                suffix="€"
            />

            <Typography component="span" gutterBottom>{t('vehicles:vehicle-type')}</Typography>
            <SelectInput
                name="vehicleFunctionUse"
                options={RadioTypeFunction}
                control={control}
                errors={errors}
            />

            <Typography component="span" gutterBottom>{t('vehicles:vehicle-state')}</Typography>
            <SelectInput
                name="vehicleGeneralState"
                options={RadioVehicleGeneralState}
                control={control}
                errors={errors}
            />

            <Typography component="span" gutterBottom>{t('vehicles:gear-box')}</Typography>
            <SelectInput
                name="vehicleEngine.type"
                options={RadioChoicesEngine}
                control={control}
                errors={errors}
            />

            <Typography component="span" gutterBottom>{t('vehicles:gas')}</Typography>
            <SelectInput
                name="vehicleEngine.gas"
                className="mb-2"
                options={RadioChoicesGas}
                control={control}
                errors={errors}
            />

            <Typography component="span" gutterBottom>{t('vehicles:cylinder')} (cm3)</Typography>
            <div className="d-flex my-2">
                <SliderInput
                    classNames="my-2"
                    name="vehicleEngine.cylinder"
                    min={1}
                    max={20}
                    step={1}
                    marks={true}
                    errors={errors}
                    control={control}
                />
            </div>

            <Typography component="span" gutterBottom>{t('vehicles:mileage')} (km)</Typography>
            <SliderInput
                classNames="my-2"
                name="mileage"
                min={0}
                max={200000}
                step={1000}
                errors={errors}
                control={control}
                suffix="km"
            />

            <Typography component="span" gutterBottom>{t('vehicles:power')}</Typography>
            <SliderInput
                classNames="my-2"
                name="power.kw"
                min={0}
                max={200}
                step={1}
                errors={errors}
                control={control}
                suffix="kw"
            />

            <Typography component="span" gutterBottom>{t('vehicles:country')}</Typography>
            <SelectCountryFlags
                name="countrySelect"
                errors={errors}
                control={control}
            />

            <Typography component="span" gutterBottom>{t('vehicles:address')}</Typography>
            <SearchLocationInput
                name="address"
                country={countrySelect?.value}
                control={control}
                errors={errors}>
            </SearchLocationInput>

            <Typography component="span" gutterBottom>{t('vehicles:radius')} (0 = off)</Typography>
            <SliderInput
                classNames="my-2"
                name="radius"
                min={0}
                max={500}
                step={5}
                control={control}
                errors={errors}
                suffix="km"
            />

            <Typography component="span" gutterBottom>{t('vehicles:equipments')}</Typography>
            <SelectInput
                name="equipments"
                options={CheckboxOptionsEquipments}
                isMulti
                defaultChecked={['ABS', 'ESP']}
                control={control}
                errors={errors}
            />

            <Typography component="span" gutterBottom>{t('vehicles:class-emission')}</Typography>
            <SelectInput
                name="emission"
                options={RadioChoicesEmission}
                control={control}
                errors={errors}
            />

            <Typography component="span" gutterBottom>{t('vehicles:co2-consumption')}</Typography>
            <SliderInput
                classNames="my-2"
                name="consumption.gkm"
                min={0}
                max={200}
                step={1}
                errors={errors}
                control={control}
                suffix="kw"
            />

            <Typography component="span" gutterBottom>{t('vehicles:doors-quantity')}</Typography>
            <SliderInput
                classNames="my-2"
                name="doors"
                min={1}
                max={10}
                step={1}
                errors={errors}
                control={control}
            />

            <Typography component="span">{t('vehicles:seats-quantity')}</Typography>
            <SliderInput
                classNames="my-2"
                name="seats"
                min={1}
                max={10}
                step={1}
                errors={errors}
                control={control}
            />

            <Typography component="span">{t('vehicles:paint')}</Typography>
            <SelectInput
                name="paint"
                control={control}
                options={RadioChoicesPaints}
                citycontrol={control}
                errors={errors}
            />

            <Typography component="span">{t('vehicles:external-color')}</Typography>
            <SelectInput
                name="externalColor"
                options={RadioChoicesExternalColor}
                control={control}
                errors={errors}
            />

            <Typography component="span">{t('vehicles:internal-color')}</Typography>
            <SelectInput
                name="internalColor"
                options={RadioChoicesExternalColor}
                control={control}
                errors={errors}
            />
        </>
    );
};

CarFilters.propTypes = {
    control: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    watch: PropTypes.func
};

export default CarFilters;
