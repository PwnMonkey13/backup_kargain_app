import React, {useRef} from 'react';
import Header from "../../Header";
import {RadioGroupInput, SelectInput, TextareaInput} from "../../Form/Inputs";
import {RadioGeneralStateVehicle, RadioFunctionVehicle } from "./form.data.js";
import StepNavigation from "../../Form/StepNavigation";
import {SelectOptionsUtils} from "../../../libs/formFieldsUtils";
import FieldWrapper from "../../Form/FieldWrapper";

const Step = ({methods, formConfig, onSubmitStep, prevStep, nextStep, ...props}) => {
    const formRef = useRef(null);
    const {watch, getValues, control, errors, handleSubmit} = methods;

    return (
        <form className="form_wizard" onSubmit={handleSubmit(onSubmitStep)}>

            <Header text="Etat du véhicule"/>

            <FieldWrapper label="Fonction du véhicule">
                <RadioGroupInput
                    name="vehicleFunction"
                    options={RadioFunctionVehicle}
                    control={control}
                    rules={{ required: 'Title is required' }}
                    errors={errors}
                />
            </FieldWrapper>

            <FieldWrapper label="Etat général">
                <RadioGroupInput
                    name="vehicleState"
                    options={RadioGeneralStateVehicle}
                    control={control}
                    rules={{ required: 'Title is required' }}
                    errors={errors}
                />
            </FieldWrapper>

            <FieldWrapper label="Nombre de propriétaires">
                <SelectInput
                    name="owners"
                    options={SelectOptionsUtils([2, 3, 4, 5])}
                    placeholder="Select number of owners"
                    control={control}
                    rules={{ required: "Field required" }}
                    errors={errors}
                />
            </FieldWrapper>

            <FieldWrapper label="Véhicule accidenté">
                <SelectInput
                    name="damages"
                    options={SelectOptionsUtils([2, 3, 4, 5])}
                    placeholder="Select number of damages"
                    control={control}
                    rules={{ required: "Field required" }}
                    errors={errors}
                />
            </FieldWrapper>

            <FieldWrapper label="Véhicule deffectueux">
                <SelectInput
                    name="defective"
                    options={SelectOptionsUtils([2, 3, 4, 5])}
                    control={control}
                    rules={{ required: "Field required" }}
                    errors={errors}
                />
            </FieldWrapper>

            <FieldWrapper label="Description">
                <TextareaInput
                    name="description"
                    control={control}
                    rules={{ required: "Field required" }}
                    errors={errors}
                />
            </FieldWrapper>

            <StepNavigation prev={prevStep} submit />
        </form>
    );
};

export default Step;
