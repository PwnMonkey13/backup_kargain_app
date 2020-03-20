import React, {useRef, useContext} from 'react';
import {useForm} from "react-hook-form";
import Header from "../../../Header";
import { NumberInput, RadioInput, TextInput} from "../../Inputs";
import {RadioChoicesEngine, RadioTypeChoices} from "../../../../libs/fieldsOptions";
import StepNavigation from "../../StepNavigation";
import GroupInputs from "../../GroupInputs";
import FieldWrapper from "../../FieldWrapper";

const Step1_CarDetails = ({methods, formConfig, onSubmitStep, prevStep, nextStep, ...props}) => {
    const formRef = useRef(null);
    const {watch, control, errors, getValues, register, formState, handleSubmit} = methods;

    return (
        <form className="form_wizard" ref={formRef} onSubmit={handleSubmit(onSubmitStep)}>

            <FieldWrapper label="Titre de l'annonce" inline required >
                <TextInput
                    name="title"
                    errors={errors}
                    fullwidth
                    register={
                        register({
                            required: 'Title is required',
                            minLength: {value: 5, message: 'Min lenght : 5 '}
                        })
                    }
                />
            </FieldWrapper>

            <FieldWrapper label="Type" required>
                <RadioInput name="type"
                            options={RadioTypeChoices}
                            errors={errors}
                            register={register({required: 'Title is required!'})}
                />
            </FieldWrapper>

            <GroupInputs label="Puissance" labelTop vertical>
                <FieldWrapper label="Puissance kW" required>
                    <NumberInput name="power.kw"
                                 errors={errors}
                                 register={register({ required: 'Title is required' })}
                    />
                </FieldWrapper>

                <FieldWrapper label="Puissance CH" required>
                    <NumberInput name="power.ch"
                                 label="Puissance CH"
                                 errors={errors}
                                 register={register({ required: 'Title is required' })}
                    />
                </FieldWrapper>
            </GroupInputs>

            <FieldWrapper label="Cylindrée">
                <NumberInput name="cylinder"
                             errors={errors}
                             register={register({ required: 'Title is required' })}
                />
            </FieldWrapper>

            <FieldWrapper label="Boite de vitesse">
                <RadioInput
                    name="engine"
                    options={RadioChoicesEngine}
                    register={register({ required: 'Title is required' })}
                    errors={errors}
                />
            </FieldWrapper>

            <StepNavigation prev={prevStep} submit />
        </form>
    );
};

export default Step1_CarDetails;
