import React, { useState, useContext } from 'react';
import axioswal from 'axioswal';
import Layout from '../../layouts/Layout';
import redirectTo from '../../libs/redirectTo';
import { UserContext } from '../../components/UserContext';
import { Container, Form } from 'reactstrap'
import InputControlled from '../../components/form/InputControlled';
import FormGroupCustom from '../../components/form/FormGroupCustom'
import {useLink} from "valuelink";

const LoginPage = () => {
    const { dispatch } = useContext(UserContext);
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

    const handleSubmit = (event) => {
        const state = $state.value;
        event.preventDefault();
        axioswal
            .post('/api/authenticate', {
                email : state.email,
                password : state.password,
            })
            .then((data) => {
                if (data.status === 'ok') {
                    dispatch({ type: 'fetch' });
                    redirectTo('/');
                }
            });
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
                            label="Nom de société"
                            required
                            $flag={$state.at('company_name')}
                        />
                        <InputControlled
                            label="ID société"
                            required
                            $flag={$state.at('company_ID')}
                        />
                        <InputControlled
                            label="Gérant de la société"
                            required
                            $flag={$state.at('company_owner')}
                        />
                        <InputControlled
                            label="Pays"
                            required
                            $flag={$state.at('country')}
                        />
                        <InputControlled
                            label="Ville"
                            required
                            $flag={$state.at('city')}
                        />
                        <InputControlled
                            label="Code Postal"
                            required
                            $flag={$state.at('postalcode')}
                        />
                        <InputControlled
                            label="Adresse"
                            required
                            $flag={$state.at('adresse')}
                        />
                        <InputControlled
                            label="Téléphone"
                            required
                            $flag={$state.at('tel')}
                        />
                        <InputControlled
                            label="Nom d'utilisateur"
                            required
                            $flag={$state.at('username')}
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
                            type="file"
                            label="Copie de l’extrait kbis de société"
                            required
                            $flag={$state.at('username')}
                        />
                        <InputControlled
                            type="file"
                            label="Copie de la pièce identité du gérant"
                            required
                            $flag={$state.at('username')}
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
                    </div>
                </Form>
            </Container>
        </Layout>
    );
};

export default LoginPage;
