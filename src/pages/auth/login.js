import React, { useState, useContext, useEffect } from 'react';
import { useRouter } from "next/router";
import Link from "next/link";
import {Col, Row} from "reactstrap";
import styled from "styled-components";
import {useForm} from "react-hook-form";
import AuthService from '../../services/AuthService';
import { UserContext } from '../../components/Context/UserContext';
import {ModalDialogContext} from "../../components/Context/ModalDialogContext";
import Divider from "../../components/Form/Divider";
import {EmailInput, PasswordInput, RadioInput} from "../../components/Form/Inputs";
import FieldWrapper from "../../components/Form/FieldWrapper";

const formConfig = {
    mode: 'onChange',
    validateCriteriaMode: "all",
};

const LoginPage = (props) => {
    const {control, errors, setValue, getValues, formState, watch, register, handleSubmit} = useForm(formConfig);
    const router = useRouter();
    const { dispatch } = useContext(UserContext);
    const { dispatchModal } = useContext(ModalDialogContext);
    const { redirect } = router.query;

    const onSubmit = async (data) => {
        AuthService.login(data.email, data.password)
            .then(data => {
                dispatch({type: 'loginSuccess', payload: data});
                if (redirect) router.push({pathname: redirect});
                else router.push(`/auth/callback?redirect=/profile/${data.user.username}`);
            }).catch(err => {
                dispatchModal({type : 'error', err});
                if(redirect) router.push({ pathname : redirect});
            }
        );
    };

    const Main = styled.main`
    padding : 1rem
`;

    const AuthForm = styled.form`
        max-width: 40rem;
        margin: 3rem auto;
    `;

    const Left = styled.div`
        display:flex;
        flex-direction:column
    `;

    return (
        <Main>
            <h1>Se connecter</h1>
            <Row>
                <Col className="m-auto" sm="12" md="5">
                    <Left>
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
                        <Link href='/auth/register'>
                            <a className="btn btn-outline-primary submit">
                                Créer un compte
                            </a>
                        </Link>
                        <Link href="/auth/register-pro">
                            <a className="btn btn-outline-primary submit">
                                S'enregistrer en tant que Pro
                            </a>
                        </Link>
                    </Left>
                </Col>

                <Col className="m-auto" sm="12" md="7">
                    <AuthForm onSubmit={handleSubmit(onSubmit)}>
                        <FieldWrapper label="Type" required>
                            <EmailInput
                                name="email"
                                inline
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

                        <div className="submit">
                            <button className="btn btn-outline-primary" type="submit">Se connecter</button>
                        </div>
                    </AuthForm>
                </Col>
            </Row>
        </Main>
    );
};

export default LoginPage;
