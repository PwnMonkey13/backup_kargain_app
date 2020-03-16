import React, {useRef, useContext} from 'react';
import Header from "../../../Header";
import {FieldWrapper, CheckboxMultipleInput, NumberInput, RadioInput, SelectInput} from "../../Inputs";
import { CheckboxOptionsEquipments, RadioChoicesEmission, RadioChoicesExternalColor, RadioChoicesPaints, SelectChoicesDoors } from "../../../../libs/fieldsOptions";
import StepNavigation from "../../StepNavigation";
import {SelectOptionsUtils} from "../../../../libs/formFieldsUtils";
import FormStepDebug from "../../../FormStepDebug";

const CarDetailsStep = ({methods, formConfig, onSubmitStep, prevStep, nextStep, ...props}) => {
    const formRef = useRef(null);
    const {watch, control, errors, getValues, register, formState, handleSubmit} = methods;

    return (
        <form className="form_wizard" ref={formRef} onSubmit={handleSubmit(onSubmitStep)}>
            <h2> Informations de base sur le véhicle </h2>
            <Header as="h3" text="Données du véhicule" className="big-mt"/>

            <FieldWrapper label="Classe d'émission">
                <RadioInput
                    name="emission"
                    options={RadioChoicesEmission}
                    register={register}
                    errors={errors}
                />
            </FieldWrapper>

            <FieldWrapper label="Consommation">
                <NumberInput label="Mixte"
                             name="consumption[mixt]"
                             register={register}
                             errors={errors}
                />

                <NumberInput label="Ville"
                             name="consumption[city]"
                             register={register}
                             errors={errors}
                />

                <NumberInput label="Route"
                             name="consumption[road]"
                             register={register}
                             errors={errors}
                />

                <NumberInput label="CO2"
                             name="consumption[gkm]"
                             register={register}
                             errors={errors}
                />
            </FieldWrapper>

            <FieldWrapper label="Equipements">
                <CheckboxMultipleInput
                       name="equipments"
                       options={CheckboxOptionsEquipments}
                       register={register}
                       defaultChecked={["ABS", "ESP"]}
                       errors={errors}
                />
            </FieldWrapper>

            <FieldWrapper label="Couleur extérieure">
                <RadioInput
                            name="externalColor"
                            options={RadioChoicesExternalColor}
                            register={register}
                            errors={errors}
                />
            </FieldWrapper>

            <FieldWrapper label="Peinture">
                <RadioInput
                            name="paint"
                            options={RadioChoicesPaints}
                            register={register}
                            errors={errors}
                />
            </FieldWrapper>

            <FieldWrapper label="Nombre de portes">
                <SelectInput
                    name="doors"
                    options={SelectChoicesDoors}
                    placeholder="Select number of doors"
                    control={control}
                    errors={errors}
                />
            </FieldWrapper>

            <FieldWrapper label="Couleur intérieure">
                <RadioInput
                            name="internalColor"
                            options={RadioChoicesExternalColor}
                            register={register}
                            errors={errors}
                />
            </FieldWrapper>

            <FieldWrapper label="Matériaux">
                <CheckboxMultipleInput
                    name="materials"
                    options={RadioChoicesPaints}
                    register={register}
                    errors={errors}
                />
            </FieldWrapper>

            <FieldWrapper label="Nombre de places">
                <SelectInput
                    label="Nombre de places"
                    name="seats"
                    options={SelectOptionsUtils([2, 3, 4, 5])}
                    placeholder="Select number of seats"
                    control={control}
                    errors={errors}
                />
            </FieldWrapper>

            <StepNavigation prev={prevStep} submit />
            <FormStepDebug getValues={getValues} formState={formState} errors={errors}/>
        </form>
    );
};

export default CarDetailsStep;
