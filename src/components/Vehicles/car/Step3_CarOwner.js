import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Col, Row } from 'reactstrap';
import Typography from '@material-ui/core/Typography';
import useTranslation from 'next-translate/useTranslation';
import { GeoStreetsInput, NumberInput, SelectCountryFlags, TextInput } from '../../Form/Inputs';
import StepNavigation from '../../Form/StepNavigation';
import FieldWrapper from '../../Form/FieldWrapper';
import useAddress from '../../../hooks/useAddress';
import UploadDropZone from '../../Uploads/UploadDropZone';
import { useAuth } from '../../../context/AuthProvider';
import { FormContext } from '../../../context/FormContext';
import Header from '../../Header';

const Step = ({ handleSubmitForm, prevStep, nextStep }) => {
    const [, , coordinates] = useAddress();
    const { authenticatedUser } = useAuth();
    const { formDataContext } = useContext(FormContext);
    const { t } = useTranslation();
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
            <Header text={t('vehicles:publish-my-ad-now')}/>
            <Row>
                <Col>
                    <FieldWrapper label={t('vehicles:announce-title')}>
                        <TextInput
                            name="title"
                            placeholder="BMW 633csi e24 - 1976"
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
                    <FieldWrapper label={t('vehicles:ad-price')}>
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

            <FieldWrapper label={t('vehicles:price')}>
                <SelectCountryFlags
                    name="countrySelect"
                    errors={errors}
                    control={control}
                />
            </FieldWrapper>

            {countrySelect && countrySelect.value === 'FR' ? (
                <FieldWrapper label={t('vehicles:address')}>
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
                    <FieldWrapper label={t('vehicles:city')}>
                        <TextInput
                            name="address.city"
                            errors={errors}
                            control={control}
                            rules={{ required: 'Required' }}
                        />
                    </FieldWrapper>

                    <FieldWrapper label={t('vehicles:address')}>
                        <TextInput
                            name="address.street"
                            errors={errors}
                            control={control}
                            rules={{ required: 'Required' }}
                        />
                    </FieldWrapper>
                </>
            )}

            <Header text={t('vehicles:owner-informations')}/>

            <Row>
                <Col>
                    <FieldWrapper label={t('vehicles:firstname')}>
                        <TextInput
                            defaultValue={authenticatedUser.getFirstname}
                            disabled
                        />
                    </FieldWrapper>
                </Col>
                <Col>
                    <FieldWrapper label={t('vehicles:lastname')}>
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
                    <FieldWrapper label={t('vehicles:phone')}>
                        <TextInput
                            defaultValue={authenticatedUser?.getPhone}
                            disabled
                        />
                    </FieldWrapper>
                </Col>
            </Row>

            <Header text={t('vehicles:pictures')}/>
            <UploadDropZone
                maxFiles={10}
                getFiles={getFiles}
                hideSubmit
                dragLabel={t('vehicles:upload-max-3-pictures')}
            />

            <Typography component="p" variant="body1" color="primary">
                {t('vehicles:you-can-upload-more-after')}
            </Typography>

            <StepNavigation prev={prevStep} submitLabel={t('vehicles:create-my-ad')} submit/>
        </form>
    );
};

export default Step;
