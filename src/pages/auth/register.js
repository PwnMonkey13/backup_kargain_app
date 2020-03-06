import React, {useContext} from 'react';
import Link from "next/link";
import {useRouter} from "next/router";
import {Container, Col, Row} from 'reactstrap'
import {UserContext} from '../../components/Context/UserContext';
import {ModalDialogContext} from '../../components/Context/ModalDialogContext';
import Divider from '../../components/Form/Divider'
import AuthService from '../../services/AuthService'
import {useForm} from "react-hook-form";
import {TextInput, EmailInput, PasswordInput, CheckBoxInput } from "../../components/Form/Inputs";

const formConfig = {
    mode: 'onChange',
    reValidateMode: 'onChange',
    validateCriteriaMode: "all",
};

const LoginPage = (props) => {
    const router = useRouter();
    const {dispatch} = useContext(UserContext);
    const {dispatchModal} = useContext(ModalDialogContext);
    const {control, errors, setValue, getValues, formState, watch, register, handleSubmit} = useForm(formConfig);
    const { redirect } = router.query;

    const onSubmit = async (data) => {
        AuthService.register(data)
            .then(data => {
                dispatch({type: 'set', payload: {user: {email: data.document.email}}});
                if (redirect) router.push({pathname: redirect});
                else router.push('/auth/callback?redirect=/auth/check-email');
            }).catch(err => {
                dispatchModal({type: 'error', err});
            })
    };

    return (
        <main>
            <h1>Créer un compte</h1>
            <Row>
                <Col className="social_providers" sm="12" md="5">
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
                </Col>
                <Col className="auth_form m-auto" sm="12" md="7">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="fields">
                            <TextInput
                                label="Prénom"
                                name="firstname"
                                required
                                inline
                                register={register({required : 'Required'})}
                            />
                            <TextInput
                                label="Nom"
                                name="lastname"
                                required
                                inline
                                register={register({required : 'Required'})}
                            />
                            <EmailInput
                                label="Email"
                                name="email"
                                required
                                inline
                                register={register({required : 'Required'})}
                            />
                            <PasswordInput
                                label="Mot de passe"
                                name="password"
                                required
                                inline
                                register={register({required : 'Required'})}
                            />
                            <PasswordInput
                                label="Confirmer mot de passe"
                                name="confirm_pwd"
                                required
                                inline
                                register={register({
                                required : 'Required',
                                validate: {
                                    matchesPreviousPassword: (value) => {
                                        const { password } = getValues();
                                        return password === value || 'Passwords should match!';
                                    },
                                }
                            })}
                            />
                            <CheckBoxInput
                                label="J’ai lu et j’accepte les conditions générales d’utilisation"
                                name="confirm"
                                required
                                inline
                                register={register({
                                    required : 'Required',
                                })}
                            />
                        </div>
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
