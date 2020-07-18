import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Col, Row } from 'reactstrap';
import useTranslation from 'next-translate/useTranslation';
import { CheckboxMUI, NumberInput, TextInput } from '../../Form/Inputs';
import StepNavigation from '../../Form/StepNavigation';
import FieldWrapper from '../../Form/FieldWrapper';
import SelectCountryFlags from '../../Form/Inputs/SelectCountryFlags';
import UploadDropZone from '../../Uploads/UploadDropZone';
import { FormContext } from '../../../context/FormContext';
import Header from '../../Header';
import SearchLocationInput from '../../Form/Inputs/SearchLocationInput';

const Step = ({ prevStep, handleSubmitForm }) => {
    const { formDataContext } = useContext(FormContext);
    const { t } = useTranslation();
    const { watch, control, errors, setValue, handleSubmit } = useForm({
        mode: 'onChange',
        validateCriteriaMode: 'all',
        defaultValues: {
            ...formDataContext,
            showCellPhone: true,
            visible: true
        }
    });

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
                            placeholder="Z1000 R Edition MY 2020"
                            fullwidth
                            control={control}
                            errors={errors}
                            rules={{
                                required: t('vehicles:field-is-required'),
                                minLength: {
                                    value: 5,
                                    message: 'Min length : 5 '
                                }
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
                                }
                            }}
                        />
                    </FieldWrapper>
                </Col>
            </Row>

            <FieldWrapper label={t('vehicles:show-cell-phone')}>
                <CheckboxMUI
                    name="showCellPhone"
                    label={t('vehicles:show-cell-phone')}
                    control={control}
                    errors={errors}
                />
            </FieldWrapper>

            <FieldWrapper label={t('vehicles:country')}>
                <SelectCountryFlags
                    name="countrySelect"
                    errors={errors}
                    control={control}
                />
            </FieldWrapper>

            <FieldWrapper label={t('vehicles:address')}>
                <SearchLocationInput
                    name="address"
                    country={countrySelect?.value}
                    control={control}
                    errors={errors}
                    rules={{ required: 'Required' }}>
                </SearchLocationInput>
            </FieldWrapper>

            <Header text={t('vehicles:pictures')}/>
            <UploadDropZone
                maxFiles={15}
                getFiles={getFiles}
                hideSubmit
                dragLabel={t('vehicles:upload-{max}-pictures', { max: 15 })}
            />

            <FieldWrapper>
                <CheckboxMUI
                    name="visible"
                    label={t('vehicles:create-and-publish')}
                    control={control}
                    errors={errors}
                />
            </FieldWrapper>

            <StepNavigation prev={prevStep} submitLabel={t('vehicles:create-my-announce')} submit/>;
        </form>
    );
};

export default Step;
