import React, { useState, useContext } from 'react';
import Link from "next/link";
import {useLink} from "valuelink";
import { Container, Form } from 'reactstrap'
import Cookies from "universal-cookie";

import Layout from '../../layouts/Layout';
import redirectTo from '../../libs/redirectTo';
import { UserContext } from '../../components/UserContext';
import InputControlled from '../../components/form/InputControlled';
import FormGroupCustom from '../../components/form/FormGroupCustom'
import Divider from '../../components/form/Divider'

const LoginPage = () => {
    const { dispatch } = useContext(UserContext);
    const $state = useLink({
        firstname : '',
        lastname : '',
        nickname : '',
        email: '',
        password : '',
        confirm_pwd : '',
        }
    );

    const handleSubmit = (event) => {
        event.preventDefault();
        const state = $state.value;
        if (!state.email) return;

        // Save current URL so user is redirected back here after signing in
        const cookies = new Cookies();
        const redirectURL = cookies.get('redirect_url');

        AuthService.register(state)
            .then(data => {
                // dispatch({ type: 'fetch' });
                redirectTo(redirectURL);
                redirectTo('/');
                }
            )
            .catch(err => {
                console.log(err);
                router.push(`/auth/error?action=register`)
            })
    };

    return (
        <Layout>
            <Container>
                <Form className="auth_form m-auto" onSubmit={handleSubmit}>
                    <h1>Connexion</h1>
                    <div className="form_container">
                        <InputControlled
                            type="email"
                            label="Email"
                            required
                            $flag={$state.at('email')}
                        />
                        <InputControlled
                            label="Nom"
                            required
                            $flag={$state.at('lastname')}
                        />
                        <InputControlled
                            label="Prénom"
                            required
                            $flag={$state.at('firstname')}
                        />
                        <InputControlled
                            type="password"
                            label="Mot de passe"
                            required
                            $flag={$state.at('password')}
                        />
                        <InputControlled
                            type="password"
                            label="Confirmer mot de passe"
                            required
                            $flag={$state.at('confirm_pwd')}
                        />

                        <InputControlled
                            label="J’ai lu et j’accepte les conditions générales d’utilisation"
                            type="checkbox"
                            required
                            $flag={$state.at('save_pwd')}
                        />

                        <FormGroupCustom className="submit">
                            <button className="btn btn-outline-primary" type="submit">S'enregirster</button>
                        </FormGroupCustom>

                        <Divider.Or/>

                        <FormGroupCustom.Col>
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
                        </FormGroupCustom.Col>

                        <FormGroupCustom className="submit">
                            <Link href="/auth/register-pro">
                                <button className="btn btn-outline-primary">
                                    S'enregistrer en tant que Pro
                                </button>
                            </Link>
                        </FormGroupCustom>
                    </div>
                </Form>
            </Container>
        </Layout>
    );
};

export default LoginPage;
