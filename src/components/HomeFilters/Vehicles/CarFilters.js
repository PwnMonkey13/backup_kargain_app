import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RoomIcon from '@material-ui/icons/Room';
import Typography from '@material-ui/core/Typography';
import useTranslation from 'next-translate/useTranslation';
import { GeoCitiesInput, SelectInput, SliderInput, TextInput } from '../../Form/Inputs';
import { ModalDialogContext } from '../../../context/ModalDialogContext';
import SelectCountryFlags from '../../Form/Inputs/SelectCountryFlags';
import FieldWrapper from '../../Form/FieldWrapper';
import useAddress from '../../../hooks/useAddress';
import Header from '../../Header';

import {
    CheckboxOptionsEquipments,
    RadioChoicesEmission,
    RadioChoicesEngine,
    RadioChoicesExternalColor,
    RadioChoicesGas,
    RadioChoicesPaints,
    RadioTypeFunction,
    RadioVehicleGeneralState,
} from '../../Vehicles/car/form.data';

const CarFilters = ({ control, watch, errors }) => {
    const [, address, coordinates] = useAddress();
    const { t } = useTranslation();
    const popularMakesOptions = [
        {
            label: 'AlphaRomeo',
            value: 3,
        },
        {
            label: 'Audi',
            value: 9,
        },
        {
            label: 'BMW',
            value: 16,
        },
        {
            label: 'Peugeot',
            value: 107,
        },
        {
            label: 'Renault',
            value: 117,
        },
        {
            label: 'Citroen',
            value: 28,
        },
        {
            label: 'Volkswagen',
            value: 147,
        },
        {
            label: 'Ford',
            value: 48,
        },
        {
            label: 'Mercedes-Benz',
            value: 88,
        },
        {
            label: 'Opel',
            value: 182,
        },
        {
            label: 'Fiat',
            value: 47,
        },
        {
            label: 'Toyota',
            value: 140,
        },
        {
            label: 'Susuki',
            value: 133,
        },
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
                defaultValue={[0, 200000]}
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
                    classNames="my-4 mt-2"
                    name="vehicleEngine.cylinder"
                    defaultValue={[1, 20]}
                    min={1}
                    max={20}
                    step={1}
                    errors={errors}
                    control={control}
                />
            </div>

            <Typography component="span" gutterBottom>{t('vehicles:mileage')} (km)</Typography>
            <SliderInput
                classNames="my-4 mt-2"
                name="mileage"
                defaultValue={[0, 200000]}
                min={0}
                max={200000}
                step={1000}
                errors={errors}
                control={control}
                suffix="km"
            />

            <Typography component="span" gutterBottom>{t('vehicles:power')}</Typography>
            <SliderInput
                classNames="my-4 mt-2"
                name="power.kw"
                defaultValue={[0, 200]}
                min={0}
                max={200}
                step={1}
                errors={errors}
                control={control}
                suffix="kw"
            />

            <Typography component="span">{t('vehicles:country')}</Typography>
            <SelectCountryFlags
                name="countrySelect"
                errors={errors}
                control={control}
            />

            {address && (
                <>
                    <Typography component="span" gutterBottom>{t('vehicles:approximate-address')}</Typography>
                    <Header p strong className="my-2">
                        <RoomIcon/> : {address}
                    </Header>
                </>
            )}

            <Typography component="span" gutterBottom>{t('vehicles:city')}</Typography>
            {countrySelect && countrySelect.value === 'FR' ? (
                <GeoCitiesInput
                    name="address.city"
                    enableGeoloc
                    long={coordinates?.[0]}
                    lat={coordinates?.[1]}
                    typeAPI="geo" // vicopo
                    control={control}
                    errors={errors}
                />
            ) : (
                <>
                    <FieldWrapper label={t('vehicles:city')}>
                        <TextInput
                            name="address.city"
                            errors={errors}
                            control={control}
                            rules={{ required: 'Required' }}
                        />
                    </FieldWrapper>
                </>
            )}

            <Typography component="span" gutterBottom>{t('vehicles:radius')} (0 = off)</Typography>
            <SliderInput
                name="radius"
                classNames="mb-2 my-4"
                defaultValue={0}
                min={0}
                max={500}
                step={5}
                control={control}
                errors={errors}
                suffix="km"
            />

            <Typography component="span">{t('vehicles:equipments')}</Typography>
            <SelectInput
                name="equipments"
                options={CheckboxOptionsEquipments}
                isMulti
                defaultChecked={['ABS', 'ESP']}
                control={control}
                errors={errors}
            />

            <Typography component="span">{t('vehicles:class-emission')}</Typography>
            <SelectInput
                name="emission"
                options={RadioChoicesEmission}
                control={control}
                errors={errors}
            />

            <Typography component="span" gutterBottom>{t('vehicles:co2-consumption')}</Typography>
            <SliderInput
                classNames="my-4 mt-2"
                name="consumption.gkm"
                defaultValue={[0, 200]}
                min={0}
                max={200}
                step={1}
                errors={errors}
                control={control}
                suffix="kw"
            />

            <Typography component="span" gutterBottom>{t('vehicles:doors-quantity')}</Typography>
            <SliderInput
                classNames="my-4 mt-2"
                name="doors"
                defaultValue={[1, 10]}
                min={1}
                max={10}
                step={1}
                errors={errors}
                control={control}
            />

            <Typography component="span">{t('vehicles:doors-quantity')}</Typography>
            <SliderInput
                classNames="my-4 mt-2"
                name="seats"
                defaultValue={[1, 10]}
                min={1}
                max={10}
                step={1}
                errors={errors}
                control={control}
            />

            <Typography component="span">{t('vehicles:paint')}</Typography>
            <SelectInput
                name="paint"
                options={RadioChoicesPaints}
                control={control}
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
    watch: PropTypes.func,
};

export default CarFilters;
