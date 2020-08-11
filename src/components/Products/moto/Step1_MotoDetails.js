import React, { useContext, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Col, Row } from 'reactstrap';
import useTranslation from 'next-translate/useTranslation';
import FieldWrapper from '../../Form/FieldWrapper';
import { NumberInput, SelectInput } from '../../Form/Inputs';
import StepNavigation from '../../Form/StepNavigation';
import { RadioChoicesEmission, RadioChoicesGas } from '../car/form.data';
import { FormContext } from '../../../context/FormContext';
import Header from '../../Header';
import {
    CheckboxOptionsEquipments,
    RadioChoicesEngine,
    RadioChoicesExternalColor,
    RadioChoicesMaterials,
    RadioChoicesPaints,
    RadioFunctionVehicle,
    RadioTypeFunction
} from './form.data.js';

const Step1MotoDetails = ({ onSubmitStep, prevStep, nextStep }) => {
    const formRef = useRef(null);
    const { formDataContext } = useContext(FormContext);
    const { t } = useTranslation();
    const { control, errors, handleSubmit } = useForm({
        mode: 'onChange',
        validateCriteriaMode: 'all',
        defaultValues: formDataContext
    });

    return (
        <form className="form_wizard" ref={formRef} onSubmit={handleSubmit(onSubmitStep)}>
            <Row>
                <Col sm={12} md={6}>
                    <FieldWrapper label="Type">
                        <SelectInput name="vehicleFunctionType"
                            control={control}
                            errors={errors}
                            options={RadioTypeFunction}
                        />
                    </FieldWrapper>
                </Col>
                <Col sm={12} md={6}>
                    <FieldWrapper label="Fonction du véhicule">
                        <SelectInput
                            name="vehicleFunction"
                            options={RadioFunctionVehicle}
                            control={control}
                            rules={{ required: t('vehicles:field-is-required') }}
                            errors={errors}
                        />
                    </FieldWrapper>
                </Col>
            </Row>

            <Row>
                <Col sm={12} md={6}>
                    <FieldWrapper label="Kilométrage" required>
                        <NumberInput
                            name="mileage"
                            placeholder="20000 km"
                            control={control}
                            errors={errors}
                        />
                    </FieldWrapper>
                </Col>
                <Col sm={12} md={6}>
                    <FieldWrapper label="Cylindrée">
                        <NumberInput name="vehicleEngineCylinder"
                            control={control}
                            errors={errors}
                            placeholder="150 ch"

                        />
                    </FieldWrapper>
                </Col>
            </Row>

            <Row>
                <Col sm={12} md={6}>
                    <FieldWrapper label="Carburant" required>
                        <SelectInput name="vehicleEngineGas"
                            options={RadioChoicesGas}
                            control={control}
                            errors={errors}
                        />
                    </FieldWrapper>
                </Col>
                <Col sm={12} md={6}>
                    <FieldWrapper label="Boite de vitesse">
                        <SelectInput
                            name="vehicleEngineType"
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

            <Header strong text="Consommation"/>
            <Row>
                <Col sm={12} md={6}>
                    <FieldWrapper label="Mixte (g/km)">
                        <NumberInput
                            name="consumptionMixt"
                            control={control}
                            errors={errors}
                            placeholder="20 g/100"
                        />
                    </FieldWrapper>
                </Col>
                <Col sm={12} md={6}>
                    <FieldWrapper label="Ville (g/km)">
                        <NumberInput
                            name="consumptionCity"
                            control={control}
                            errors={errors}
                            placeholder="20 g/100"
                        />
                    </FieldWrapper>
                </Col>
                <Col sm={12} md={6}>
                    <FieldWrapper label="Route (g/km)">
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
                            placeholder="20 g/100"
                        />
                    </FieldWrapper>
                </Col>
            </Row>

            <FieldWrapper label="Classe d'émission">
                <SelectInput
                    name="emission"
                    options={RadioChoicesEmission}
                    control={control}
                    errors={errors}
                />
            </FieldWrapper>

            <Header text="Données du véhicule"/>

            <FieldWrapper label="Equipements">
                <SelectInput
                    name="equipments"
                    isMulti
                    options={CheckboxOptionsEquipments}
                    defaultChecked={['Topcase', 'Kickstarter']}
                    control={control}
                    errors={errors}
                />
            </FieldWrapper>

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
                    <FieldWrapper label={t('vehicles:external-color')}>
                        <SelectInput
                            name="externalColor"
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

export default Step1MotoDetails;
