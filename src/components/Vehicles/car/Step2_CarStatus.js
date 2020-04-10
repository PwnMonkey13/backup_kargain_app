import React, {useRef} from 'react';
import Header from "../../Header";
import {RadioGroupInput, SelectInput, TextareaInput} from "../../Form/Inputs";
import {RadioChoicesFunction} from "./form.data.js";
import StepNavigation from "../../Form/StepNavigation";
import {SelectOptionsUtils} from "../../../libs/formFieldsUtils";
import FieldWrapper from "../../Form/FieldWrapper";
import {RadioVehicleGeneralState} from "../moto/form.data";
import {Col, Row} from "reactstrap";

const Step = ({methods, formConfig, onSubmitStep, prevStep, nextStep, ...props}) => {
    const formRef = useRef(null);
    const {watch, getValues, control, errors, handleSubmit} = methods;

    return (
        <form className="form_wizard" onSubmit={handleSubmit(onSubmitStep)}>

            <Header text="Etat du véhicule"/>

            <FieldWrapper label="Etat général">
                <SelectInput
                    name="vehicleGeneralState"
                    options={RadioVehicleGeneralState}
                    control={control}
                    errors={errors}
                />
            </FieldWrapper>

            <FieldWrapper label="Nombre de propriétaires">
                <SelectInput
                    name="owners"
                    options={SelectOptionsUtils([2, 3, 4, 5])}
                    placeholder="Select number of owners"
                    control={control}
                    errors={errors}
                />
            </FieldWrapper>

            <Row>
                <Col>
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
                </Col>
                <Col>
                    <FieldWrapper label="Véhicule deffectueux">
                        <SelectInput
                            name="defective"
                            options={SelectOptionsUtils([2, 3, 4, 5])}
                            control={control}
                            rules={{ required: "Field required" }}
                            errors={errors}
                        />
                    </FieldWrapper>
                </Col>
            </Row>

            <FieldWrapper label="Description">
                <TextareaInput
                    name="description"
                    control={control}
                    errors={errors}
                />
            </FieldWrapper>

            <p> TODO TAGS </p>
            <p> TODO Damage selector </p>

            <StepNavigation prev={prevStep} submit />
        </form>
    );
};

export default Step;
