import React, { useContext } from 'react';
import { Col, Row } from 'reactstrap';
import { NumberInput, TextInput } from '../../Form/Inputs';
import StepNavigation from '../../Form/StepNavigation';
import FieldWrapper from '../../Form/FieldWrapper';
import useAddress from '../../../hooks/useAddress';
import GeoStreetsInput from '../../Form/Inputs/GeoStreetsInput';
import UploadDropZone from '../../UploadDropZone';
import TitleMUI from '../../TitleMUI';

const Step = ({ methods, formConfig, handleSubmitForm, prevStep, nextStep, ...props }) => {
    const { watch, control, errors, getValues, register, formState, handleSubmit } = methods;
    const [addressParts, addressString, geolocalisation] = useAddress();

    control.register({ name : 'featured_image'})
    control.register({ name : 'images'})

    const getFeatured = (files) => {
        control.setValue("featured_image", files[0])
    }

    const getFiles = (files) => {
        control.setValue("images", files)
    };

    return (
        <form className="form_wizard" onSubmit={handleSubmit(handleSubmitForm)}>
            <Row>
                <Col>
                    <FieldWrapper label="Titre de l'annonce">
                        <TextInput
                            name="title"
                            placeholder="BMW 633csi e24 - 1976"
                            fullwidth
                            control={control}
                            errors={errors}
                            rules={{
                                required: 'Title is required',
                                minLength: {
                                    value: 5,
                                    message: 'Min length : 5 ',
                                },
                            }}
                        />
                    </FieldWrapper>
                </Col>
                <Col>
                    <FieldWrapper label="Prix de l'annonce">
                        <NumberInput
                            name="price"
                            placeholder="15000€"
                            errors={errors}
                            control={control}
                            rules={{
                                required: 'Price is required',
                                validate : val => {
                                    const value = Number(val)
                                    if(value < 100) return "Min 100€"
                                    if(value > 1000000) return "Max 1 000 000€"
                                }
                            }}
                        />
                    </FieldWrapper>
                </Col>
            </Row>

            <Row>
                <Col>
                    <FieldWrapper label="Adresse">
                        <GeoStreetsInput
                            lat={geolocalisation.latitude}
                            long={geolocalisation.longitude}
                            name="location"
                            control={control}
                            errors={errors}
                        />
                    </FieldWrapper>
                </Col>
            </Row>

            <UploadDropZone
                multiple={false}
                hideSubmit
                getFiles={getFeatured}
                dragLabel="Uploader une photo de couverture"
            />

            <UploadDropZone
                maxFiles={10}
                getFiles={getFiles}
                hideSubmit
                dragLabel="Uploader max 3 autres photos"
            />

            <TitleMUI component="p" variant="body1" color="primary">
                Vous pourrez ajouter d'autres photos juste aprés
            </TitleMUI>

            <StepNavigation prev={prevStep} submitLabel="Créer mon annonce" submit/>
        </form>
    );
};

export default Step;
