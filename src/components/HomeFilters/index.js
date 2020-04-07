import React, {memo, useEffect, useRef, useState} from 'react';
import {useForm} from "react-hook-form";
import styled from "styled-components";
import {SelectOptionsUtils} from "../../libs/formFieldsUtils";
import VehicleTypeSelector from "./VehicleTypeSelector";
import {RadioGroupInput} from "../Form/Inputs";
import Filters from './Vehicles';
import Header from "../Header";
import {flatten} from "flattenjs";

const Form = styled.form`
     display: flex;
     flex-direction: column;
     border: 1px solid #dce0e0;
     background-color: #f7f8f9;
     border-radius: .1875rem;
     background-color: #fff;
     padding: 10px;
  `;

const HomeFilters = memo(({filters, updateFilters}) => {
    const formRef = useRef(null);
    const [vehicleType, setVehicleType] = useState(filters.vehicleType);
    const DynamicFiltersComponent = Filters[`${vehicleType}`];

    const formConfig = {
        mode: 'onChange',
        validateCriteriaMode: "all",
        defaultValues: filters
    };

    const {watch, control, errors, setValue, getValues, register, formState, handleSubmit} = useForm(formConfig);

    useEffect(() => {
        updateFilters(filters);
    }, []);

    const prepareFilters = (data) => {
        const flattened = flatten(data);
        return Object.keys(flattened).reduce((carry, key) => {
            if (flattened[key]) {
                if (typeof flattened[key] === "string") carry[key] = flattened[key].toLowerCase();
                else carry[key] = flattened[key];
            }
            return carry;
        }, {});
    };

    const filterData = data => {

        const migration = {
            'vehicleType': {rule: 'strict'},
            'adType': {rule: 'strict'},
            'manufacturer.make.value': null,
            'engine.cylinder.from': {type: "number", rule: 'min', ref: 'engine.cylinder'},
            'engine.cylinder.to': {type: "number", rule: 'max', ref: 'engine.cylinder'},
            'engine.type.value' : null,
            'engine.gas.value': null,
            'mileage.from': {type: "number", rule: 'min', ref: 'mileage'},
            'mileage.to': {type: "number", rule: 'max', ref: 'mileage'},
            'price.min': {type: "number", rule: 'min', ref: 'price'},
            'price.max': {type: "number", rule: 'max', ref: 'price'},
            'doors.value' : {type: "number", rule: 'min', ref: 'price'},
            'seats.value': {type: "number", rule: 'min', ref: 'price'}
        };

        return Object.keys(data).reduce((carry, key) => {
            if (migration.hasOwnProperty(key)){
                if (typeof migration[key] === "object"){
                    carry[key] = {...migration[key], value: data[key]};
                    if(!carry[key].type) carry[key].type = typeof data[key];
                } else carry[key] = {type: typeof data[key], value: data[key]};
            }
            return carry;
        }, {});
    };

    const onSubmit = (data) => {
        const prepared = prepareFilters(data);
        const filters = filterData(prepared);
        updateFilters(filters);
    };

    return (
        <Form className="form_wizard" ref={formRef} onSubmit={handleSubmit(onSubmit)}>
            <button type="submit"><strong>Appliquer filtres</strong></button>
            <button className="mt-2" type="button" onClick={()=>window.location.reload()}>Reinitialiser</button>
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
                        checked : true,
                        value : 'sale'
                    }]
                }
            />

            <VehicleTypeSelector
                name="vehicleType"
                control={control}
            />

            {DynamicFiltersComponent && (
                <DynamicFiltersComponent
                    control={control}
                    errors={errors}
                />
            )}
        </Form>
    );
});

HomeFilters.defaultProps = {
    vehicleType: 'car',
    adType: 'rent',
    filters: {
        vehicleType: 'car'
    }
};

export default HomeFilters;
