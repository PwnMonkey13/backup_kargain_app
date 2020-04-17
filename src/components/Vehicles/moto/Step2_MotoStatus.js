import React, { useRef } from 'react'
import { Col, Row } from 'reactstrap'
import Header from '../../Header'
import { NumberInput, SelectInput, TextareaInput, TextInput } from '../../Form/Inputs'
import { RadioVehicleGeneralState } from './form.data.js'
import StepNavigation from '../../Form/StepNavigation'
import { SelectOptionsUtils } from '../../../libs/formFieldsUtils'
import FieldWrapper from '../../Form/FieldWrapper'

const Step = ({ methods, formConfig, onSubmitStep, prevStep, nextStep, ...props }) => {
    const formRef = useRef(null)
    const { watch, control, errors, handleSubmit } = methods

    return (
        <form className="form_wizard" ref={formRef} onSubmit={handleSubmit(onSubmitStep)}>
            <Header text="Etat du véhicule"/>

            <FieldWrapper label="Etat général">
                <SelectInput
                    name="vehicleState"
                    options={RadioVehicleGeneralState}
                    control={control}
                    rules={{ required: 'Title is required' }}
                    errors={errors}
                />
            </FieldWrapper>

            <FieldWrapper label="Nombre de propriétaires">
                <SelectInput
                    name="owners"
                    options={SelectOptionsUtils([2, 3, 4, 5])}
                    placeholder="Select number of owners"
                    control={control}
                    rules={{ required: 'Field required' }}
                    errors={errors}
                />
            </FieldWrapper>

            <Row>
                <Col>
                    <FieldWrapper label="Véhicule accidenté">
                        <SelectInput
                            name="damages"
                            options={SelectOptionsUtils([2, 3, 4, 5])}
                            placeholder="Select number of damages"
                            control={control}
                            rules={{ required: 'Field required' }}
                            errors={errors}
                        />
                    </FieldWrapper>
                </Col>
                <Col>
                    <FieldWrapper label="Véhicule deffectueux">
                        <SelectInput
                            name="defective"
                            options={SelectOptionsUtils([2, 3, 4, 5])}
                            control={control}
                            rules={{ required: 'Field required' }}
                            errors={errors}
                        />
                    </FieldWrapper>
                </Col>
            </Row>

            <FieldWrapper label="Description">
                <TextareaInput
                    name="description"
                    control={control}
                    rules={{ required: 'Field required' }}
                    errors={errors}
                />
            </FieldWrapper>

            <p> TODO TAGS </p>
            <p> TODO Damage selector </p>

            <StepNavigation prev={prevStep} submit />
        </form>
    )
}

export default Step
