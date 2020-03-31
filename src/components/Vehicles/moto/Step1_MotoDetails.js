import React, {useRef} from 'react';
import FieldWrapper from "../../Form/FieldWrapper";
import {CheckboxMultipleInput, NumberInput, RadioGroupInput, TextInput} from "../../Form/Inputs";
import {CheckboxOptionsEquipments, RadioTypeChoices, RadioChoicesMaterials, RadioChoicesExternalColor, RadioChoicesPaints} from "./form.data.js";

const Step1_MotoDetails = ({methods, formConfig, onSubmitStep, prevStep, nextStep, ...props}) => {
    const formRef = useRef(null);
    const {watch, control, errors, getValues, register, formState, handleSubmit} = methods;

    return (
        <form className="form_wizard" ref={formRef} onSubmit={handleSubmit(onSubmitStep)}>

            <FieldWrapper label="Titre de l'annonce" inline required >
                <TextInput
                    name="title"
                    fullwidth
                    control={control}
                    errors={errors}
                    rules={{
                        required: 'Title is required',
                        minLength: {value: 5, message: 'Min lenght : 5 '}
                    }}
                />
            </FieldWrapper>

            <FieldWrapper label="Type" required>
                <RadioGroupInput name="type"
                            options={RadioTypeChoices}
                            control={control}
                            errors={errors}
                            rules={{required: 'Title is required!'}}
                />
            </FieldWrapper>

            <FieldWrapper label="Puissance kW" required>
                <NumberInput name="power.kw"
                             control={control}
                             errors={errors}
                             rules={{required: 'Title is required!'}}

                />
            </FieldWrapper>

            <FieldWrapper label="Puissance CH" required>
                <NumberInput name="power.ch"
                             label="Puissance CH"
                             control={control}
                             errors={errors}
                             rules={{required: 'Title is required!'}}
                />
            </FieldWrapper>

            <FieldWrapper label="Cylindrée">
                <NumberInput name="cylinder"
                             control={control}
                             errors={errors}
                             rules={{required: 'Title is required!'}}
                />
            </FieldWrapper>

            <FieldWrapper label="Equipements">
                <CheckboxMultipleInput
                    name="equipments"
                    options={CheckboxOptionsEquipments}
                    defaultChecked={["Topcase", "Kickstarter"]}
                    control={control}
                    errors={errors}
                    // rules={{required: 'Title is required!'}}
                />
            </FieldWrapper>

            <FieldWrapper label="Matériaux">
                <CheckboxMultipleInput
                    name="materials"
                    options={RadioChoicesMaterials}
                    control={control}
                    errors={errors}
                    rules={{required: 'Title is required!'}}
                />
            </FieldWrapper>

            <FieldWrapper label="Peinture">
                <RadioGroupInput
                    name="paint"
                    options={RadioChoicesPaints}
                    control={control}
                    errors={errors}
                    // rules={{required: 'Title is required!'}}
                />
            </FieldWrapper>

            <FieldWrapper label="Couleur extérieure">
                <RadioGroupInput
                    name="externalColor"
                    options={RadioChoicesExternalColor}
                    control={control}
                    errors={errors}
                    // rules={{required: 'Title is required!'}}
                />
            </FieldWrapper>

        </form>
    );
};

export default Step1_MotoDetails;
