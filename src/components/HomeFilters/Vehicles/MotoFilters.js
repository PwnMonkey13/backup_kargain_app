import React, {memo, useContext, useEffect, useState} from "react";
import {MapPin} from "react-feather";
import {
    CheckboxOptionsEquipments,
    RadioChoicesExternalColor,
    RadioChoicesPaints,
    RadioTypeChoices
} from "../../Vehicles/moto/form.data";
import {GeoCitiesInput, NumberInput, SelectInput, SliderInput,} from "../../Form/Inputs";
import MotorsBikesApiService from "../../../services/vehicles/MotorsBikesApiService";
import {ModalDialogContext} from "../../Context/ModalDialogContext";
import ReactFlagsSelect from "../../SelectCountriesFlags";
import useAddress from "../../../hooks/useAddress";
import Header from "../../Header";
import PropTypes from "prop-types";

const MotoFilters = memo(({control, errors, ...props}) => {
    const [addressObj, address, geolocation] = useAddress();
    const [makes, setMakes] = useState([]);
    const {dispatchModalError} = useContext(ModalDialogContext);
    const [manufacturersData, setManufacturersData] = useState({
        makes: [],
        models: [],
    });

    const popularMakes = [
        "Aprilia",
        "BMW",
        "Ducati",
        "Honda",
        "Harley-Davidson",
        "Husqvarna",
        "Kawasaki",
        "KTM",
        "Suzuki",
        "Triumph",
        "Yamaha",
        "Royal Enfield",
    ];

    useEffect(()=>{
        control.register({name : "geoloc"});
    },[]);

    useEffect(() => {
        control.setValue("geoloc", geolocation);
    },[geolocation]);

    useEffect(() => {
        console.log('fetch makes');
        MotorsBikesApiService.getMakes(popularMakes)
            .then(motos => {
                const makesOptions = motos.map(car => ({value: car.make, label: car.make}));
                const defaultOption = {value: "other", label: "Je ne sais pas/Autre"};
                setManufacturersData(manufacturersData => (
                    {...manufacturersData, makes: [...makesOptions, defaultOption]})
                );
            })
            .catch(err => {
                dispatchModalError({err});
            });
        return function cleanup() {
            console.log('unmount');
        }
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

            <Header p strong className="my-2" text="Prix"/>
            <SliderInput
                name="price"
                defaultValue={[3000, 8000]}
                min={1000}
                max={100000}
                step={1000}
                control={control}
                errors={errors}
                suffix="€"
                classNames="mb-2 my-4"
            />

            <Header p strong className="my-2" text="Type de moto/scooter"/>
            <SelectInput
                name="type"
                options={RadioTypeChoices}
                control={control}
                errors={errors}
            />

            <Header p strong className="my-2" text="Cylindrée (cm3)"/>
            <div className="d-flex">
                <NumberInput
                    name="vehicleEngine.cylinder.from"
                    className="mb-2 mx-1"
                    placeholder="de"
                    control={control}
                    errors={errors}
                />
                <NumberInput
                    name="vehicleEngine.cylinder.to"
                    className="mb-2 mx-1"
                    placeholder="a"
                    control={control}
                    errors={errors}
                />
            </div>

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

            <Header p strong className="my-2" text="Puissance "/>
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

            <Header p strong className="my-2" text="Pays"/>
            <ReactFlagsSelect
                name="country"
                errors={errors}
                control={control}
            />

            { (countrySelect && countrySelect.value === "FR") && (
                <>
                    <Header p strong className="my-2">
                        <MapPin/> Adresse approximative : {address}
                    </Header>

                    <GeoCitiesInput
                        name="location"
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
                        max={30}
                        step={5}
                        suffix="km"
                        control={control}
                        errors={errors}
                        classNames="mb-2 my-4"
                    />
                </>
            )}

            <Header p strong className="my-2" text="Equipements"/>
            <SelectInput
                name="equipments"
                options={CheckboxOptionsEquipments}
                isMulti
                defaultChecked={["Topcase", "Kickstarter"]}
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
    )
});

MotoFilters.propTypes = {
    control: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    watch: PropTypes.func
};

export default MotoFilters;
