import React, {useRef, useContext} from 'react';
import {NumberInput, RadioInput, SelectInput, TextareaInput } from "../../Inputs";
import {RadioChoicesVehicle} from "../../../../libs/fieldsOptions";
import StepNavigation from "../../StepNavigation";
import {SelectOptionsUtils} from "../../../../libs/formFieldsUtils";
import GroupInputs from "../../GroupInputs";
import FieldWrapper from "../../FieldWrapper";

const CarDetailsStep = ({methods, formConfig, onSubmitStep, prevStep, nextStep, ...props}) => {
    const {watch, control, errors, getValues, register, formState, handleSubmit} = methods;

    return (
        <form className="form_wizard" onSubmit={handleSubmit(onSubmitStep)}>

            <FieldWrapper label="Etat général">
                <RadioInput
                    name="vehicleState"
                    options={RadioChoicesVehicle}
                    register={register({ required: 'Title is required' })}
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

            <GroupInputs label="Informations sur le vendeur" labelTop vertical>
                <FieldWrapper label="Pays">
                    <SelectInput
                        name="seller.country"
                        options={[]}
                        placeholder="Select number of seats"
                        control={control}
                        errors={errors}
                    />
                </FieldWrapper>

                <FieldWrapper label="Ville ou code postal">
                    <NumberInput
                        name="seller.postalcode"
                        errors={errors}
                        register={register({ required: 'Title is required' })}
                    />
                </FieldWrapper>

                <FieldWrapper label="Numéro de téléphone">
                    <NumberInput
                        name="seller.phone"
                        errors={errors}
                        register={register({ required: 'Title is required' })}
                    />
                </FieldWrapper>
            </GroupInputs>

            <StepNavigation prev={prevStep} submitLabel="Créer mon annonce" submit />
        </form>
    );
};

export default CarDetailsStep;
