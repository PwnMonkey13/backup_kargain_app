import React, {useRef, useContext} from 'react';
import {useForm} from "react-hook-form";
import Header from "../../../Header";
import {GroupInputs, NumberInput, RadioInput, SelectInput, TextareaInput, TextInput} from "../../Inputs";
import useIsMounted from "../../../../hooks/useIsMounted";
import {
    RadioCategoryChoices,
    RadioChoicesEngine,
    RadioChoicesVehicle,
    RadioTypeChoices
} from "../../../../libs/fieldsOptions";
import StepNavigation from "../../StepNavigation";
import {SelectOptionsUtils} from "../../../../libs/formFieldsUtils";
import ActiveLink from "../../../ActiveLink";

const CarDetailsStep = ({formConfig, onSubmitStep, prevStep, nextStep, ...props}) => {
    const isMountRef = useIsMounted();
    const formRef = useRef(null);
    const {watch, control, errors, getValues, register, handleSubmit} = useForm(formConfig);

    return (
        <form className="form_wizard" ref={formRef} onSubmit={handleSubmit(onSubmitStep)}>
            <Header as="h3" text="Données du véhicule" className="big-mt"/>
            <Header as="h3" text="Etat du véhicule" className="big-mt"/>

            <TextInput
                label="VIN"
                name="vin"
                placeholder="VIN number"
                register={register({ required: 'Title is required' })}
                errors={errors}
            />

            <RadioInput
                label="Etat général"
                name="vehicleState"
                options={RadioChoicesVehicle}
                register={register({ required: 'Title is required' })}
                errors={errors}
            />

            <SelectInput
                label="Nombre de propriétaires"
                name="owners"
                options={SelectOptionsUtils([2, 3, 4, 5])}
                placeholder="Select number of owners"
                control={control}
                rules={{ required: "Field required" }}
                errors={errors}
            />

            <SelectInput
                label="Véhicule accidenté"
                name="damages"
                options={SelectOptionsUtils([2, 3, 4, 5])}
                placeholder="Select number of damages"
                control={control}
                rules={{ required: "Field required" }}
                errors={errors}
            />

            <SelectInput
                label="Véhicule deffectueux"
                name="defective"
                options={SelectOptionsUtils([2, 3, 4, 5])}
                control={control}
                rules={{ required: "Field required" }}
                errors={errors}
            />

            <Header as="h3" text="A propos" className="big-mt"/>

            <TextareaInput label="Description" name="description"/>

            <Header as="h3" text="Fiches techniques" className="big-mt"/>

            <Header as="h3" text="Données du vendeur" className="big-mt"/>

            <GroupInputs as="h4" title="Consommation">
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
            </GroupInputs>

            <StepNavigation prev={prevStep} submitLabel="Créer mon annonce" submit />
        </form>
    );
};

export default CarDetailsStep;
