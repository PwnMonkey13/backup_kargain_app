import React, { useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Col, Row } from 'reactstrap';
import Typography from '@material-ui/core/Typography';
import { GeoStreetsInput, NumberInput, TextInput, SelectCountryFlags } from '../../Form/Inputs';
import StepNavigation from '../../Form/StepNavigation';
import FieldWrapper from '../../Form/FieldWrapper';
import useAddress from '../../../hooks/useAddress';
import UploadDropZone from '../../Uploads/UploadDropZone';
import { useAuth } from '../../../context/AuthProvider';
import { FormContext } from '../../../context/FormContext';
import Header from '../../Header';

const Step = ({ handleSubmitForm, prevStep, nextStep }) => {
    const [addressParts, addressString, coordinates] = useAddress();
    const { isAuthenticated, authenticatedUser } = useAuth();
    const { formDataContext } = useContext(FormContext);
    const { watch, control, errors, setValue, getValues, register, formState, handleSubmit } = useForm({
        mode: 'onChange',
        validateCriteriaMode: 'all',
        defaultValues: formDataContext,
    });

    useEffect(() => {
        register({ name: 'location.coordinates' });
        setValue('location.coordinates', coordinates);
    }, [coordinates]);

    useEffect(() => {
        register({ name: 'images' });
    }, []);

    const getFiles = (files) => {
        setValue('images', files);
    };

    const countrySelect = watch('countrySelect');

    return (
        <form className="form_wizard" onSubmit={handleSubmit(handleSubmitForm)}>
            <Header text="Publier votre annonce maintenant"/>
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
                                validate: val => {
                                    const value = Number(val);
                                    if (value < 500) return 'Min 500€';
                                    if (value > 200000) return 'Max 200 000€';
                                },
                            }}
                        />
                    </FieldWrapper>
                </Col>
            </Row>

            <FieldWrapper label="Pays">
                <SelectCountryFlags
                    name="countrySelect"
                    errors={errors}
                    control={control}
                />
            </FieldWrapper>

            {countrySelect && countrySelect.value === 'FR' ? (
                <FieldWrapper label="Adresse">
                    <GeoStreetsInput
                        name="address"
                        enableGeoloc
                        long={coordinates?.[0]}
                        lat={coordinates?.[1]}
                        control={control}
                        errors={errors}
                    />
                </FieldWrapper>
            ) : (
                <>
                    <FieldWrapper label="Ville">
                        <TextInput
                            name="address.city"
                            errors={errors}
                            control={control}
                            rules={{ required: 'Required' }}
                        />
                    </FieldWrapper>

                    <FieldWrapper label="Adresse">
                        <TextInput
                            name="address.street"
                            errors={errors}
                            control={control}
                            rules={{ required: 'Required' }}
                        />
                    </FieldWrapper>
                </>
            )}

            <Header text="Informations sur le vendeur"/>

            <Row>
                <Col>
                    <FieldWrapper label="Prénom">
                        <TextInput
                            defaultValue={authenticatedUser.getFirstname}
                            disabled
                        />
                    </FieldWrapper>
                </Col>
                <Col>
                    <FieldWrapper label="Nom">
                        <TextInput
                            defaultValue={authenticatedUser?.getLastname}
                            disabled
                        />
                    </FieldWrapper>
                </Col>
            </Row>

            <Row>
                <Col md={8}>
                    <FieldWrapper label="Email">
                        <TextInput
                            defaultValue={authenticatedUser?.getEmail}
                            disabled
                        />
                    </FieldWrapper>
                </Col>
                <Col md={4}>
                    <FieldWrapper label="Telephone">
                        <TextInput
                            defaultValue={authenticatedUser?.getPhone}
                            disabled
                        />
                    </FieldWrapper>
                </Col>
            </Row>

            <Header text="Photos"/>
            <UploadDropZone
                maxFiles={10}
                getFiles={getFiles}
                hideSubmit
                dragLabel="Uploader max 3 autres photos"
            />

            <Typography component="p" variant="body1" color="primary">
                Vous pourrez ajouter d'autres photos plus tard
            </Typography>

            <StepNavigation prev={prevStep} submitLabel="Créer mon annonce" submit/>
        </form>
    );
};

export default Step;
