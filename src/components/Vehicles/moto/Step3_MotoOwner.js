import React from 'react';
import { useForm } from 'react-hook-form';
import { Col, Row } from 'reactstrap';
import useTranslation from 'next-translate/useTranslation';
import Typography from '@material-ui/core/Typography';
import { GeoStreetsInput, NumberInput, TextInput } from '../../Form/Inputs';
import StepNavigation from '../../Form/StepNavigation';
import FieldWrapper from '../../Form/FieldWrapper';
import SelectCountryFlags from '../../Form/Inputs/SelectCountryFlags';
import useAddress from '../../../hooks/useAddress';
import UploadDropZone from '../../Uploads/UploadDropZone';
import { FormContext } from '../../../context/FormContext';
import Header from '../../Header';

const Step = ({ onSubmitStep, prevStep, nextStep }) => {
    const { formDataContext } = useContext(FormContext);
    const [addressParts, addressString, coordinates] = useAddress();
    const { t } = useTranslation();
    const { watch, control, errors, setValue, getValues, register, formState, handleSubmit } = useForm({
        mode: 'onChange',
        validateCriteriaMode: 'all',
        defaultValues: formDataContext,
    });

    const getFiles = (files) => {
        setValue('images', files);
    };

    const countrySelect = watch('countrySelect');

    return (
        <form className="form_wizard" onSubmit={handleSubmit(data => onSubmitStep(data, true))}>
            <Header text="Publier votre annonce maintenant"/>
            <Row>
                <Col>
                    <FieldWrapper label="Titre de l'annonce">
                        <TextInput
                            name="title"
                            placeholder="Z1000 R Edition MY 2020"
                            fullwidth
                            control={control}
                            errors={errors}
                            rules={{
                                required: t('vehicles:field-is-required'),
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

            <UploadDropZone
                maxFiles={10}
                getFiles={getFiles}
                hideSubmit
                dragLabel="Uploader max 3 autres photos"
            />

            <Typography component="p" variant="body1" color="primary">
                Vous pourrez ajouter d'autres photos plus tard
            </Typography>

            <StepNavigation prev={prevStep} submitLabel="Créer mon annonce" submit/>;
        </form>
    );
};

export default Step;
