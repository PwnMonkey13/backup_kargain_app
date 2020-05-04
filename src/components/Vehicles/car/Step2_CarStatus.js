import React, { useEffect, useRef } from 'react';
import Header from '../../Header';
import { SelectInput, TextareaInput } from '../../Form/Inputs';
import StepNavigation from '../../Form/StepNavigation';
import { SelectOptionsUtils } from '../../../libs/formFieldsUtils';
import FieldWrapper from '../../Form/FieldWrapper';
import { RadioVehicleGeneralState } from '../moto/form.data';
import DamageSelectorTabs from '../DamageSelectorTabs';
import damages from '../../../pages/dev/damages';

const Step = ({ methods, formConfig, onSubmitStep, prevStep, nextStep, ...props }) => {
    const formRef = useRef(null)
    const { watch, getValues, control, errors, handleSubmit } = methods

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
                    name="ownersCount"
                    options={SelectOptionsUtils([2, 3, 4, 5])}
                    placeholder="Select number of owners"
                    control={control}
                    errors={errors}
                />
            </FieldWrapper>

            <FieldWrapper label="Description">
                <TextareaInput
                    name="description"
                    control={control}
                    errors={errors}
                />
            </FieldWrapper>

            <p> TODO TAGS </p>

            <DamageSelector
                maxDamages={5}
                tabs={[
                {
                    title: 'Extérieur',
                    key : 'exterior',
                    alt: 'Vue extérieure du véhicule',
                    img: '/images/annotations-views/outside.png'
                },
                {
                    title: 'Intérieur',
                    key : 'interior',
                    alt: 'Vue intérieure du véhicule',
                    img: '/images/annotations-views/inside.png'
                }
            ]}/>

            <StepNavigation prev={prevStep} submit/>
        </form>
    );
};

export default Step;
