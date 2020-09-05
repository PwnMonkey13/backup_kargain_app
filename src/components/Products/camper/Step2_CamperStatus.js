import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useTranslation from 'next-translate/useTranslation';
import Header from '../../Header';
import StepNavigation from '../../Form/StepNavigation';
import FieldWrapper from '../../Form/FieldWrapper';
import { SelectInput, TextareaInput } from '../../Form/Inputs';
import { SelectOptionsUtils } from '../../../libs/formFieldsUtils';
import { RadioVehicleGeneralState } from '../moto/form.data';
import TagsControlled from '../../Tags/TagsControlled';
import { FormContext } from '../../../context/FormContext';
import DamageSelectorControlled from '../../Damages/DamageSelectorControlled';

const Step = ({ onSubmitStep, prevStep }) => {
    const { formDataContext } = useContext(FormContext);
    const { t, lang } = useTranslation();
    const [formData, setFormData] = useState({
        RadioVehicleGeneralState: [],
        CheckboxOptionsEquipments: []
    });
    const { control, errors, getValues, handleSubmit } = useForm({
        mode: 'onChange',
        validateCriteriaMode: 'all',
        defaultValues: formDataContext
    });

    const getData = async () => {
        const data = lang === 'fr' ? await import('./form.data.js') : await import('./form.data_en.js');
        setFormData(data);
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <form className="form_wizard" onSubmit={handleSubmit(onSubmitStep)}>
            <Header text={t('vehicles:vehicle-state')}/>

            <FieldWrapper label={t('vehicles:vehicle_general_state')}>
                <SelectInput
                    name="vehicleGeneralState"
                    options={RadioVehicleGeneralState}
                    control={control}
                    errors={errors}
                />
            </FieldWrapper>

            <FieldWrapper label={t('vehicles:owners_quantity')}>
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
                    options={formData.CheckboxOptionsEquipments}
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

            <DamageSelectorControlled
                name="damages"
                // vehicleType="camper"
                control={control}
                defaultValues={getValues().damages}
            />

            <StepNavigation prev={prevStep} submit/>
        </form>
    );
};

export default Step;
