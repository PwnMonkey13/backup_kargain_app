import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import Header from '../../Header';
import FieldWrapper from '../../Form/FieldWrapper';
import StepNavigation from '../../Form/StepNavigation';
import { SelectInput, TextareaInput } from '../../Form/Inputs';
import { RadioVehicleGeneralState } from '../moto/form.data';
import TagsControlled from '../../Tags/TagsControlled';
import { FormContext } from '../../../context/FormContext';
import { SelectOptionsUtils } from '../../../libs/formFieldsUtils';
import DamageSelectorControlledCar from '../../Damages/DamageSelectorControlledCar';

const Step = ({ onSubmitStep, prevStep, nextStep }) => {
    const { formDataContext } = useContext(FormContext);
    const { watch, control, errors, setValue, getValues, register, formState, handleSubmit } = useForm({
        mode: 'onChange',
        validateCriteriaMode: 'all',
        defaultValues: formDataContext,
    });

    return (
        <form className="form_wizard" onSubmit={handleSubmit(onSubmitStep)}>
            <button type="button" onClick={() => console.log(getValues())}>CLICK</button>
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

            <FieldWrapper label="Tags">
                <TagsControlled
                    name="tags"
                    control={control}
                    errors={errors}
                />
            </FieldWrapper>

            <DamageSelectorControlledCar
                name="damages"
                control={control}
                defaultValues={getValues().damages}
            />

            <StepNavigation prev={prevStep} submit/>
        </form>
    );
};

export default Step;
