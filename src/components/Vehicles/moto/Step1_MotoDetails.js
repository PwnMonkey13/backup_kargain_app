import React, { useRef } from 'react'
import { Row, Col } from 'reactstrap'
import FieldWrapper from '../../Form/FieldWrapper'
import { CheckboxMultipleInput, SelectInput, NumberInput, RadioGroupInput, TextInput } from '../../Form/Inputs'
import { RadioFunctionVehicle, RadioChoicesEngine, CheckboxOptionsEquipments, RadioTypeFunction, RadioChoicesMaterials, RadioChoicesExternalColor, RadioChoicesPaints } from './form.data.js'
import Header from '../../Header'
import { RadioChoicesGas } from '../car/form.data'

const Step1MotoDetails = ({ methods, formConfig, onSubmitStep, prevStep, nextStep, ...props }) => {
    const formRef = useRef(null)
    const { watch, control, errors, getValues, register, formState, handleSubmit } = methods

    return (
        <form className="form_wizard" ref={formRef} onSubmit={handleSubmit(onSubmitStep)}>
            <Row>
                <Col>
                    <FieldWrapper label="Type">
                        <SelectInput name="vehicleFunction"
                            control={control}
                            errors={errors}
                            options={RadioTypeFunction}
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
                        <NumberInput name="vehicleEngine.cylinder"
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

            <Row>
                <Col>
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
            </Row>
        </form>
    )
}

export default Step1MotoDetails
