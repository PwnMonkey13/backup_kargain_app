import React, { memo, useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import useTranslation from 'next-translate/useTranslation';
import {  SelectInput, SliderInput } from '../../../Form/Inputs';
import SelectCountryFlags from '../../../Form/Inputs/SelectCountryFlags';
import useAddress from '../../../../hooks/useAddress';
import SearchLocationInput from '../../../Form/Inputs/SearchLocationInput';
import { RadioVehicleGeneralState } from '../../../Products/car/form.data';

import {
    CheckboxOptionsEquipments,
    RadioChoicesExternalColor,
    RadioChoicesPaints,
    RadioTypeFunction
} from '../../../Products/moto/form.data';
import CarFilters from './CarFilters'
import VehiclesService from '../../../../services/VehiclesService'
import { ModalDialogContext } from '../../../../context/ModalDialogContext'

const MotoFilters = ({vehicleType, control, watch, errors }) => {
    const [,, coordinates] = useAddress();
    const { t } = useTranslation();
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
            .then(motos => {
                const makesOptions = motos.map(car => ({
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

    const countrySelect = watch('country');

    return (
        <>
            <Typography component="span">{t('vehicles:make')}</Typography>
            <SelectInput
                name="manufacturer.make"
                control={control}
                errors={errors}
                options={manufacturersData.makes}
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

            <Typography component="span" gutterBottom>{t('vehicles:moto-type')}</Typography>
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
                defaultChecked={['Topcase', 'Kickstarter']}
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
        </>
    );
};

MotoFilters.propTypes = {
    control: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    watch: PropTypes.func
};

CarFilters.defaultProps = {
    vehicleType : "motorcycles"
}

export default memo(MotoFilters);
