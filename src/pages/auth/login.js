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

const Left = styled.div`
        display:flex;
        flex-direction:column
    `;

const LoginPage = (props) => {
    const router = useRouter();
    const { redirect } = router.query;
    const { dispatch } = useContext(UserContext);
    const { dispatchModal } = useContext(ModalDialogContext);
    const {control, errors, setValue, getValues, formState, watch, register, handleSubmit} = useForm(formConfig);

    const onSubmit = (data) => {
        console.log(data);
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

    return (
        <div>
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
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <button onClick={()=> getValues()}>CLICK</button>

                        <input type="text" name="firstName" ref={register} />

                        <FieldWrapper label="Type" required>
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
                            />
                        </FieldWrapper>

                        <div className="submit">
                            <button className="btn btn-outline-primary" type="submit">Se connecter</button>
                        </div>
                    </form>
                </Col>
            </Row>
        </div>
    );
};

export default LoginPage;
