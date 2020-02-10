import React, { useState, useContext } from 'react';
import { useRouter } from "next/router";
import { Container } from 'reactstrap'
import Layout from '../../layouts/Layout';
import FormPanel from '../../components/form/FormPanel';
import AuthService from '../../services/AuthService';
import { UserContext } from '../../components/Context/UserContext';
import {ModalDialogContext} from "../../components/Context/ModalDialogContext";
import model from '../../components/form/Models/login.model';

const LoginPage = () => {
    const { dispatch } = useContext(UserContext);
    const { dispatchModal } = useContext(ModalDialogContext);
    const router = useRouter();
    const { redirect } = router.query;

    const handleSubmit = () => {
        const state = model.reduce((carry, m) => { return { ...carry, [m.name] : m.value }}, {});
        AuthService.login(state.email, state.password)
            .then(data => {
                dispatch({ type : 'loginSuccess', payload : data });
                if(redirect) router.push({ pathname : redirect});
                else router.push(`/profile/${data.user.username}`);
            }).catch(err => {
                dispatchModal({type : 'error', err});
                if(redirect) router.push({ pathname : redirect});
            }
        );
    };

    return (
        <Layout>
            <Container>
                <div className="auth_form m-auto">
                    <h1>Se connecter</h1>
                    <FormPanel
                        btnName="Connection"
                        submitCallback={handleSubmit}
                        model={model}
                    />
                </div>
            </Container>
        </Layout>
    );
};

export default LoginPage;
