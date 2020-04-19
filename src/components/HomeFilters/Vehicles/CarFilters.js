import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { MapPin } from 'react-feather'
import Header from '../../Header'
import {
    RadioTypeFunction,
    CheckboxOptionsEquipments,
    RadioChoicesEmission,
    RadioChoicesEngine,
    RadioChoicesExternalColor,
    RadioChoicesGas,
    RadioChoicesPaints,
    RadioVehicleGeneralState
} from '../../Vehicles/car/form.data'
import { SliderInput, NumberInput, SelectInput, GeoCitiesInput } from '../../Form/Inputs'
import CarApiService from '../../../services/vehicles/CarApiService'
import { ModalDialogContext } from '../../Context/ModalDialogContext'
import ReactFlagsSelect from '../../SelectCountriesFlags'
import useAddress from '../../../hooks/useAddress'

const CarFilters = ({ control, watch, errors, ...props }) => {
    const [addressObj, address, geolocation] = useAddress()
    const [makes, setMakes] = useState([])
    const { dispatchModalError } = useContext(ModalDialogContext)
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
    ]

    useEffect(() => {
        control.register({ name: 'geoloc' })
    }, [])

    useEffect(() => {
        control.setValue('geoloc', geolocation)
    }, [geolocation])

    useEffect(() => {
        CarApiService.getMakes(popularMakesId)
            .then(cars => {
                const makesOptions = cars.map(car => ({ value: car.make, label: car.make }))
                const defaultOption = { value: 'other', label: 'Je ne sais pas/Autre' }
                setMakes([...makesOptions, defaultOption])
            })
            .catch(err => {
                dispatchModalError({ err })
            })
    }, [])

    const countrySelect = watch('country')

    return (
        <>
            <Header p strong className="my-2" text="Marque"/>
            <SelectInput
                name="manufacturer.make"
                control={control}
                errors={errors}
                options={makes}
            />

            <Header p strong className="my-2" text="Type de voiture"/>
            <SelectInput
                name="vehicleFunctionUse"
                options={RadioTypeFunction}
                control={control}
                errors={errors}
            />

            <Header p strong className="my-2" text="Boite de vitesse"/>
            <SelectInput
                name="vehicleEngine.type"
                options={RadioChoicesEngine}
                control={control}
                errors={errors}
            />

            <Header p strong className="my-2" text="Carburant"/>
            <SelectInput
                name="vehicleEngine.gas"
                className="mb-2"
                options={RadioChoicesGas}
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

            <Header p strong className="my-2" text="Prix"/>
            <SliderInput
                name="price"
                defaultValue={[10000, 80000]}
                min={1000}
                max={100000}
                step={1000}
                errors={errors}
                control={control}
                suffix="€"
                classNames="mb-2 my-4"
            />

            <Header p strong className="my-2" text="Pays"/>
            <ReactFlagsSelect
                name="country"
                errors={errors}
                control={control}
            />

            { (countrySelect && countrySelect.value === 'FR') && (
                <>
                    <Header p strong className="my-2">
                        <MapPin/> Adresse approximative : {address}
                    </Header>

                    <GeoCitiesInput
                        name="location"
                        enableGeoloc
                        lat={geolocation.latitude}
                        long={geolocation.longitude}
                        typeAPI="geo" // vicopo
                        control={control}
                        errors={errors}
                    />

                    <Header p strong className="my-2" text="Rayon"/>
                    <SliderInput
                        name="radius"
                        defaultValue={15}
                        min={0}
                        max={30}
                        step={5}
                        suffix="km"
                        control={control}
                        errors={errors}
                        classNames="mb-2 my-4"
                    />
                </>
            )}

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

            <Header p strong className="my-2" text="Etat du véhicule"/>
            <SelectInput
                name="vehicleGeneralState"
                options={RadioVehicleGeneralState}
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
            <div className="d-flex">
                <NumberInput
                    name="doors.from"
                    control={control}
                    errors={errors}
                />
                <NumberInput
                    name="doors.to"
                    control={control}
                    errors={errors}
                />
            </div>

            <Header p strong className="my-2" text="Nombre de places"/>
            <div className="d-flex">
                <NumberInput
                    name="seats.from"
                    control={control}
                    errors={errors}
                />
                <NumberInput
                    name="seats.to"
                    control={control}
                    errors={errors}
                />
            </div>

            <Header p strong className="my-2" text="Equipements"/>
            <SelectInput
                name="equipments"
                options={CheckboxOptionsEquipments}
                isMulti
                defaultChecked={['ABS', 'ESP']}
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
}

CarFilters.propTypes = {
    control: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    watch: PropTypes.func
}

export default CarFilters
