import React, { useState, useContext } from 'react';
import { Container, Form } from 'reactstrap'
import { useRouter } from "next/router";
import {useLink} from "valuelink";

import Layout from '../../layouts/Layout';
import InputControlled from '../../components/form/InputControlled';
import FormGroupCustom from '../../components/form/FormGroupCustom'
import { UserContext } from '../../components/Context/UserContext';
import AuthService from '../../services/AuthService'
import Link from "next/link";

const LoginPage = () => {
    const { dispatch } = useContext(UserContext);
    const router = useRouter();
    const $state = useLink({
        email : '',
        company_name : '',
        company_ID : '',
        company_owner: '',
        country : '',
        city : '',
        postalcode : '',
        adresse : '',
        tel : '',
        username : '',
        password : '',
        confirm_pwd : '',
        file_kbis : null,
        file_id : null,
        accept_legal : false,
        }
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        const state = $state.value;
        if (!state.email) return;

        AuthService.registerPro(state.email, state.password)
            .then(data => {
                dispatch({ type : 'registerProSuccess', payload : data });
                router.push('/account');
            }).catch(err => {
            console.log(err);
        });
    };

    return (
        <Layout>
            <Container>

                <FormGroupCustom.Row>
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
                </FormGroupCustom.Row>

                <Form className="auth_form" onSubmit={handleSubmit}>
                    <h1>Connexion</h1>
                    <div className="form_container">
                        <InputControlled required
                            type="email"
                            label="Email"
                            $flag={$state.at('email')}
                        />
                        <InputControlled required
                            label="Nom de société"
                            $flag={$state.at('company_name')}
                        />
                        <InputControlled required
                            label="ID société"
                            $flag={$state.at('company_ID')}
                        />
                        <InputControlled required
                            label="Gérant de la société"
                            $flag={$state.at('company_owner')}
                        />
                        <InputControlled required
                            label="Pays"
                            $flag={$state.at('country')}
                        />
                        <InputControlled required
                            label="Ville"
                            $flag={$state.at('city')}
                        />
                        <InputControlled required
                            label="Code Postal"
                            $flag={$state.at('postalcode')}
                        />
                        <InputControlled required
                            label="Adresse"
                            $flag={$state.at('adresse')}
                        />
                        <InputControlled required
                            type="tel"
                            label="Téléphone"
                            $flag={$state.at('tel')}
                        />
                        <InputControlled required
                            label="Nom d'utilisateur"
                            $flag={$state.at('username')}
                        />
                        <InputControlled required
                            type="password"
                            label="Mot de passe"
                            $flag={$state.at('password')}
                        />
                        <InputControlled required
                            type="password"
                            label="Confirmer mot de passe"
                            $flag={$state.at('confirm_pwd')}
                        />
                        <InputControlled
                            type="file"
                            label="Copie de l’extrait kbis de société"
                            $flag={$state.at('file_kbis')}
                        />
                        <InputControlled
                            type="file"
                            label="Copie de la pièce identité du gérant"
                            $flag={$state.at('file_id')}
                        />
                        <InputControlled
                            label="J’ai lu et j’accepte les conditions générales d’utilisation"
                            type="checkbox"
                            required
                            $flag={$state.at('accept_legal')}
                        />

                        <FormGroupCustom className="submit">
                            <button className="btn btn-outline-primary" type="submit">S'enregistrer</button>
                        </FormGroupCustom>
                    </div>
                </Form>
            </Container>
        </Layout>
    );
};

export default LoginPage;
