import React from 'react'
import { useGeolocation } from 'react-use'
import { Col, Row } from 'reactstrap'
import { NumberInput, TelInput, TextInput, GeoCitiesInput } from '../../Form/Inputs'
import StepNavigation from '../../Form/StepNavigation'
import FieldWrapper from '../../Form/FieldWrapper'
import Header from '../../Header'

const Step = ({ methods, formConfig, onSubmitStep, prevStep, nextStep, ...props }) => {
    const { watch, control, errors, getValues, register, formState, handleSubmit } = methods

    const geolocation = useGeolocation({
        enableHighAccuracy: true,
        timeout: 10000
    })

    return (
        <form className="form_wizard" onSubmit={handleSubmit(data => onSubmitStep(data, true))}>
            <Header text="Informations sur le vendeur" />
            <Row>
                <Col>
                    <FieldWrapper label="Titre de l'annonce">
                        <TextInput
                            name="title"
                            fullwidth
                            control={control}
                            errors={errors}
                            rules={{
                                required: 'Title is required',
                                minLength: { value: 5, message: 'Min length : 5 ' }
                            }}
                        />
                    </FieldWrapper>
                </Col>
                <Col>
                    <FieldWrapper label="Prix de l'annonce">
                        <NumberInput
                            name="price"
                            errors={errors}
                            control={control}
                        />
                    </FieldWrapper>
                </Col>
            </Row>

            <FieldWrapper label="Numéro de téléphone">
                <TelInput
                    name="seller.phone"
                    errors={errors}
                    control={control}
                    rules={{
                        required: 'Field required'
                    }}
                />
            </FieldWrapper>

            <FieldWrapper label="Adresse complete">
                <GeoCitiesInput
                    enableGeoloc
                    lat={geolocation.latitude}
                    long={geolocation.longitude}
                    typeAPI="geo" // vicopo
                    name="seller.address"
                    control={control}
                    errors={errors}
                />
            </FieldWrapper>

            <FieldWrapper label="CP/Ville">
                <GeoCitiesInput
                    typeAPI="vicopo"
                    name="seller.address"
                    control={control}
                    errors={errors}
                />
            </FieldWrapper>

            <StepNavigation prev={prevStep} submitLabel="Créer mon annonce" submit />
        </form>
    )
}

export default Step
