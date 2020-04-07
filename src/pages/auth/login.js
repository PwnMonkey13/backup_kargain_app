import React, {useContext} from 'react';
import { useRouter } from "next/router";
import {useForm} from "react-hook-form";
import styled from "styled-components";
import {EmailInput, PasswordInput} from "../../components/Form/Inputs";
import FieldWrapper from "../../components/Form/FieldWrapper";
import {Col, Row} from "reactstrap";
import Link from "next/link";
import Divider from "../../components/Divider";
import AuthService from '../../services/AuthService';
import {ModalDialogContext} from "../../components/Context/ModalDialogContext";
import {UserContext} from "../../components/Context/UserContext";

const formConfig = {
    mode: 'onChange',
    validateCriteriaMode: "all",
};

const LoginPage = (props) => {
    const router = useRouter();
    const { redirect } = router.query;
    const { dispatch } = useContext(UserContext);
    const { dispatchModal,dispatchModalError} = useContext(ModalDialogContext);
    const {control, errors, setValue, getValues, formState, watch, register, handleSubmit} = useForm(formConfig);

    const onSubmit = (form) => {
        AuthService.login(form.email, form.password)
            .then(data => {
                dispatch({type: 'loginSuccess', payload: data});
                if (redirect) router.push({pathname: redirect});
                else router.push(`/auth/callback?redirect=/profile/${data.user.username}`);
            }).catch(err => {
                dispatchModalError({err});
                if(redirect) router.push({ pathname : redirect});
            }
        );
    };

    return (
        <main>
            <h1>Se connecter</h1>
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
                    </div>
                </Col>
                <Col className="m-auto" sm="12" md="7">
                    <form className="mt-3 mx-auto" onSubmit={handleSubmit(onSubmit)}>

                        <FieldWrapper label="Email" required>
                            <EmailInput
                                name="email"
                                inline
                                errors={errors}
                                control={control}
                            />
                        </FieldWrapper>

                        <FieldWrapper label="Mot de passe" required>
                            <PasswordInput
                                name="password"
                                errors={errors}
                                control={control}
                                rules={{
                                    required : 'field required',
                                    minLength: { value : 6, message : "Min 6 chars" },
                                    // pattern: { value : /^(?=.*\d).{4,8}$/, message : 'Invalid password : Min must length 4 - 8 and include 1 number at least' }
                                }}
                            />
                        </FieldWrapper>

                        <div className="text-right">
                            <Link href="/auth/forgotten">
                                <a className=""> mot de passe oublié</a>
                            </Link>
                        </div>

                        <div className="submit">
                            <button className="btn btn-outline-primary" type="submit">Se connecter</button>
                        </div>
                    </form>
                </Col>
            </Row>
        </main>
    );
};

export default LoginPage;
