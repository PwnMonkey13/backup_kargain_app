import React, { useContext, useRef } from 'react';
import { Col, Row } from 'reactstrap';
import { useForm } from 'react-hook-form';
import Header from '../../Header';
import { NumberInput, SelectInput } from '../../Form/Inputs';
import StepNavigation from '../../Form/StepNavigation';
import FieldWrapper from '../../Form/FieldWrapper';
import { SelectOptionsUtils } from '../../../libs/formFieldsUtils';
import { RadioFunctionVehicle } from '../moto/form.data';
import { FormContext } from '../../../context/FormContext';
import {
    CheckboxOptionsEquipments,
    RadioChoicesEmission,
    RadioChoicesEngine,
    RadioChoicesExternalColor,
    RadioChoicesGas,
    RadioChoicesMaterials,
    RadioChoicesPaints,
    RadioTypeFunction,
} from './form.data.js';

const Step1CarDetails = ({ onSubmitStep, prevStep, nextStep }) => {
    const formRef = useRef(null);
    const { formDataContext } = useContext(FormContext);
    const { watch, control, errors, setValue, getValues, register, formState, handleSubmit } = useForm({
        mode: 'onChange',
        validateCriteriaMode: 'all',
        defaultValues: formDataContext
    });

    return (
        <form className="form_wizard" ref={formRef} onSubmit={handleSubmit(onSubmitStep)}>
            <Row>
                <Col>
                    <FieldWrapper label="Type">
                        <SelectInput name="vehicleFunctionType"
                                     options={RadioTypeFunction}
                                     control={control}
                                     errors={errors}
                        />
                    </FieldWrapper>
                </Col>
                <Col>
                    <FieldWrapper label="Fonction du véhicule">
                        <SelectInput
                            name="vehicleFunction"
                            options={RadioFunctionVehicle}
                            control={control}
                            errors={errors}
                        />
                    </FieldWrapper>
                </Col>
            </Row>

            <Row>
                <Col>
                    <FieldWrapper label="Kilométrage" required>
                        <NumberInput name="mileage"
                                     placeholder="20000 km"
                                     control={control}
                                     errors={errors}

                        />
                    </FieldWrapper>
                </Col>
                <Col>
                    <FieldWrapper label="Cylindrée">
                        <NumberInput name="vehicleEngine.cylinder"
                                     control={control}
                                     errors={errors}
                                     placeholder="150 ch"

                        />
                    </FieldWrapper>
                </Col>
            </Row>

            <Row>
                <Col>
                    <FieldWrapper label="Carburant" required>
                        <SelectInput name="vehicleEngine.gas"
                                     options={RadioChoicesGas}
                                     control={control}
                                     errors={errors}
                        />
                    </FieldWrapper>
                </Col>
                <Col>
                    <FieldWrapper label="Boite de vitesse">
                        <SelectInput
                            name="vehicleEngine.type"
                            options={RadioChoicesEngine}
                            control={control}
                            errors={errors}
                        />
                    </FieldWrapper>
                </Col>
            </Row>

            <Row>
                <Col>
                    <FieldWrapper label="Puissance kW">
                        <NumberInput name="power.kw"
                                     control={control}
                                     errors={errors}
                                     placeholder={0}


                        />
                    </FieldWrapper>
                </Col>
                <Col>
                    <FieldWrapper label="Puissance CH">
                        <NumberInput name="power.ch"
                                     control={control}
                                     errors={errors}
                                     placeholder={0}
                        />
                    </FieldWrapper>
                </Col>
            </Row>

            <Header strong text="Consommation"/>
            <Row>
                <Col>
                    <FieldWrapper label="Mixte (g/km)">
                        <NumberInput
                            name="consumption.mixt"
                            control={control}
                            errors={errors}
                            placeholder="20 g/100"

                        />
                    </FieldWrapper>
                </Col>
                <Col>
                    <FieldWrapper label="Ville (g/km)">
                        <NumberInput
                            name="consumption.city"
                            control={control}
                            errors={errors}
                            placeholder="20 g/100"

                        />
                    </FieldWrapper>
                </Col>
                <Col>
                    <FieldWrapper label="Route (g/km)">
                        <NumberInput
                            name="consumption.road"
                            control={control}
                            errors={errors}
                            placeholder="20 g/100"

                        />
                    </FieldWrapper>
                </Col>
                <Col>
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
                <Col>
                    <FieldWrapper label="Classe d'émission">
                        <SelectInput
                            name="emission"
                            options={RadioChoicesEmission}
                            control={control}
                            errors={errors}
                        />
                    </FieldWrapper>
                </Col>
                <Col>
                    <FieldWrapper label="Equipements">
                        <SelectInput
                            name="equipments"
                            isMulti
                            options={CheckboxOptionsEquipments}
                            defaultChecked={['ABS', 'ESP']}
                            control={control}
                            errors={errors}
                        />
                    </FieldWrapper>
                </Col>
            </Row>

            <Header text="Données du véhicule"/>
            <Row>
                <Col>
                    <FieldWrapper label="Nombre de portes">
                        <SelectInput
                            name="doors"
                            options={SelectOptionsUtils([2, 3, 4, 5])}
                            placeholder="Select number of doors"
                            control={control}
                            errors={errors}
                        />
                    </FieldWrapper>
                </Col>
                <Col>
                    <FieldWrapper label="Nombre de places">
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
                <Col>
                    <FieldWrapper label="Peinture">
                        <SelectInput
                            name="paint"
                            options={RadioChoicesPaints}
                            control={control}
                            errors={errors}
                        />
                    </FieldWrapper>
                </Col>
                <Col>
                    <FieldWrapper label="Matériaux">
                        <SelectInput
                            name="materials"
                            isMulti
                            options={RadioChoicesMaterials}
                            control={control}
                            errors={errors}
                        />
                    </FieldWrapper>
                </Col>
                <Col>
                    <FieldWrapper label="Couleur extérieure">
                        <SelectInput
                            name="externalColor"
                            options={RadioChoicesExternalColor}
                            control={control}
                            errors={errors}
                        />
                    </FieldWrapper>
                </Col>
                <Col>
                    <FieldWrapper label="Couleur intérieure">
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

export default Step1CarDetails;
