import React, {useRef, useContext} from 'react';
import Header from "../../../Header";
import {FieldWrapper, NumberInput, RadioInput, SelectInput, TextareaInput} from "../../Inputs";
import {RadioChoicesVehicle} from "../../../../libs/fieldsOptions";
import StepNavigation from "../../StepNavigation";
import {SelectOptionsUtils} from "../../../../libs/formFieldsUtils";

const CarDetailsStep = ({methods, formConfig, onSubmitStep, prevStep, nextStep, ...props}) => {
    const {watch, control, errors, getValues, register, formState, handleSubmit} = methods;

    return (
        <form className="form_wizard" onSubmit={handleSubmit(onSubmitStep)}>
            <h2> Informations détaillées sur le véhicle </h2>
            <Header as="h3" text="Données du véhicule" className="big-mt"/>
            <Header as="h3" text="Etat du véhicule" className="big-mt"/>

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


            <Header as="h3" text="A propos" className="big-mt"/>

            <FieldWrapper label="Description">
                <TextareaInput
                    name="description"
                    control={control}
                    rules={{ required: "Field required" }}
                    errors={errors}
                />
            </FieldWrapper>

            <Header as="h3" text="Fiches techniques" className="big-mt"/>

            <Header as="h3" text="Données du vendeur" className="big-mt"/>

            <FieldWrapper>
                <SelectInput
                    label="Pays"
                    name="seller[country]"
                    options={[]}
                    placeholder="Select number of seats"
                    control={control}
                    errors={errors}
                />

                <NumberInput label="Ville ou code postal" name="seller[postalcode]"/>
                <NumberInput label="Numéro de téléphone" name="seller[phone]" nicename="Tel"/>
            </FieldWrapper>

            <StepNavigation prev={prevStep} submitLabel="Créer mon annonce" submit />
        </form>
    );
};

export default CarDetailsStep;
