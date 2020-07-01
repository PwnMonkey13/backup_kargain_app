import React, { useContext } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { useForm } from 'react-hook-form';
import useTranslation from 'next-translate/useTranslation';
import { ModalDialogContext } from '../../context/ModalDialogContext';
import AuthService from '../../services/AuthService';
import { CheckBoxInput, EmailInput, PasswordInput, TextInput } from '../../components/Form/Inputs';
import FieldWrapper from '../../components/Form/FieldWrapper';
import CTAButton from '../../components/CTAButton';
import SSOProviders from '../../components/SSOProviders';
import Divider from '../../components/Divider';

const formConfig = {
    mode: 'onChange',
    validateCriteriaMode: 'all',
};

const RegisterPage = () => {
    const { dispatchModal, dispatchModalError } = useContext(ModalDialogContext);
    const { control, errors, setValue, getValues, formState, watch, register, handleSubmit } = useForm(formConfig);
    const { t, lang } = useTranslation();

    const onSubmit = (form) => {
        const { confirm, confirmPwd, ...data } = form;
        AuthService.register(data)
            .then(() => {
                dispatchModal({
                    persist: true,
                    msg: 'Account created. Please check your email box to validate your account',
                });
            }).catch(err => {
                dispatchModalError({ err });
            },
        );
    };

    return (
        <Container>
            <h1>{t('vehicles:register')}</h1>
            <Row>
                <Col className="m-auto" sm="12" md="6">
                    <SSOProviders/>
                    <form className="p-3 mx-auto" style={{
                        borderRadius: '5px',
                        maxWidth: '500px',
                    }}
                          onSubmit={handleSubmit(onSubmit)}>
                        <FieldWrapper label={t('vehicles:firstname')}>
                            <TextInput
                                name="firstname"
                                errors={errors}
                                control={control}
                                rules={{ required: 'Required' }}
                            />
                        </FieldWrapper>

                        <FieldWrapper label={t('vehicles:lastname')}>
                            <TextInput
                                name="lastname"
                                errors={errors}
                                control={control}
                                rules={{ required: 'Required' }}
                            />
                        </FieldWrapper>

                        <FieldWrapper label="Email" required>
                            <EmailInput
                                name="email"
                                errors={errors}
                                control={control}
                                rules={{ required: 'Required' }}
                            />
                        </FieldWrapper>

                        <FieldWrapper label={t('vehicles:password')}>
                            <PasswordInput
                                name="password"
                                errors={errors}
                                control={control}
                                rules={{
                                    required: 'Required',
                                    minLength: {
                                        value: 6,
                                        message: 'Min 6 chars',
                                    },
                                    // pattern: { value : /^(?=.*\d).{4,8}$/, message : 'Invalid password : Min must length 4 - 8 and include 1 number at least' }
                                }}
                            />
                        </FieldWrapper>

                        <FieldWrapper label={t('vehicles:password-confirm')}>
                            <PasswordInput
                                name="confirmPwd"
                                errors={errors}
                                control={control}
                                rules={{
                                    required: 'Required',
                                    minLength: {
                                        value: 6,
                                        message: 'Min 6 chars',
                                    },
                                    validate: {
                                        matchesPreviousPassword: (value) => {
                                            const { password } = getValues();
                                            return password === value || 'Passwords should match!';
                                        },
                                    },
                                }}
                            />
                        </FieldWrapper>

                        <FieldWrapper>
                            <CheckBoxInput
                                name="confirm"
                                label={t('vehicles:accept-cgu')}
                                errors={errors}
                                control={control}
                                rules={{ required: 'Required' }}
                            />
                        </FieldWrapper>

                        <div className="submit">
                            <CTAButton
                                title={t('vehicles:register')}
                                submit
                            />
                        </div>
                    </form>
                </Col>
            </Row>
        </Container>
    );
};

export default RegisterPage;
