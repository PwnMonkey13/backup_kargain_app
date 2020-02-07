import React, {useContext} from 'react';
import Link from "next/link";
import {useRouter} from "next/router";
import {Container, Col, Row} from 'reactstrap'
import Layout from '../../layouts/Layout';
import {UserContext} from '../../components/Context/UserContext';
import {ModalDialogContext} from '../../components/Context/ModalDialogContext';
import Divider from '../../components/form/Divider'
import FormPanel from "../../components/form/FormPanel";
import AuthService from '../../services/AuthService'
import model from "../../components/form/Models/register.model"

const LoginPage = () => {
    const {dispatch} = useContext(UserContext);
    const {dispatchModal} = useContext(ModalDialogContext);
    const router = useRouter();

    const handleSubmit = () => {
        const state = model.reduce((carry, m) => {
            return {...carry, [m.name]: m.value}
        }, {});
        AuthService.register(state)
            .then(data => {
                    dispatch({type: 'set', payload: {user: {email: data.document.email}}});
                    router.push('/auth/check-email');
                }
            )
            .catch(err => {
                dispatchModal({type: 'error', err});
            })
    };

    return (
        <Layout>
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

                    <Link href="/auth/register-pro">
                        <button className="btn btn-outline-primary submit">
                            S'enregistrer en tant que Pro
                        </button>
                    </Link>

                    <Divider text="or"/>

                </Col>
                <Col className="auth_form m-auto" sm="12" md="7">
                    <FormPanel
                        btnName="S'enregistrer"
                        submitCallback={handleSubmit}
                        model={model}
                    />
                </Col>
            </Row>
        </Layout>
    );
};

export default LoginPage;
