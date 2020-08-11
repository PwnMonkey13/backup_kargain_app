import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import useTranslation from 'next-translate/useTranslation';
import {  SelectInput, SliderInput } from '../../../Form/Inputs';
import SearchLocationInput from '../../../Form/Inputs/SearchLocationInput';
import SelectCountryFlags from '../../../Form/Inputs/SelectCountryFlags';
import useAddress from '../../../../hooks/useAddress';
import {
    CheckboxOptionsEquipments,
    RadioChoicesEmission,
    RadioChoicesEngine,
    RadioChoicesExternalColor,
    RadioChoicesGas,
    RadioChoicesMaterials,
    RadioChoicesPaints,
    RadioTypeFunction,
    RadioVehicleGeneralState
} from '../../../Products/utility/form.data';
import FieldWrapper from '../../../Form/FieldWrapper'
import VehiclesService from '../../../../services/VehiclesService'
import { ModalDialogContext } from '../../../../context/ModalDialogContext'

const UtilityFilters = ({vehicleType, control, watch, errors }) => {
    const [, , coordinates] = useAddress();
    const { t } = useTranslation();
    const countrySelect = watch('country');
    const { dispatchModalError } = useContext(ModalDialogContext);
    const [manufacturersData, setManufacturersData] = useState({
        makes: []
    });
    useEffect(() => {
        control.register({ name: 'coordinates' });
        control.setValue('coordinates', coordinates);
    }, [coordinates]);

    useEffect(() => {
        console.log('fetch makes');
        VehiclesService.getMakes(vehicleType)
            .then(utilities => {
                const makesOptions = utilities.map(car => ({
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

            <Typography component="span" gutterBottom>{t('vehicles:gear-box')}</Typography>
            <SelectInput
                name="vehicleEngineType"
                options={RadioChoicesEngine}
                control={control}
                errors={errors}
            />

            <Typography component="span" gutterBottom>{t('vehicles:gas')}</Typography>
            <SelectInput
                name="vehicleEngineGas"
                className="mb-2"
                options={RadioChoicesGas}
                control={control}
                errors={errors}
            />

            <Typography component="span" gutterBottom>{t('vehicles:cylinder')} (cm3)</Typography>
            <div className="d-flex my-2">
                <SliderInput
                    classNames="my-4 mt-2"
                    name="vehicleEngineCylinder"
                    defaultValue={[1, 20]}
                    min={1}
                    max={20}
                    step={1}
                    errors={errors}
                    control={control}
                />
            </div>

            <Typography component="span" gutterBottom>{t('vehicles:power')}</Typography>
            <SliderInput
                classNames="my-4 mt-2"
                name="powerKw"
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

            <Typography component="span" gutterBottom>{t('vehicles:address')}</Typography>
            <SearchLocationInput
                name="address"
                country={countrySelect?.value}
                control={control}
                errors={errors}>
            </SearchLocationInput>

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
                name="consumptionGkm"
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

            <Typography component="span" gutterBottom>Nombre de cabines conducteur</Typography>
            <SliderInput
                classNames="my-4 mt-2"
                name="driverCabins"
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

            <Typography component="span">{t('vehicles:external-color')}</Typography>
            <SelectInput
                name="externalColor"
                options={RadioChoicesMaterials}
                control={control}
                errors={errors}
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

UtilityFilters.propTypes = {
    control: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    watch: PropTypes.func
};

export default UtilityFilters;
