import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import useTranslation from 'next-translate/useTranslation';
import { GeoCitiesInput, SelectInput, SliderInput, TextInput } from '../../Form/Inputs';
import SelectCountryFlags from '../../Form/Inputs/SelectCountryFlags';
import useAddress from '../../../hooks/useAddress';
import FieldWrapper from '../../Form/FieldWrapper';
import { RadioVehicleGeneralState } from '../../Vehicles/car/form.data';
import { SelectOptionsUtils } from '../../../libs/formFieldsUtils';
import {
    CheckboxOptionsEquipments,
    RadioChoicesExternalColor,
    RadioChoicesPaints,
    RadioTypeFunction,
} from '../../Vehicles/moto/form.data';

const MotoFilters = memo(({ control, watch, errors, ...props }) => {
    const [,, coordinates] = useAddress();
    const { t } = useTranslation();

    const popularMakes = [
        'Aprilia',
        'BMW',
        'Ducati',
        'Honda',
        'Harley-Davidson',
        'Husqvarna',
        'Kawasaki',
        'KTM',
        'Suzuki',
        'Triumph',
        'Yamaha',
        'Royal Enfield',
    ];

    useEffect(() => {
        control.register({ name: 'coordinates' });
        control.setValue('coordinates', coordinates);
    }, [coordinates]);

    const countrySelect = watch('country');

    console.log('render moto filters');

    return (
        <>
            <Typography component="span">{t('vehicles:make')}</Typography>
            <SelectInput
                name="manufacturer.make"
                control={control}
                errors={errors}
                options={SelectOptionsUtils(popularMakes)}
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
});

MotoFilters.propTypes = {
    control: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    watch: PropTypes.func,
};

export default MotoFilters;
