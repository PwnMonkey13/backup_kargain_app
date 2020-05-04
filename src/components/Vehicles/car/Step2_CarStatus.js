import React, { useEffect, useRef } from 'react';
import Header from '../../Header';
import { SelectInput, TextareaInput } from '../../Form/Inputs';
import StepNavigation from '../../Form/StepNavigation';
import { SelectOptionsUtils } from '../../../libs/formFieldsUtils';
import FieldWrapper from '../../Form/FieldWrapper';
import { RadioVehicleGeneralState } from '../moto/form.data';
import DamageSelectorTabs from '../../Damages/DamageSelectorTabs';
import damages from '../../../pages/dev/damages';
import TagsInput from '../../Tags/TagsInput';
import TagsControlled from '../../Tags/TagsControlled';

const Step = ({ methods, formConfig, onSubmitStep, prevStep, nextStep, ...props }) => {
    const formRef = useRef(null);
    const { watch, register, setValue, getValues, control, errors, handleSubmit } = methods;

    useEffect(() => {
        register({ name: 'damages' });
    }, []);

    return (
        <form className="form_wizard" onSubmit={handleSubmit(onSubmitStep)}>
            <button type="button" onClick={()=>console.log(getValues())}>CLICK</button>
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

            <TagsControlled
                name="tags"
                control={control}
                errors={errors}
            />

            <DamageSelectorTabs
                maxDamages={5}
                onChange={damages => {
                    setValue('damages', damages);
                }}
                tabs={[
                    {
                        title: 'Extérieur',
                        key: 'exterior',
                        alt: 'Vue extérieure du véhicule',
                        img: '/images/annotations-views/outside.png',
                        stages : getValues().damages && getValues().damages[0] && getValues().damages[0].stages
                    },
                    {
                        title: 'Intérieur',
                        key: 'interior',
                        alt: 'Vue intérieure du véhicule',
                        img: '/images/annotations-views/inside.png',
                        stages : getValues().damages && getValues().damages[1] && getValues().damages[1].stages
                    },
                ]}/>

            <StepNavigation prev={prevStep} submit/>
        </form>
    );
};

export default Step;
