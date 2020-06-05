import React, { useContext } from 'react';
import Link from 'next/link';
import { Col, Row } from 'reactstrap';
import { useForm } from 'react-hook-form';
import { ModalDialogContext } from '../../context/ModalDialogContext';
import Divider from '../../components/Divider';
import AuthService from '../../services/AuthService';
import { CheckBoxInput, EmailInput, PasswordInput, TextInput } from '../../components/Form/Inputs';
import FieldWrapper from '../../components/Form/FieldWrapper';
import CTALink from '../../components/CTALink';
import CTAButton from '../../components/CTAButton';
import SSOProviders from '../../components/SSOProviders';

const formConfig = {
    mode: 'onChange',
    validateCriteriaMode: 'all',
};

const RegisterPage = () => {
    const { dispatchModal, dispatchModalError } = useContext(ModalDialogContext);
    const { control, errors, setValue, getValues, formState, watch, register, handleSubmit } = useForm(formConfig);

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
        <>
            <h1>Créer un compte</h1>
            <Row>
                <Col sm="12" md="5">
                    <div className="d-flex flex-column mx-auto" style={{ maxWidth : '400px'}}>
                        <SSOProviders/>
                        <Divider text="ou"/>
                        <CTALink
                            className="my-2"
                            title="Se connecter"
                            href="/auth/login"
                        />
                        <CTALink
                            className="my-2"
                            title="Créer un compte Pro"
                            href="/auth/register-pro"
                        />
                    </div>
                </Col>
                <Col className="m-auto" sm="12" md="6" lg="7">
                    <style jsx>{`
                        form{
                            border-radius : 5px; 
                            border : 1px solid gainsboro;
                            max-width : 500px
                        }
                    `}
                    </style>
                    <form className="p-3 mt-3 mx-auto"
                          onSubmit={handleSubmit(onSubmit)}>
                        <FieldWrapper label="Prénom" required>
                            <TextInput
                                name="firstname"
                                errors={errors}
                                control={control}
                                rules={{ required: 'Required' }}
                            />
                        </FieldWrapper>

                        <FieldWrapper label="Nom" required>
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

                        <FieldWrapper label="Mot de passe" required>
                            <PasswordInput
                                name="password"
                                errors={errors}
                                control={control}
                                rules={{
                                    required: 'field required',
                                    minLength: {
                                        value: 6,
                                        message: 'Min 6 chars',
                                    },
                                    // pattern: { value : /^(?=.*\d).{4,8}$/, message : 'Invalid password : Min must length 4 - 8 and include 1 number at least' }
                                }}
                            />
                        </FieldWrapper>

                        <FieldWrapper label="Confirmer mot de passe" required>
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
                                label="J’ai lu et j’accepte les conditions générales d’utilisation"
                                errors={errors}
                                control={control}
                                rules={{ required: 'Required' }}
                            />
                        </FieldWrapper>

                        <div className="submit">
                            <CTAButton
                                title="S'enregistrer"
                                submit
                            />
                        </div>
                    </form>
                </Col>
            </Row>
        </>
    );
};

export default RegisterPage;
