import React, {useRef, useContext} from 'react';
import {useForm} from "react-hook-form";
import Header from "../../../Header";
import {CheckboxMultipleInput, GroupInputs, NumberInput, RadioInput, SelectInput, TextInput} from "../../Inputs";
import useIsMounted from "../../../../hooks/useIsMounted";
import {
    CheckboxOptionsEquipments,
    RadioCategoryChoices,
    RadioChoicesEmission,
    RadioChoicesEngine, RadioChoicesExternalColor, RadioChoicesPaints,
    RadioTypeChoices, SelectChoicesDoors
} from "../../../../libs/fieldsOptions";
import StepNavigation from "../../StepNavigation";
import {SelectOptionsUtils} from "../../../../libs/formFieldsUtils";
import FormStepDebug from "../../../FormStepDebug";

const CarDetailsStep = ({formConfig, onSubmitStep, prevStep, nextStep, ...props}) => {
    const isMountRef = useIsMounted();
    const formRef = useRef(null);
    const {watch, control, errors, formState, getValues, register, handleSubmit} = useForm(formConfig);

    return (
        <form className="form_wizard" ref={formRef} onSubmit={handleSubmit(onSubmitStep)}>
            <Header as="h3" text="Données du véhicule" className="big-mt"/>
            <RadioInput label="Classe d'émission"
                        name="emission"
                        options={RadioChoicesEmission}
                        register={register}
                        errors={errors}
            />

            <GroupInputs as="h4" title="Consommation">
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

            </GroupInputs>
            <CheckboxMultipleInput label="Equipements"
                                   name="equipments"
                                   options={CheckboxOptionsEquipments}
                                   register={register}
                                   defaultChecked={["ABS", "ESP"]}
                                   errors={errors}
            />

            <RadioInput label="Couleur extérieure"
                        name="externalColor"
                        options={RadioChoicesExternalColor}
                        register={register}
                        errors={errors}
            />

            <RadioInput label="Peinture"
                        name="paint"
                        options={RadioChoicesPaints}
                        register={register}
                        errors={errors}
            />

            <SelectInput
                label="Nombre de portes"
                name="doors"
                options={SelectChoicesDoors}
                placeholder="Select number of doors"
                control={control}
                errors={errors}
            />

            <RadioInput label="Couleur intérieure"
                        name="internalColor"
                        options={RadioChoicesExternalColor}
                        register={register}
                        errors={errors}
            />

            <CheckboxMultipleInput
                label="Matériaux"
                name="materials"
                options={RadioChoicesPaints}
                register={register}
                errors={errors}
            />

            <SelectInput
                label="Nombre de places"
                name="seats"
                options={SelectOptionsUtils([2, 3, 4, 5])}
                placeholder="Select number of seats"
                control={control}
                errors={errors}
            />
            <StepNavigation prev={prevStep} submit />
            <FormStepDebug getValues={getValues} formState={formState} errors={errors}/>
        </form>
    );
};

export default CarDetailsStep;
