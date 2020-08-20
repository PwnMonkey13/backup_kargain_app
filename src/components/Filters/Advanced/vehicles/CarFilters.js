import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import useTranslation from 'next-translate/useTranslation';
import { SearchLocationInput, SelectCountryFlags, SelectInput, SliderInput } from '../../../Form/Inputs';
import useAddress from '../../../../hooks/useAddress';
import {
    CheckboxOptionsEquipments,
    RadioChoicesEmission,
    RadioChoicesEngine,
    RadioChoicesExternalColor,
    RadioChoicesGas,
    RadioChoicesPaints,
    RadioVehicleGeneralState
} from '../../../Products/car/form.data';
import FieldWrapper from '../../../Form/FieldWrapper'
import VehiclesService from '../../../../services/VehiclesService'
import { ModalDialogContext } from '../../../../context/ModalDialogContext'

const CarFilters = ({ control, watch, errors }) => {
    const [, , coordinates] = useAddress();
    const { t } = useTranslation();
    const { dispatchModalError } = useContext(ModalDialogContext);
    const countrySelect = watch('countrySelect');
    const [manufacturersData, setManufacturersData] = useState({
        makes: []
    });

    useEffect(() => {
        control.register({ name: 'coordinates' });
        control.setValue('coordinates', coordinates);
    }, [coordinates]);

    useEffect(() => {
        console.log('fetch makes');
        VehiclesService.getMakes("cars")
            .then(cars => {
                const makesOptions = cars.map(car => ({
                    value: car.make_id,
                    label: car.make
                }));
                const defaultOption = {
                    value: 'other',
                    label: 'Je ne sais pas/Autre'
                };
                setManufacturersData(manufacturersData => (
                    {
                        ...manufacturersData,
                        makes: [...makesOptions, defaultOption]
                    })
                );
            })
            .catch(err => {
                dispatchModalError({ err });
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <FieldWrapper label={t('vehicles:make')}>
                <SelectInput
                    name="manufacturer.make"
                    isMulti
                    placeholder={t('vehicles:select-vehicle-make')}
                    options={manufacturersData.makes}
                    control={control}
                    errors={errors}
                />
            </FieldWrapper>

            <FieldWrapper label={t('vehicles:price')}>
                <SliderInput
                    name="price"
                    defaultValue={[1000, 50000]}
                    min={0}
                    max={200000}
                    step={1000}
                    errors={errors}
                    control={control}
                    suffix="€"
                />
            </FieldWrapper>

            <FieldWrapper label={t('vehicles:gear-box')}>
                <SelectInput
                    name="vehicleEngineType"
                    options={RadioChoicesEngine}
                    control={control}
                    errors={errors}
                />
            </FieldWrapper>

            <FieldWrapper label={t('vehicles:gas')}>
                <SelectInput
                    name="vehicleEngineGas"
                    className="mb-2"
                    options={RadioChoicesGas}
                    control={control}
                    errors={errors}
                />
            </FieldWrapper>

            <FieldWrapper label={t('vehicles:cylinder')}>
                <SliderInput
                    name="vehicleEngineCylinder"
                    min={1}
                    max={20}
                    step={1}
                    defaultValue={[1, 20]}
                    // marks={true}
                    errors={errors}
                    control={control}
                />
            </FieldWrapper>

            <FieldWrapper label={t('vehicles:mileage')}>
                <SliderInput
                    name="mileage"
                    min={0}
                    max={200000}
                    step={1000}
                    errors={errors}
                    control={control}
                    suffix="km"
                />
            </FieldWrapper>

            <FieldWrapper label={t('vehicles:power')}>
                <SliderInput
                    name="powerKw"
                    min={0}
                    max={200}
                    step={1}
                    errors={errors}
                    control={control}
                    suffix="kw"
                />
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
                    errors={errors}>
                </SearchLocationInput>
            </FieldWrapper>

            <FieldWrapper label={t('vehicles:radius')}>
                <SliderInput
                    name="radius"
                    min={0}
                    max={500}
                    step={5}
                    control={control}
                    errors={errors}
                    suffix="km"
                />
            </FieldWrapper>

            <FieldWrapper label={t('vehicles:equipments')}>
                <SelectInput
                    name="equipments"
                    options={CheckboxOptionsEquipments}
                    isMulti
                    defaultChecked={['ABS', 'ESP']}
                    control={control}
                    errors={errors}
                />
            </FieldWrapper>

            <FieldWrapper label={t('vehicles:class-emission')}>
                <SelectInput
                    name="emission"
                    options={RadioChoicesEmission}
                    control={control}
                    errors={errors}
                />
            </FieldWrapper>

            <FieldWrapper label={t('vehicles:co2-consumption')}>
                <SliderInput
                    name="consumptionGkm"
                    min={0}
                    max={200}
                    step={1}
                    errors={errors}
                    control={control}
                    suffix="kw"
                />
            </FieldWrapper>

            <FieldWrapper label={t('vehicles:doors-quantity')}>
                <SliderInput
                    name="doors"
                    min={1}
                    max={10}
                    step={1}
                    errors={errors}
                    control={control}
                />
            </FieldWrapper>

            <FieldWrapper label={t('vehicles:seats-quantity')}>
                <SliderInput
                    name="seats"
                    min={1}
                    max={10}
                    step={1}
                    errors={errors}
                    control={control}
                />
            </FieldWrapper>

            <FieldWrapper label={t('vehicles:paint')}>
                <SelectInput
                    name="paint"
                    control={control}
                    options={RadioChoicesPaints}
                    citycontrol={control}
                    errors={errors}
                />
            </FieldWrapper>

            <FieldWrapper label={t('vehicles:external-color')}>
                <SelectInput
                    name="externalColor"
                    options={RadioChoicesExternalColor}
                    control={control}
                    errors={errors}
                />
            </FieldWrapper>

            <FieldWrapper label={t('vehicles:internal-color')}>
                <SelectInput
                    name="internalColor"
                    options={RadioChoicesExternalColor}
                    control={control}
                    errors={errors}
                />
            </FieldWrapper>

            <FieldWrapper label={t('vehicles:vehicle-state')}>
                <SelectInput
                    name="vehicleGeneralState"
                    options={RadioVehicleGeneralState}
                    control={control}
                    errors={errors}
                />
            </FieldWrapper>
        </>
    );
};

CarFilters.propTypes = {
    control: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    watch: PropTypes.func
};

export default CarFilters;
