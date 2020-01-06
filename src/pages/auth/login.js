import React, { useState, useContext } from 'react';
import { useRouter } from "next/router";

import axioswal from 'axioswal';
import Link from "next/link";
import {useLink} from "valuelink";
import Cookies from "universal-cookie";
import { Container, Row, Col, Form, Label } from 'reactstrap'

import Layout from '../../layouts/Layout';
import redirectTo from '../../libs/redirectTo';
import { UserContext } from '../../components/UserContext';
import InputControlled from '../../components/form/InputControlled';
import FormGroupCustom from '../../components/form/FormGroupCustom'
import Divider from '../../components/form/Divider'
import AuthService from '../../services/AuthService'

const LoginPage = () => {
    const { dispatch } = useContext(UserContext);
    const router = useRouter();
    const $state = useLink({
        email: '',
        password : '',
        save_pwd : true
        }
    );

    const handleSubmit = (event) => {
        event.preventDefault();
        const state = $state.value;
        if (!state.email) return;

        // Save current URL so user is redirected back here after signing in
        // const cookies = new Cookies();
        // cookies.set('redirect_url', window.location.pathname, { path: '/' });

        AuthService.login(state.email, state.password)
        .then(data => {
            console.log(data);
            dispatch({ type : 'set', data : { isLoggedIn : true, user : data.user }});
            router.push('/account');
        }).catch(err => {
            console.log(err);
        });
    };

    return (
        <Layout>
            <Container>
                <Form className="auth_form m-auto" onSubmit={handleSubmit}>
                    <h1>Connexion</h1>
                    <div className="form_container">
                        <InputControlled row required
                            type="email"
                            label="Email"
                            $flag={$state.at('email')}
                            placeholder="Email address"
                        />
                        <InputControlled row required
                            type="password"
                            label="Mot de passe"
                            placeholder="Create a password"
                            $flag={$state.at('password')}
                        />
                        <FormGroupCustom.Row>
                            <InputControlled
                                label="Enregistrer mon mot de passe"
                                type="checkbox"
                                $flag={$state.at('save_pwd')}
                            />
                            <Link href="/auth/forgot">
                                <a>Mot de pase oublié ?</a>
                            </Link>
                        </FormGroupCustom.Row>

                        <FormGroupCustom className="submit">
                            <button className="btn btn-outline-primary" type="submit">Se connecter</button>
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

                    <FormGroupCustom.Col>
                        <Label> Pas encore de compte ? </Label>
                        <Link href="/auth/register">
                            <button className="btn btn-outline-primary btn-enreg">
                                Créer un compte
                            </button>
                        </Link>
                    </FormGroupCustom.Col>
                    </div>
                </Form>
            </Container>
        </Layout>
    );
};

export default LoginPage;
