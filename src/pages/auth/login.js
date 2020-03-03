import React, { useState, useContext, useEffect } from 'react';
import { useRouter } from "next/router";
import Link from "next/link";
// import Cookies from 'js-cookie';
import { withCookies, Cookies } from 'react-cookie';
import FormPanel from '../../components/Form/FormPanel';
import AuthService from '../../services/AuthService';
import { UserContext } from '../../components/Context/UserContext';
import {ModalDialogContext} from "../../components/Context/ModalDialogContext";
import model from '../../components/Form/Models/login.model';
import {Col, Row} from "reactstrap";
import Divider from "../../components/Form/Divider";

const LoginPage = (props) => {
    const {cookies} = props;
    console.log(cookies);
    const router = useRouter();
    const { dispatch } = useContext(UserContext);
    const { dispatchModal } = useContext(ModalDialogContext);
    const { redirect } = router.query;

    useEffect(()=> {
        cookies.remove('token');
        dispatch({type: 'logout'});
    },[]);

    const handleSubmit = async (e, data) => {
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
        <main>
            <h1>Se connecter</h1>
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
                </Col>
                <Col className="auth_form m-auto" sm="12" md="7">
                    <FormPanel
                        btnName="Connection"
                        submitCallback={handleSubmit}
                        model={model}
                    />
                </Col>
            </Row>
        </main>
    );
};

export default withCookies(LoginPage);
