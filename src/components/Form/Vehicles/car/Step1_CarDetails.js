import React, {useRef, useContext} from 'react';
import Header from "../../../Header";
import {CheckboxMultipleInput, NumberInput, RadioInput, SelectInput, TextInput} from "../../Inputs";
import {
    CheckboxOptionsEquipments,
    RadioChoicesEngine,
    RadioChoicesEmission,
    RadioChoicesExternalColor, RadioChoicesPaints,
    RadioTypeChoices, SelectChoicesDoors
} from "../../../../libs/fieldsOptions";
import StepNavigation from "../../StepNavigation";
import FieldWrapper from "../../FieldWrapper";
import {SelectOptionsUtils} from "../../../../libs/formFieldsUtils";

const Step1_CarDetails = ({methods, formConfig, onSubmitStep, prevStep, nextStep, ...props}) => {
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
                <RadioInput name="type"
                            options={RadioTypeChoices}
                            control={control}
                            errors={errors}
                            rules={{required: 'Title is required!'}}
                />
            </FieldWrapper>

            <Header text="Puissance" className="big-mt"/>

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

            <FieldWrapper label="Boite de vitesse">
                <RadioInput
                    name="engine"
                    options={RadioChoicesEngine}
                    control={control}
                    errors={errors}
                    rules={{required: 'Title is required!'}}
                />
            </FieldWrapper>

            <FieldWrapper label="Classe d'émission">
                <RadioInput
                    name="emission"
                    options={RadioChoicesEmission}
                    control={control}
                    errors={errors}
                    // rules={{required: 'Title is required!'}}
                />
            </FieldWrapper>

            <Header text="Consommation" className="big-mt"/>

            <FieldWrapper label="Mixte">
                <NumberInput
                    name="consumption.mixt"
                    control={control}
                    errors={errors}
                    // rules={{required: 'Title is required!'}}
                />
            </FieldWrapper>

            <FieldWrapper label="Ville">
                <NumberInput
                    name="consumption.city"
                    control={control}
                    errors={errors}
                    // rules={{required: 'Title is required!'}}
                />
            </FieldWrapper>

            <FieldWrapper label="Route">
                <NumberInput
                    name="consumption.road"
                    control={control}
                    errors={errors}
                    // rules={{required: 'Title is required!'}}
                />
            </FieldWrapper>

            <FieldWrapper label="CO2">
                <NumberInput
                    name="consumption.gkm"
                    control={control}
                    errors={errors}
                    // rules={{required: 'Title is required!'}}
                />
            </FieldWrapper>

            <Header text="Données du véhicule" className="big-mt"/>

            <FieldWrapper label="Nombre de portes">
                <SelectInput
                    name="doors"
                    options={SelectChoicesDoors}
                    placeholder="Select number of doors"
                    control={control}
                    errors={errors}
                    // rules={{required: 'Title is required!'}}
                />
            </FieldWrapper>

            <FieldWrapper label="Nombre de places">
                <SelectInput
                    name="seats"
                    options={SelectOptionsUtils([2, 3, 4, 5])}
                    placeholder="Select number of seats"
                    control={control}
                    errors={errors}
                    // rules={{required: 'Title is required!'}}
                />
            </FieldWrapper>

            <FieldWrapper label="Equipements">
                <CheckboxMultipleInput
                    name="equipments"
                    options={CheckboxOptionsEquipments}
                    defaultChecked={["ABS", "ESP"]}
                    control={control}
                    errors={errors}
                    // rules={{required: 'Title is required!'}}
                />
            </FieldWrapper>

            <FieldWrapper label="Matériaux">
                <CheckboxMultipleInput
                    name="materials"
                    options={RadioChoicesPaints}
                    control={control}
                    errors={errors}
                    rules={{required: 'Title is required!'}}
                />
            </FieldWrapper>

            <FieldWrapper label="Peinture">
                <RadioInput
                    name="paint"
                    options={RadioChoicesPaints}
                    control={control}
                    errors={errors}
                    // rules={{required: 'Title is required!'}}
                />
            </FieldWrapper>

            <FieldWrapper label="Couleur extérieure">
                <RadioInput
                    name="externalColor"
                    options={RadioChoicesExternalColor}
                    control={control}
                    errors={errors}
                    // rules={{required: 'Title is required!'}}
                />
            </FieldWrapper>

            <FieldWrapper label="Couleur intérieure">
                <RadioInput
                    name="internalColor"
                    options={RadioChoicesExternalColor}
                    control={control}
                    errors={errors}
                    // rules={{required: 'Title is required!'}}
                />
            </FieldWrapper>

            <StepNavigation prev={prevStep} submit />
        </form>
    );
};

export default Step1_CarDetails;
