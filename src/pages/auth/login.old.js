import React, { useState, useContext } from 'react';
import { useRouter } from "next/router";
// import Link from "next/link";
import Link, { useLink } from "valuelink";
import { isRequired, isEmail, isNumber } from "linked-controls";
import Cookies from "universal-cookie";
import { Container, Row, Col, Form, Label } from 'reactstrap'
import Layout from '../../layouts/Layout';
import { UserContext } from '../../components/Context/UserContext';
import InputControlled from '../../components/form/InputControlled';
import FormGroupCustom from '../../components/form/FormGroupCustom'
import Divider from '../../components/form/Divider'
import AuthService from '../../services/AuthService'

const LoginPage = () => {
    const { dispatch } = useContext(UserContext);
    const router = useRouter();
    const initForm = {
        email: 'fzfzefzef@gmail.com',
        password : '',
        name : '',
        save_pwd : true
    };

    const $state = useLink(initForm);
    const $email = useLink(initForm).at('email');
    const $name = useLink(initForm).at('name');

    $name.check( x => x.length > 0, 'Name is required' )
        .check( x => x.length > 2, 'Name is too short' )
        .check( x => x.length < 20, 'Name is too long' );

    $state.at('email').check(isRequired).check(isEmail);

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = Link.getErrors({ $name, $email });
        console.log(errors);

        // const $testE = $state.at('email');
        // Link.setValues({ $name, $email }, { name : "efsefse", test : 'sefsefsef'});
        // $name.set('sfsefsefsefsef');

        // if (!state.email) return;

        // Save current URL so user is redirected back here after signing in
        // const cookies = new Cookies();
        // cookies.set('redirect_url', window.location.pathname, { path: '/' });

        // AuthService.login(state.email, state.password)
        // .then(data => {
        //     console.log(data.token);
        //     dispatch({ type : 'loginSuccess', payload : data });
        //     router.push('/account');
        // }).catch(err => {
        //     console.log(err);
        // });
    };

    return (
        <Layout>
            <Container>
                <Form className="auth_form" onSubmit={handleSubmit}>
                    <h1>Connexion</h1>
                    <div className="form_container">
                        <InputControlled
                            required
                            type="email"
                            label="Email"
                            $flag={$state.at('email')}
                            placeholder="Email address"
                        />
                        <InputControlled
                            required
                            label="Name"
                            $flag={$name}
                        />
                        <InputControlled required
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
