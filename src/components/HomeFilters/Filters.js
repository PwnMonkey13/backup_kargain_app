import React, {memo, useEffect, useRef, useState} from 'react';
import {useForm} from "react-hook-form";
import {flatten} from "flattenjs";
import PropTypes from "prop-types";
import styled from "styled-components";
import VehicleTypeFilterSelector from "./VehicleTypeFilterSelector";
import {RadioGroupInput, SelectInput} from "../Form/Inputs";
import getFiltersVehicleComponent from './Vehicles';
import Header from "../Header";
import useIsMounted from "../../hooks/useIsMounted";
import Spacer from "../Spacer";

const Filters = memo(({defaultFilters, updateFilters : fireFilters}) => {
    const isMounted = useIsMounted();
    const formRef = useRef(null);
    const [filters, setFilters] = useState(defaultFilters);
    const DynamicFiltersComponent = getFiltersVehicleComponent(filters.vehicleType);

    console.log(filters.vehicleType);

    const formConfig = {
        mode: 'onChange',
        validateCriteriaMode: "all",
        defaultValues: defaultFilters
    };

    const {watch, control, errors, setValue, getValues, register, formState, handleSubmit} = useForm(formConfig);

    const prepareFilters = (filters) => {
        const flattened = flatten(filters);
        return Object.keys(flattened).reduce((carry, key) => {
            if (flattened[key]) {
                carry[key] = typeof flattened[key] === "string" ? flattened[key].toLowerCase() : flattened[key]
            }
            return carry;
        }, {});
    };

    const filterProps = properties => {
        const allowedFields = {
            'vehicleType': {rule: 'strict'},
            'vehicleFunctionUse.value' : {},
            'vehicleTypeSelect.value': {key : 'vehicleType'},
            'adType': {rule: 'strict'},
            'manufacturer.make.value': {},
            'vehicleEngine.type.value' : {},
            'vehicleEngine.gas.value': {},
            'vehicleEngine.cylinder.from': {type: "number", rule: 'min', ref: 'vehicleEngine.cylinder'},
            'vehicleEngine.cylinder.to': {type: "number", rule: 'max', ref: 'vehicleEngine.cylinder'},
            'vehicleGeneralState.value': {},
            'price.min': {type: "number", rule: 'min', ref: 'price'},
            'price.max': {type: "number", rule: 'max', ref: 'price'},
            'mileage.from': {type: "number", rule: 'min', ref: 'mileage'},
            'mileage.to': {type: "number", rule: 'max', ref: 'mileage'},
            'power.kw.from': {type: "number", rule: 'min', ref: 'power.kw'},
            'power.kw.to': {type: "number", rule: 'max', ref: 'power.kw'},
            'consumption.gkm.from':  {type: "number", rule: 'min', ref: 'consumption.gkm'},
            'consumption.gkm.to':  {type: "number", rule: 'min', ref: 'consumption.gkm'},
            'doors.min': {type: "number", rule: 'min', ref: 'doors'},
            'doors.max': {type: "number", rule: 'max', ref: 'doors'},
            'seats.min': {type: "number", rule: 'min', ref: 'seats'},
            'seats.max': {type: "number", rule: 'max', ref: 'seats'},
            'bunks.min': {type: "number", rule: 'min', ref: 'seats'},
            'bunks.max': {type: "number", rule: 'max', ref: 'seats'},
            'driverCabin.min': {type: "number", rule: 'min', ref: 'driverCabin'},
            'driverCabin.max': {type: "number", rule: 'max', ref: 'driverCabin'},
            'hoursOfUse.from' : {type: "number", rule: 'min', ref: 'hoursOfUse'},
            'hoursOfUse.to' : {type: "number", rule: 'max', ref: 'hoursOfUse'},
            //TODO equipments
            'equipments' : {type:"array", single : {}},
            'bedType.value': {},
            'materials.value': {},
            'emission.value' : {},
            'paint.value': {},
            'externalColor.value': {},
            'internalColor.value': {},
        };

        return Object.keys(properties).reduce((carry, key) => {
            if (allowedFields.hasOwnProperty(key)){
                if (typeof allowedFields[key] === "object"){
                    const field = allowedFields[key];
                    if(field.hasOwnProperty('key')){
                        carry[field.key] = {...carry[field.key], value: properties[key]};
                    }
                    else{
                        carry[key] = {...field, value: properties[key]};
                        if(!carry[key].type) carry[key].type = typeof properties[key];
                    }
                } else carry[key] = {type: typeof properties[key], value: properties[key]};
            }
            return carry;
        }, {});
    };

    const onSubmit = (data, e) => {
        e.preventDefault();
        setFilters(data);
    };

    useEffect(() => {
        if(isMounted){
            const { location, country, geoloc, ...properties } = filters;
            const filtersFlat = filterProps(prepareFilters(properties));
            let data = {...filtersFlat};
            if(country){
                data.country = country.value;
                if(geoloc){
                    const { longitude, latitude } = geoloc;
                    data.position = {
                        longitude,
                        latitude
                    };
                }
                if(location){
                    const { postcode, citycode } = location.value;
                    data.address = {
                        postcode,
                        citycode
                    };
                }
            }
            fireFilters(filtersFlat);
        }
    },[filters]);

    const Form = styled.form`
         display: flex;
         flex-direction: column;
         border: 1px solid #dce0e0;
         background-color: #f7f8f9;
         border-radius: .1875rem;
         background-color: #fff;
         padding: 10px;
      `;

    const ControlButtons = () => (
        <div className="d-flex flex-column my-3">
            <button className="btn btn-primary"type="submit"><strong>Appliquer filtres</strong></button>
            <button className="mt-2" type="button" onClick={()=>window.location.reload()}>Reinitialiser</button>
            {/*<button className="mt-2" type="button" onClick={()=>console.log(filters)}>CLICK</button>*/}
            {/*<button className="mt-2" type="button" onClick={()=>console.log(getValues())}>CLICK</button>*/}
        </div>
    );

    return (
        <form className="d-flex flex-column form_wizard" ref={formRef} onSubmit={handleSubmit(onSubmit)}>
            <ControlButtons/>
            <Header as="h2" text="Filtrer par :"/>
            <Header p strong className="m-0" text="Type de d'annonce :"/>
            <RadioGroupInput
                name="adType"
                noInputClass
                control={control}
                errors={errors}
                options={[
                    {
                        label : 'Location',
                        value : 'rent'
                    },
                    {
                        label : 'Vente',
                        value : 'sale'
                    }]
                }
            />

            <Header p strong className="my-2" text="Type de véhicule :"/>
            <VehicleTypeFilterSelector
                name="vehicleType"
                control={control}
            />

            { DynamicFiltersComponent && (
                <DynamicFiltersComponent
                    control={control}
                    errors={errors}
                    watch={watch}
                />
            )}

            <Spacer/>
            <ControlButtons/>
        </form>
    );
});

Filters.defaultProps = {
    defaultFilters: {
        vehicleType: 'car',
        adType: 'sale',
    }
};

export default Filters;
