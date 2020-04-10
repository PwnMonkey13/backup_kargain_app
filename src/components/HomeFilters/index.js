import React, {memo, useEffect, useRef, useState} from 'react';
import {useForm} from "react-hook-form";
import {flatten} from "flattenjs";
import PropTypes from "prop-types";
import styled from "styled-components";
import VehicleTypeSelector from "./VehicleTypeSelector";
import {RadioGroupInput, SelectInput} from "../Form/Inputs";
import getFiltersVehicleComponent from './Vehicles';
import Header from "../Header";
import useIsMounted from "../../hooks/useIsMounted";

const Form = styled.form`
     display: flex;
     flex-direction: column;
     border: 1px solid #dce0e0;
     background-color: #f7f8f9;
     border-radius: .1875rem;
     background-color: #fff;
     padding: 10px;
  `;

const HomeFilters = memo(({defaultFilters, updateFilters : fireFilters}) => {
    const isMounted = useIsMounted();
    const formRef = useRef(null);
    const [filters, setFilters] = useState(defaultFilters);
    const DynamicFiltersComponent = getFiltersVehicleComponent(filters.vehicleType);

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
            'emission.value' : {},
            'consumption.gkm.from':  {type: "number", rule: 'min', ref: 'consumption.gkm'},
            'consumption.gkm.to':  {type: "number", rule: 'min', ref: 'consumption.gkm'},
            'doors.value': {},
            'seats.value': {},
            //TODO equipments
            'equipments' : {type:"array", single : {}},
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

            console.log(data);
            fireFilters(filtersFlat);
        }
    },[filters]);

    return (
        <form className="d-flex flex-column form_wizard" ref={formRef} onSubmit={handleSubmit(onSubmit)}>
            <button type="submit"><strong>Appliquer filtres</strong></button>
            <button className="mt-2" type="button" onClick={()=>window.location.reload()}>Reinitialiser</button>
            {/*<button className="mt-2" type="button" onClick={()=>console.log(filters)}>CLICK</button>*/}
            {/*<button className="mt-2" type="button" onClick={()=>console.log(getValues())}>CLICK</button>*/}
            <Header as="h4" text="Filtrer par :"/>

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

            <VehicleTypeSelector
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
        </form>
    );
});

HomeFilters.defaultProps = {
    defaultFilters: {
        vehicleType: 'car',
        adType: 'sale',
    }
};

export default HomeFilters;
