import React, { useContext, useEffect, useRef, useState } from 'react';
import { Col, Row } from 'reactstrap';
import { useForm } from 'react-hook-form';
import useTranslation from 'next-translate/useTranslation';
import Header from '../../Header';
import { NumberInput, SelectInput } from '../../Form/Inputs';
import StepNavigation from '../../Form/StepNavigation';
import FieldWrapper from '../../Form/FieldWrapper';
import { SelectOptionsUtils } from '../../../libs/formFieldsUtils';
import { FormContext } from '../../../context/FormContext';

const Step1CarDetails = ({ onSubmitStep, prevStep, nextStep }) => {
    const formRef = useRef(null);
    const { formDataContext } = useContext(FormContext);
    const { t, lang } = useTranslation();
    const [formData, setFormData] = useState({
        RadioVehicleGeneralState: [],
        CheckboxOptionsEquipments: [],
        RadioChoicesGas: [],
        RadioFunctionVehicle: [],
        RadioTypeFunction: [],
        RadioChoicesEngine: [],
        RadioChoicesEmission: [],
        RadioChoicesPaints: [],
        RadioChoicesMaterials: [],
        RadioChoicesExternalColor: [],
    });
    const { control, errors, handleSubmit } = useForm({
        mode: 'onChange',
        validateCriteriaMode: 'all',
        defaultValues: formDataContext,
    });

    const getData = async () => {
        const data = lang === 'fr' ? await import('./form.data.js') : await import('./form.data_en.js');
        setFormData(data);
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <form className="form_wizard" ref={formRef} onSubmit={handleSubmit(onSubmitStep)}>
            <Row>
                <Col sm={12} md={6}>
                    <FieldWrapper label={t('vehicles:type')}>
                        <SelectInput
                            name="vehicleFunctionType"
                            options={formData.RadioTypeFunction}
                            control={control}
                            errors={errors}
                        />
                    </FieldWrapper>
                </Col>
                <Col sm={12} md={6}>
                    <FieldWrapper label={t('vehicles:vehicle-function')}>
                        <SelectInput
                            name="vehicleFunction"
                            options={formData.RadioFunctionVehicle}
                            control={control}
                            errors={errors}
                        />
                    </FieldWrapper>
                </Col>
            </Row>

            <Row>
                <Col sm={12} md={6}>
                    <FieldWrapper label={t('vehicles:mileage')}>
                        <NumberInput
                            name="mileage"
                            placeholder="20000 km"
                            control={control}
                            errors={errors}
                        />
                    </FieldWrapper>
                </Col>
                <Col sm={12} md={6}>
                    <FieldWrapper label={t('vehicles:cylinder')}>
                        <NumberInput
                            name="vehicleEngine.cylinder"
                            control={control}
                            errors={errors}
                            placeholder="150 ch"
                        />
                    </FieldWrapper>
                </Col>
            </Row>

            <Row>
                <Col sm={12} md={6}>
                    <FieldWrapper label={t('vehicles:gas')}>
                        <SelectInput
                            name="vehicleEngine.gas"
                            options={formData.RadioChoicesGas}
                            control={control}
                            errors={errors}
                        />
                    </FieldWrapper>
                </Col>
                <Col sm={12} md={6}>
                    <FieldWrapper label={t('vehicles:gear-box')}>
                        <SelectInput
                            name="vehicleEngine.type"
                            options={formData.RadioChoicesEngine}
                            control={control}
                            errors={errors}
                        />
                    </FieldWrapper>
                </Col>
            </Row>

            <Row>
                <Col sm={12} md={6}>
                    <FieldWrapper label={t('vehicles:power')}>
                        <NumberInput
                            name="power.kw"
                            control={control}
                            errors={errors}
                            placeholder={0}
                        />
                    </FieldWrapper>
                </Col>
                <Col sm={12} md={6}>
                    <FieldWrapper label="Puissance CH">
                        <NumberInput
                            name="power.ch"
                            control={control}
                            errors={errors}
                            placeholder={0}
                        />
                    </FieldWrapper>
                </Col>
            </Row>

            <Header strong text={t('vehicles:consumption')}/>
            <Row>
                <Col sm={12} md={6}>
                    <FieldWrapper label={`${t('vehicles:consumption')} mixt`}>
                        <NumberInput
                            name="consumption.mixt"
                            control={control}
                            errors={errors}
                            placeholder="20 g/100"

                        />
                    </FieldWrapper>
                </Col>
                <Col sm={12} md={6}>
                    <FieldWrapper label={`${t('vehicles:consumption')} (g/km)`}>
                        <NumberInput
                            name="consumption.city"
                            control={control}
                            errors={errors}
                            placeholder="20 g/100"
                        />
                    </FieldWrapper>
                </Col>
                <Col sm={12} md={6}>
                    <FieldWrapper label={`${t('vehicles:road')} (g/km)`}>
                        <NumberInput
                            name="consumption.road"
                            control={control}
                            errors={errors}
                            placeholder="20 g/100"

                        />
                    </FieldWrapper>
                </Col>
                <Col sm={12} md={6}>
                    <FieldWrapper label="CO2 (g/km)">
                        <NumberInput
                            name="consumption.gkm"
                            control={control}
                            errors={errors}
                            placeholder={0}

                        />
                    </FieldWrapper>
                </Col>
            </Row>

            <Row>
                <Col sm={12} md={6}>
                    <FieldWrapper label={t('vehicles:class-emission')}>
                        <SelectInput
                            name="emission"
                            options={formData.RadioChoicesEmission}
                            control={control}
                            errors={errors}
                        />
                    </FieldWrapper>
                </Col>
            </Row>

            <Header text={t('vehicles:vehicle-informations')}/>
            <Row>
                <Col sm={12} md={6}>
                    <FieldWrapper label={t('vehicles:doors-quantity')}>
                        <SelectInput
                            name="doors"
                            options={SelectOptionsUtils([2, 3, 4, 5])}
                            placeholder="Select number of doors"
                            control={control}
                            errors={errors}
                        />
                    </FieldWrapper>
                </Col>
                <Col sm={12} md={6}>
                    <FieldWrapper label={t('vehicles:seats-quantity')}>
                        <SelectInput
                            name="seats"
                            options={SelectOptionsUtils([2, 3, 4, 5])}
                            placeholder="Select number of seats"
                            control={control}
                            errors={errors}
                        />
                    </FieldWrapper>
                </Col>
            </Row>

            <Row>
                <Col sm={12} md={6}>
                    <FieldWrapper label={t('vehicles:paint')}>
                        <SelectInput
                            name="paint"
                            options={formData.RadioChoicesPaints}
                            control={control}
                            errors={errors}
                        />
                    </FieldWrapper>
                </Col>
                <Col sm={12} md={6}>
                    <FieldWrapper label={t('vehicles:materials')}>
                        <SelectInput
                            name="materials"
                            isMulti
                            options={formData.RadioChoicesMaterials}
                            control={control}
                            errors={errors}
                        />
                    </FieldWrapper>
                </Col>
                <Col sm={12} md={6}>
                    <FieldWrapper label={t('vehicles:external-color')}>
                        <SelectInput
                            name="externalColor"
                            options={formData.RadioChoicesExternalColor}
                            control={control}
                            errors={errors}
                        />
                    </FieldWrapper>
                </Col>
                <Col sm={12} md={6}>
                    <FieldWrapper label={t('vehicles:internal-color')}>
                        <SelectInput
                            name="internalColor"
                            options={formData.RadioChoicesExternalColor}
                            control={control}
                            errors={errors}
                        />
                    </FieldWrapper>
                </Col>
            </Row>
            <StepNavigation prev={prevStep} submit/>
        </form>
    );
};

export default Step1CarDetails;
