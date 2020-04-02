import React, {useContext} from 'react';
import Link from "next/link";
import {useRouter} from "next/router";
import styled from "styled-components";
import {Container, Col, Row} from 'reactstrap'
import {UserContext} from '../../components/Context/UserContext';
import {ModalDialogContext} from '../../components/Context/ModalDialogContext';
import Divider from '../../components/Divider'
import AuthService from '../../services/AuthService'
import {useForm} from "react-hook-form";
import {TextInput, EmailInput, PasswordInput, CheckBoxInput } from "../../components/Form/Inputs";
import FieldWrapper from "../../components/Form/FieldWrapper";

const formConfig = {
    mode: 'onChange',
    validateCriteriaMode: "all",
};

const LoginPage = (props) => {
    const router = useRouter();
    const {dispatch} = useContext(UserContext);
    const {dispatchModal} = useContext(ModalDialogContext);
    const {control, errors, setValue, getValues, formState, watch, register, handleSubmit} = useForm(formConfig);
    const { redirect } = router.query;

    const onSubmit = (form) => {
        const { confirm, confirm_pwd, ...data} = form;
        AuthService.register(data)
            .then(data => {
                dispatch({type: 'set', payload: {user: {email: data.document.email}}});
                if (redirect) router.push({pathname: redirect});
                else router.push('/auth/callback?redirect=/auth/check-email');
            }).catch(err => {
                dispatchModal({type: 'error', err});
            }
        )
    };

    return (
        <main>
            <h1>Créer un compte</h1>
            <Row>
                <Col className="m-auto" sm="12" md="5">
                    <div className="flex-column">
                        <Link href="#">
                            <a className="register-fb">
                                <img src="/images/fb.png" alt=""/>
                                Se connecter avec Facebook
                            </a>
                        </Link>

                        <Link href="#">
                            <a className="register-g">
                                <img src="/images/g+.png" alt=""/>
                                Se connecter avec Google+
                            </a>
                        </Link>
                        <Divider text="ou"/>
                        <Link href="/auth/login">
                            <a className="btn btn-outline-primary submit">
                                Se connecter
                            </a>
                        </Link>
                        <Link href="/auth/register-pro">
                            <a className="btn btn-outline-primary submit">
                                Créer un compte Pro
                            </a>
                        </Link>
                    </div>
                </Col>
                <Col className="m-auto" sm="12" md="6" lg="7">
                    <form className="mt-3 mx-auto" onSubmit={handleSubmit(onSubmit)}>
                        <FieldWrapper label="Prénom" required>
                            <TextInput
                                name="firstname"
                                errors={errors}
                                control={control}
                                rules={{required : 'Required'}}
                            />
                        </FieldWrapper>

                        <FieldWrapper label="Nom" required>
                            <TextInput
                                name="lastname"
                                errors={errors}
                                control={control}
                                rules={{required : 'Required'}}
                            />
                        </FieldWrapper>

                        <FieldWrapper label="Email" required>
                            <EmailInput
                                name="email"
                                errors={errors}
                                control={control}
                                rules={{required : 'Required'}}
                            />
                        </FieldWrapper>

                        <FieldWrapper label="Mot de passe" required>
                            <PasswordInput
                                name="password"
                                errors={errors}
                                control={control}
                                rules={{required : 'Required'}}
                            />
                        </FieldWrapper>

                        <FieldWrapper label="Confirmer mot de passe" required>
                            <PasswordInput
                                name="confirm_pwd"
                                errors={errors}
                                control={control}
                                rules={{
                                    required : 'Required',
                                    validate: {
                                        matchesPreviousPassword: (value) => {
                                            const { password } = getValues();
                                            return password === value || 'Passwords should match!';
                                        },
                                    }
                                }}
                            />
                        </FieldWrapper>

                        <FieldWrapper>
                            <CheckBoxInput
                                name="confirm"
                                label="J’ai lu et j’accepte les conditions générales d’utilisation"
                                errors={errors}
                                control={control}
                                rules={{required : 'Required'}}
                            />
                        </FieldWrapper>

                        <div className="submit">
                            <button className="btn btn-outline-primary" type="submit">S'enregistrer</button>
                        </div>
                    </form>
                </Col>
            </Row>
        </main>
    );
};

export default LoginPage;
