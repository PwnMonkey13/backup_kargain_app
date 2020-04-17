import React, { useRef } from 'react'
import Header from '../../Header'
import { CheckboxMultipleInput, NumberInput, RadioGroupInput, SelectInput, TextInput } from '../../Form/Inputs'
import {
    RadioTypeFunction,
    CheckboxOptionsEquipments,
    RadioChoicesGas,
    RadioChoicesEngine,
    RadioChoicesEmission,
    RadioChoicesExternalColor,
    RadioChoicesPaints,
    RadioChoicesMaterials
} from './form.data.js'
import StepNavigation from '../../Form/StepNavigation'
import FieldWrapper from '../../Form/FieldWrapper'
import { SelectOptionsUtils } from '../../../libs/formFieldsUtils'
import { Col, Row } from 'reactstrap'
import { RadioFunctionVehicle } from '../moto/form.data'

const Step1CamperDetails = ({ methods, formConfig, onSubmitStep, prevStep, nextStep, ...props }) => {
    const formRef = useRef(null)
    const { watch, control, errors, getValues, register, formState, handleSubmit } = methods

    return (
        <form className="form_wizard" ref={formRef} onSubmit={handleSubmit(onSubmitStep)}>

            <Row>
                <Col>
                    <FieldWrapper label="Type" required>
                        <SelectInput name="vehicleFunction"
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
                            rules={{ required: 'Title is required' }}
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
                        <NumberInput name="cylinder"
                            control={control}
                            errors={errors}
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
                <Col>
                    <FieldWrapper label="Puissance kW">
                        <NumberInput name="power.kw"
                            control={control}
                            errors={errors}

                        />
                    </FieldWrapper>
                </Col>
                <Col>
                    <FieldWrapper label="Puissance CH">
                        <NumberInput name="power.ch"
                            control={control}
                            errors={errors}
                        />
                    </FieldWrapper>
                </Col>
            </Row>

            <Header strong text="Consommation"/>
            <Row>
                <Col>
                    <FieldWrapper label="Mixte">
                        <NumberInput
                            name="consumption.mixt"
                            control={control}
                            errors={errors}
                        />
                    </FieldWrapper>
                </Col>
                <Col>
                    <FieldWrapper label="Ville">
                        <NumberInput
                            name="consumption.city"
                            control={control}
                            errors={errors}
                        />
                    </FieldWrapper>
                </Col>
                <Col>
                    <FieldWrapper label="Route">
                        <NumberInput
                            name="consumption.road"
                            control={control}
                            errors={errors}
                        />
                    </FieldWrapper>
                </Col>
                <Col>
                    <FieldWrapper label="CO2">
                        <NumberInput
                            name="consumption.gkm"
                            control={control}
                            errors={errors}
                        />
                    </FieldWrapper>
                </Col>
            </Row>

            <Header text="Données du véhicule"/>

            <FieldWrapper label="Equipements">
                <SelectInput
                    name="equipments"
                    options={CheckboxOptionsEquipments}
                    isMulti
                    defaultChecked={['ABS', 'ESP']}
                    control={control}
                    errors={errors}
                />
            </FieldWrapper>

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
                    <FieldWrapper label="Nombre de couchettes">
                        <NumberInput
                            name="bunks.from"
                            control={control}
                            errors={errors}
                        />
                    </FieldWrapper>
                </Col>
                <Col>
                    <FieldWrapper label="Type de lit">
                        <SelectInput
                            name="bedType"
                            className="mb-2"
                            options={SelectOptionsUtils(['simple', 'double', 'depliant', 'gonflable'])}
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

            <StepNavigation prev={prevStep} submit />
        </form>
    )
}

export default Step1CamperDetails
