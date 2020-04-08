import React, {useContext, useEffect, useState} from "react";
import Header from "../../Header";
import {
    CheckboxOptionsEquipments,
    RadioChoicesEmission,
    RadioChoicesEngine,
    RadioChoicesExternalColor,
    RadioChoicesGas,
    RadioChoicesPaints } from "../../Vehicles/car/form.data";
import {SelectOptionsUtils} from "../../../libs/formFieldsUtils";
import { SliderInput, RangeSlider, NumberInput, SelectInput, GeoCitiesInput } from "../../Form/Inputs";
import CarApiService from "../../../services/vehicles/CarApiService";
import {ModalDialogContext} from "../../Context/ModalDialogContext";
import {MapPin} from "react-feather";
import Typography from "@material-ui/core/Typography";
import ReactFlagsSelect from "../../SelectCountriesFlags";
import useAddress from "../../../hooks/useAddress";

const CarFilters = ({control, errors, ...props}) => {
    const [geolocation, addressData, niceAddress] = useAddress();
    const [makes, setMakes] = useState([]);
    const {dispatchModal} = useContext(ModalDialogContext);
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
        133 // Susuki
    ];

    useEffect(() => {
        CarApiService.getMakes(popularMakesId)
            .then(cars => {
                const makesOptions = cars.map(car => ({value: car.make, label: car.make}));
                const defaultOption = {value: "other", label: "Je ne sais pas/Autre"};
                setMakes([...makesOptions, defaultOption]);
            })
            .catch(err => {
                dispatchModal({type: 'error', err});
            });
    }, []);

    return(
        <>
            <Header p strong className="my-2" text="Marque"/>
            <SelectInput
                name="manufacturer.make"
                control={control}
                errors={errors}
                options={makes}
            />

            <Header p strong className="my-2" text="Boite de vitesse"/>
            <SelectInput
                name="engine.type"
                options={RadioChoicesEngine}
                control={control}
                errors={errors}
            />

            <Header p strong className="my-2" text="Carburant"/>
            <SelectInput
                name="engine.gas"
                className="mb-2"
                options={RadioChoicesGas}
                control={control}
                errors={errors}
            />

            <Header p strong className="my-2" text="Cylindrée (cm3)"/>
            <div className="d-flex">
                <NumberInput
                    name="engine.cylinder.from"
                    className="mb-2 mx-1"
                    placeholder="de"
                    control={control}
                    errors={errors}
                />
                <NumberInput
                    name="engine.cylinder.to"
                    className="mb-2 mx-1"
                    placeholder="a"
                    control={control}
                    errors={errors}
                />
            </div>

            <Header p strong className="my-2" text="Prix"/>
            <RangeSlider
                name="price"
                min={1000}
                max={100000}
                step={1000}
                control={control}
                errors={errors}
                range
                suffix="€"
                classNames="mb-2 my-4"
            />

            <Header p strong className="my-2" text="Nationalité"/>
            <ReactFlagsSelect
                name="seller.nationality"
                errors={errors}
                control={control}
            />

            <Header p strong className="my-2">
                <MapPin/> Adresse approximative : {niceAddress}
            </Header>

            <GeoCitiesInput
                name="seller.address"
                enableGeoloc
                lat={geolocation.latitude}
                long={geolocation.longitude}
                typeAPI="geo" //vicopo
                control={control}
                errors={errors}
            />

            <Header p strong className="my-2" text="Rayon"/>
            <SliderInput
                name="radius"
                defaultValue={15}
                min={1}
                max={100}
                step={5}
                suffix="km"
                control={control}
                errors={errors}
                classNames="mb-2 my-4"
            />

            <Header as="label" text="Kilométrage (km)"/>
            <div className="d-flex">
                <NumberInput
                    name="mileage.from"
                    className="mb-2 mx-1"
                    placeholder="de"
                    control={control}
                    errors={errors}
                />

                <NumberInput
                    name="mileage.to"
                    className="mb-2 mx-1"
                    placeholder="a"
                    control={control}
                    errors={errors}
                />
            </div>

            <Header p strong className="my-2" text="Puissance"/>
            <div className="d-flex">
                <NumberInput
                    name="power.kw.from"
                    className="mb-2 mx-1"
                    control={control}
                    errors={errors}
                />
                <NumberInput
                    name="power.kw.to"
                    className="mb-2 mx-1"
                    control={control}
                    errors={errors}
                />
            </div>

            <Header p strong className="my-2" text="Classe d'émission"/>
            <SelectInput
                name="emission"
                options={RadioChoicesEmission}
                control={control}
                errors={errors}
            />

            <Header p strong className="my-2" text="Consommation CO2"/>
            <div className="d-flex">
                <NumberInput
                    name="consumption.gkm.from"
                    control={control}
                    errors={errors}
                />

                <NumberInput
                    name="consumption.gkm.to"
                    control={control}
                    errors={errors}
                />
            </div>

            <Header p strong className="my-2" text="Nombre de portes"/>
            <SelectInput
                name="doors"
                className="mb-2"
                options={SelectOptionsUtils([2, 3, 4, 5])}
                placeholder="5"
                control={control}
                errors={errors}
            />

            <Header p strong className="my-2" text="Nombre de places"/>
            <SelectInput
                name="seats"
                className="mb-2"
                options={SelectOptionsUtils([2, 3, 4, 5])}
                placeholder="5"
                control={control}
                errors={errors}
            />

            <Header p strong className="my-2" text="Equipements"/>
            <SelectInput
                name="equipments"
                options={CheckboxOptionsEquipments}
                isMulti
                defaultChecked={["ABS", "ESP"]}
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

            <Header p strong className="my-2" text="Couleur intérieure"/>
            <SelectInput
                name="internalColor"
                options={RadioChoicesExternalColor}
                control={control}
                errors={errors}
            />
        </>
    )
};

export default CarFilters;
