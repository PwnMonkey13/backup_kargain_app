import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import useTranslation from 'next-translate/useTranslation';
import Header from '../../Header';
import FieldWrapper from '../../Form/FieldWrapper';
import StepNavigation from '../../Form/StepNavigation';
import { SelectInput, TextareaInput } from '../../Form/Inputs';
import { RadioVehicleGeneralState } from '../moto/form.data';
import TagsControlled from '../../Tags/TagsControlled';
import { FormContext } from '../../../context/FormContext';
import { SelectOptionsUtils } from '../../../libs/formFieldsUtils';
import DamageSelectorControlledCar from '../../Damages/DamageSelectorControlledCar';
import { CheckboxOptionsEquipments } from './form.data.js';

const Step = ({ onSubmitStep, prevStep, nextStep }) => {
    const { formDataContext } = useContext(FormContext);
    const { t } = useTranslation();
    const { watch, control, errors, setValue, getValues, register, formState, handleSubmit } = useForm({
        mode: 'onChange',
        validateCriteriaMode: 'all',
        defaultValues: formDataContext,
    });

    return (
        <form className="form_wizard" onSubmit={handleSubmit(onSubmitStep)}>
            <button type="button" onClick={() => console.log(getValues())}>CLICK</button>
            <Header text={t('vehicles:vehicle-state')}/>

            <FieldWrapper label={t('vehicles:vehicle-general-state')}>
                <SelectInput
                    name="vehicleGeneralState"
                    options={RadioVehicleGeneralState}
                    control={control}
                    errors={errors}
                />
            </FieldWrapper>

            <FieldWrapper label={t('vehicles:owners-quantity')}>
                <SelectInput
                    name="ownersCount"
                    options={SelectOptionsUtils([2, 3, 4, 5])}
                    placeholder="Select number of owners"
                    control={control}
                    errors={errors}
                />
            </FieldWrapper>

            <FieldWrapper label={t('vehicles:equipments')}>
                <SelectInput
                    name="equipments"
                    isMulti
                    options={CheckboxOptionsEquipments}
                    defaultChecked={['ABS', 'ESP']}
                    control={control}
                    errors={errors}
                />
            </FieldWrapper>

            <FieldWrapper label={t('vehicles:description')}>
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
