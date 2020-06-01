import React, { memo, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import RoomIcon from '@material-ui/icons/Room';
import {
    CheckboxOptionsEquipments,
    RadioChoicesExternalColor,
    RadioChoicesPaints,
    RadioTypeFunction,
} from '../../Vehicles/moto/form.data';
import { GeoCitiesInput, SelectInput, SliderInput, TextInput } from '../../Form/Inputs';
import MotorsBikesApiService from '../../../services/vehicles/InternalVehiclesApiService';
import { ModalDialogContext } from '../../../context/ModalDialogContext';
import SelectCountryFlags from '../../Form/Inputs/SelectCountryFlags';
import useAddress from '../../../hooks/useAddress';
import FieldWrapper from '../../Form/FieldWrapper';
import Header from '../../Header';
import { RadioVehicleGeneralState } from '../../Vehicles/car/form.data';

const MotoFilters = memo(({ control, watch, errors, ...props }) => {
    const [addressObj, address, geolocation] = useAddress();
    const [makes, setMakes] = useState([]);
    const { dispatchModalError } = useContext(ModalDialogContext);
    const [manufacturersData, setManufacturersData] = useState({
        makes: [],
        models: [],
    });

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
        control.register({ name: 'geoloc' });
    }, []);

    useEffect(() => {
        control.setValue('geoloc', geolocation);
    }, [geolocation]);

    useEffect(() => {
        console.log('fetch makes');
        MotorsBikesApiService.getMakes(popularMakes)
            .then(motos => {
                const makesOptions = motos.map(car => ({
                    value: car.make,
                    label: car.make,
                }));
                const defaultOption = {
                    value: 'other',
                    label: 'Je ne sais pas/Autre',
                };
                setManufacturersData(manufacturersData => (
                    {
                        ...manufacturersData,
                        makes: [...makesOptions, defaultOption],
                    }),
                );
            })
            .catch(err => {
                dispatchModalError({ err });
            });
        return function cleanup () {
            console.log('unmount');
        };
    }, []);

    const countrySelect = watch('country');

    return (
        <>
            <Header p strong className="my-2" text="Marque"/>
            <SelectInput
                name="manufacturer.make"
                control={control}
                errors={errors}
                options={makes}
            />

            <Typography component="span" gutterBottom>Prix</Typography>
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

            <Typography component="span">Type de moto</Typography>
            <SelectInput
                name="vehicleFunctionUse"
                options={RadioTypeFunction}
                control={control}
                errors={errors}
            />

            <Typography component="span">Etat du véhicule</Typography>
            <SelectInput
                name="vehicleGeneralState"
                options={RadioVehicleGeneralState}
                control={control}
                errors={errors}
            />

            <Typography component="span">Cylindrée (cm3)</Typography>
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

            <Typography component="span" gutterBottom>Kilométrage (km)</Typography>
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

            <Typography component="span" gutterBottom>Puissance</Typography>
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

            <Typography component="span">Pays</Typography>
            <SelectCountryFlags
                name="countrySelect"
                errors={errors}
                control={control}
            />

            {address && (
                <>
                    <Typography component="span" gutterBottom>Adresse approximative</Typography>
                    <Header p strong className="my-2">
                        <RoomIcon/> : {address}
                    </Header>
                </>
            )}

            <Typography component="span" gutterBottom>Ville</Typography>
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
                    <FieldWrapper label="Ville">
                        <TextInput
                            name="address.city"
                            errors={errors}
                            control={control}
                            rules={{ required: 'Required' }}
                        />
                    </FieldWrapper>
                </>
            )}

            <Typography component="span" gutterBottom>Rayon (0 = off)</Typography>
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

            <Header p strong className="my-2" text="Equipements"/>
            <SelectInput
                name="equipments"
                options={CheckboxOptionsEquipments}
                isMulti
                defaultChecked={['Topcase', 'Kickstarter']}
                control={control}
                errors={errors}
            />

            <Header p strong className="my-2" text="Peinture"/>
            <SelectInput
                name="paint"
                options={RadioChoicesPaints}
                control={control}
                errors={errors}
            />

            <Header p strong className="my-2" text="Couleur extérieure"/>
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
