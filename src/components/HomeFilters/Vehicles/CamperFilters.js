import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import RoomIcon from '@material-ui/icons/Room';
import { GeoCitiesInput, SelectInput, SliderInput, TextInput } from '../../Form/Inputs';
import CarApiService from '../../../services/vehicles/CarApiService';
import { ModalDialogContext } from '../../../context/ModalDialogContext';
import SelectCountryFlags from '../../Form/Inputs/SelectCountryFlags';
import { SelectOptionsUtils } from '../../../libs/formFieldsUtils';
import useAddress from '../../../hooks/useAddress';
import FieldWrapper from '../../Form/FieldWrapper';
import Header from '../../Header';
import {
    CheckboxOptionsEquipments,
    RadioChoicesEmission,
    RadioChoicesEngine,
    RadioChoicesExternalColor,
    RadioChoicesGas,
    RadioChoicesMaterials,
    RadioChoicesPaints,
    RadioTypeFunction,
    RadioVehicleGeneralState,
} from '../../Vehicles/camper/form.data';

const CamperFilters = ({ control, watch, errors, ...props }) => {
    const [addressObj, address, coordinates] = useAddress();
    const [makes, setMakes] = useState([]);
    const { dispatchModalError } = useContext(ModalDialogContext);
    const popularMakesId = [
        3, // AlphaRomeo
        9, // Audi
        16, // BMW
        107, // Peugeot
        117, // Renault
        28, // Citroen
        147, // Volkswagen
        48, // Ford
        88, // Mercedes-Benz
        102, // Opel
        47, // Fiat
        140, // Toyota
        133, // Susuki
    ];

    useEffect(() => {
        control.register({ name: 'coordinates' });
        control.setValue('coordinates', coordinates);
    }, [coordinates]);

    useEffect(() => {
        CarApiService.getMakes(popularMakesId)
            .then(cars => {
                const makesOptions = cars.map(car => ({
                    value: car.make,
                    label: car.make,
                }));
                const defaultOption = {
                    value: 'other',
                    label: 'Je ne sais pas/Autre',
                };
                setMakes([...makesOptions, defaultOption]);
            })
            .catch(err => {
                dispatchModalError({ err });
            });
    }, []);

    const countrySelect = watch('countrySelect');

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

            <Typography component="span" gutterBottom>Type de camping-car</Typography>
            <SelectInput
                name="vehicleFunctionUse"
                options={RadioTypeFunction}
                control={control}
                errors={errors}
            />

            <Typography component="span" gutterBottom>Etat du véhicule</Typography>
            <SelectInput
                name="vehicleGeneralState"
                options={RadioVehicleGeneralState}
                control={control}
                errors={errors}
            />

            <Typography component="span" gutterBottom>Boite de vitesse</Typography>
            <SelectInput
                name="vehicleEngine.type"
                options={RadioChoicesEngine}
                control={control}
                errors={errors}
            />

            <Typography component="span" gutterBottom>Carburant</Typography>
            <SelectInput
                name="vehicleEngine.gas"
                className="mb-2"
                options={RadioChoicesGas}
                control={control}
                errors={errors}
            />

            <Typography component="span" gutterBottom>Cylindrée (cm3)</Typography>
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

            <Typography component="span">Equipements</Typography>
            <SelectInput
                name="equipments"
                options={CheckboxOptionsEquipments}
                isMulti
                defaultChecked={['ABS', 'ESP']}
                control={control}
                errors={errors}
            />

            <Header p strong className="my-2" text="Classe d'émission"/>
            <SelectInput
                name="emission"
                options={RadioChoicesEmission}
                control={control}
                errors={errors}
            />

            <Typography component="span" gutterBottom>Consommation CO2</Typography>
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

            <Typography component="span" gutterBottom>Nombre de places</Typography>
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

            <Typography component="span" gutterBottom>Nombre de portes</Typography>
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

            <Typography component="span" gutterBottom>Nombre de couchettes</Typography>
            <SliderInput
                classNames="my-4 mt-2"
                name="bunks"
                defaultValue={[1, 10]}
                min={1}
                max={10}
                step={1}
                errors={errors}
                control={control}
            />

            <Typography component="span" gutterBottom>Nombre de lits</Typography>
            <SliderInput
                classNames="my-4 mt-2"
                name="beds"
                defaultValue={[1, 10]}
                min={1}
                max={10}
                step={1}
                errors={errors}
                control={control}
            />

            <Typography component="span">Couleur extérieure</Typography>
            <SelectInput
                name="bedType"
                options={SelectOptionsUtils(['simple', 'double', 'depliant', 'gonflable'])}
                control={control}
                errors={errors}
            />

            <Typography component="span">Materiaux</Typography>
            <SelectInput
                name="externalColor"
                options={RadioChoicesMaterials}
                control={control}
                errors={errors}
            />

            <Typography component="span">Peinture</Typography>
            <SelectInput
                name="paint"
                options={RadioChoicesPaints}
                control={control}
                errors={errors}
            />

            <Typography component="span">Couleur extérieure</Typography>
            <SelectInput
                name="externalColor"
                options={RadioChoicesExternalColor}
                control={control}
                errors={errors}
            />

            <Typography component="span">Peinture</Typography>
            <SelectInput
                name="paint"
                options={RadioChoicesPaints}
                control={control}
                errors={errors}
            />

        </>
    );
};

CamperFilters.propTypes = {
    control: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    watch: PropTypes.func,
};

export default CamperFilters;
