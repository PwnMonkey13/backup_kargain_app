import React, { useRef, useContext } from 'react';
import { useForm } from 'react-hook-form';
import useTranslation from 'next-translate/useTranslation';
import Header from '../../Header';
import { RadioVehicleGeneralState } from './form.data.js';
import { SelectInput, TextareaInput } from '../../Form/Inputs';
import StepNavigation from '../../Form/StepNavigation';
import FieldWrapper from '../../Form/FieldWrapper';
import TagsControlled from '../../Tags/TagsControlled';
import { SelectOptionsUtils } from '../../../libs/formFieldsUtils';
import { FormContext } from '../../../context/FormContext';
import DamageSelectorControlled from '../../Damages/DamageSelectorControlled';

const Step = ({ onSubmitStep, prevStep }) => {
    const formRef = useRef(null);
    const { formDataContext } = useContext(FormContext);
    const { t } = useTranslation();
    const { control, errors, getValues, handleSubmit } = useForm({
        mode: 'onChange',
        validateCriteriaMode: 'all',
        defaultValues: formDataContext
    });

    return (
        <form className="form_wizard" ref={formRef} onSubmit={handleSubmit(onSubmitStep)}>
            <Header text="Etat du véhicule"/>

            <FieldWrapper label="Etat général">
                <SelectInput
                    name="vehicleGeneralState"
                    options={RadioVehicleGeneralState}
                    control={control}
                    rules={{ required: t('vehicles:field-is-required') }}
                    errors={errors}
                />
            </FieldWrapper>

            <FieldWrapper label="Nombre de propriétaires">
                <SelectInput
                    name="ownersCount"
                    options={SelectOptionsUtils([2, 3, 4, 5])}
                    placeholder="Select number of owners"
                    control={control}
                    rules={{ required: 'Field required' }}
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

            <FieldWrapper label="Tags">
                <TagsControlled
                    name="tags"
                    maxTags={20}
                    control={control}
                    errors={errors}
                />
            </FieldWrapper>

            <DamageSelectorControlled
                name="damages"
                vehicleType="moto"
                control={control}
                defaultValues={getValues().damages}
            />

            <StepNavigation prev={prevStep} submit/>
        </form>
    );
};

export default Step;
