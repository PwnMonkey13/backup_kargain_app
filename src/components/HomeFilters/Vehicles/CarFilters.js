import React, {useContext, useEffect, useState} from "react";
import Header from "../../Header";
import {RadioChoicesEngine, RadioChoicesGas} from "../../Vehicles/car/form.data";
import {SelectOptionsUtils} from "../../../libs/formFieldsUtils";
import {RangeInput, NumberInput, SelectInput} from "../../Form/Inputs";
import CarApiService from "../../../services/vehicles/CarApiService";
import {ModalDialogContext} from "../../Context/ModalDialogContext";

const CarFilters = ({control, errors, ...props}) => {
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
        return function cleanup() {
            console.log('unmount');
        }
    }, []);

    return(
        <>
            <Header as="label" text="Marque"/>
            <SelectInput
                name="manufacturer.make"
                placeholder="Select a car make"
                control={control}
                errors={errors}
                options={makes}
            />

            <Header as="label" text="Boite de vitesse"/>
            <SelectInput
                name="engine.type"
                options={RadioChoicesEngine}
                control={control}
                errors={errors}
            />

            <Header as="label" text="Carburant"/>
            <SelectInput
                name="engine.gas"
                className="mb-2"
                options={RadioChoicesGas}
                control={control}
                errors={errors}
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

            <Header as="label" text="Cylindrée (cm3)"/>
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


            <Header as="label" text="Nombre de portes"/>
            <SelectInput
                name="doors"
                className="mb-2"
                options={SelectOptionsUtils([2, 3, 4, 5])}
                placeholder="5"
                control={control}
                errors={errors}
            />

            <Header as="label" text="Nombre de places"/>
            <SelectInput
                name="seats"
                className="mb-2"
                options={SelectOptionsUtils([2, 3, 4, 5])}
                placeholder="5"
                control={control}
                errors={errors}
            />

            <Header as="label" text="Prix"/>
            <RangeInput
                name="price"
                min={1000}
                max={100000}
                control={control}
                errors={errors}
                classNames="mb-2 my-4"
            />

            <Header as="label" text="Rayon"/>
            <RangeInput
                name="radius"
                control={control}
                errors={errors}
                classNames="mb-2 my-4"
            />
        </>
    )
};

export default CarFilters;
