import React, { useContext, useEffect, useRef, useState } from 'react';
import { Col, Row } from 'reactstrap';
import { useForm } from 'react-hook-form';
import useTranslation from 'next-translate/useTranslation';
import FieldWrapper from '../../Form/FieldWrapper';
import StepNavigation from '../../Form/StepNavigation';
import { NumberInput, SelectInput } from '../../Form/Inputs';
import { SelectOptionsUtils } from '../../../libs/formFieldsUtils';
import { FormContext } from '../../../context/FormContext';
import Header from '../../Header';
import {
    RadioChoicesEngine,
    RadioChoicesExternalColor,
    RadioChoicesGas,
    RadioChoicesMaterials,
    RadioChoicesPaints
} from './form.data.js';

const Step1UtilityDetails = ({ onSubmitStep, prevStep, nextStep }) => {
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
        RadioChoicesExternalColor: []
    });

    const { control, errors, handleSubmit } = useForm({
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
                    <FieldWrapper label={t('vehicles:vehicle_function')}>
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
                            name="cylinder"
                            control={control}
                            errors={errors}
                        />
                    </FieldWrapper>
                </Col>
            </Row>

            <Row>
                <Col sm={12} md={6}>
                    <FieldWrapper label={t('vehicles:gas')}>
                        <SelectInput
                            name="vehicleEngineGas"
                            options={RadioChoicesGas}
                            control={control}
                            errors={errors}
                        />
                    </FieldWrapper>
                </Col>
                <Col sm={12} md={6}>
                    <FieldWrapper label={t('vehicles:gear-box')}>
                        <SelectInput
                            name="engine"
                            options={RadioChoicesEngine}
                            control={control}
                            errors={errors}
                            rules={{ required: 'Title is required!' }}
                        />
                    </FieldWrapper>
                </Col>
            </Row>

            <Row>
                <Col sm={12} md={6}>
                    <FieldWrapper label="Puissance kW">
                        <NumberInput name="powerKw"
                            control={control}
                            errors={errors}

                        />
                    </FieldWrapper>
                </Col>
                <Col sm={12} md={6}>
                    <FieldWrapper label="Puissance CH">
                        <NumberInput name="powerCh"
                            control={control}
                            errors={errors}
                        />
                    </FieldWrapper>
                </Col>
            </Row>

            <Header strong text={t('vehicles:consumption')}/>
            <Row>
                <Col sm={12} md={6}>
                    <FieldWrapper label={`${t('vehicles:consumption')} mixt`}>
                        <NumberInput
                            name="consumptionMixt"
                            control={control}
                            errors={errors}
                            placeholder="20 g/100"

                        />
                    </FieldWrapper>
                </Col>
                <Col sm={12} md={6}>
                    <FieldWrapper label={`${t('vehicles:consumption')} (g/km)`}>
                        <NumberInput
                            name="consumptionCity"
                            control={control}
                            errors={errors}
                            placeholder="20 g/100"
                        />
                    </FieldWrapper>
                </Col>
                <Col sm={12} md={6}>
                    <FieldWrapper label={`${t('vehicles:road')} (g/km)`}>
                        <NumberInput
                            name="consumptionRoad"
                            control={control}
                            errors={errors}
                            placeholder="20 g/100"

                        />
                    </FieldWrapper>
                </Col>
                <Col sm={12} md={6}>
                    <FieldWrapper label="CO2 (g/km)">
                        <NumberInput
                            name="consumptionGkm"
                            control={control}
                            errors={errors}
                            placeholder={0}

                        />
                    </FieldWrapper>
                </Col>
            </Row>

            <Row>
                <Col sm={12} md={6}>
                    <FieldWrapper label="Nombre d'essieux">
                        <SelectInput
                            name="vehicleEngineType"
                            className="mb-2"
                            options={RadioChoicesEngine}
                            control={control}
                            errors={errors}
                        />
                    </FieldWrapper>
                </Col>
                <Col sm={12} md={6}>
                    <FieldWrapper label="Cabines conducteur">
                        <SelectInput
                            name="driverCabin"
                            options={SelectOptionsUtils([2, 3, 4, 5])}
                            control={control}
                            errors={errors}
                        />
                    </FieldWrapper>
                </Col>
            </Row>

            <Row>
                <Col sm={12} md={6}>
                    <FieldWrapper label={t('vehicles:doors_quantity')}>
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
                    <FieldWrapper label={t('vehicles:seats_quantity')}>
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
                            options={RadioChoicesPaints}
                            control={control}
                            errors={errors}
                        />
                    </FieldWrapper>
                </Col>
                <Col sm={12} md={6}>
                    <FieldWrapper label={t('vehicles:materials')}>
                        <SelectInput
                            name="materials"
                            options={RadioChoicesMaterials}
                            control={control}
                            errors={errors}
                        />
                    </FieldWrapper>
                </Col>
                <Col sm={12} md={6}>
                    <FieldWrapper label={t('vehicles:external_color')}>
                        <SelectInput
                            name="externalColor"
                            options={RadioChoicesExternalColor}
                            control={control}
                            errors={errors}
                        />
                    </FieldWrapper>
                </Col>
                <Col sm={12} md={6}>
                    <FieldWrapper label={t('vehicles:internal_color')}>
                        <SelectInput
                            name="internalColor"
                            options={RadioChoicesExternalColor}
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

export default Step1UtilityDetails;
