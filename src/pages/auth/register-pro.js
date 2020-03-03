import React, { useContext } from 'react';
import { useRouter } from "next/router";
import Link from "next/link";
import {Col,Row} from 'reactstrap'
import { UserContext } from '../../components/Context/UserContext';
import AuthService from '../../services/AuthService'
import Divider from "../../components/Form/Divider";
import FormPanel from "../../components/Form/FormPanel";
import model from "../../components/Form/Models/register-pro.model";
import {ModalDialogContext} from "../../components/Context/ModalDialogContext";

const RegisterPro = () => {
    const router = useRouter();
    const { dispatch } = useContext(UserContext);
    const {dispatchModal} = useContext(ModalDialogContext);
    const { redirect } = router.query;

    const handleSubmit = async (e, data) => {
        AuthService.registerPro(data)
            .then(data => {
                dispatch({ type : 'registerProSuccess', payload : data });
                if (redirect) router.push({pathname: redirect});
                else router.push(`/auth/callback?redirect=/profile/${data.user.username}`);
            }).catch(err => {
                dispatchModal({type: 'error', err});
        });
    };

    return (
        <main>
            <h1>Créer un compte Pro</h1>
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
                    <Link href="/auth/register">
                        <a className="btn btn-outline-primary submit">
                            Creer un compte client
                        </a>
                    </Link>
                </Col>
                <Col className="auth_form m-auto" sm="12" md="7">
                    <FormPanel
                        btnName="S'enregistrer"
                        submitCallback={handleSubmit}
                        model={model}
                    />
                </Col>
            </Row>
        </main>
    );
};

export default RegisterPro;
