import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import querystring from 'querystring';
import { Col, Row } from 'reactstrap';
import AuthService from '../../services/AuthService';
import FieldWrapper from '../../components/Form/FieldWrapper';
import { EmailInput } from '../../components/Form/Inputs';

import { ModalDialogContext } from '../../context/ModalDialogContext';
import Loader from '../../components/Loader';

const ConfirmAccount = () => {
    const router = useRouter();
    const { token } = router.query;
    const { dispatchModal, dispatchModalError } = useContext(ModalDialogContext);
    const { control, errors, handleSubmit } = useForm({
        mode: 'onChange',
        validateCriteriaMode: 'all',
    });

    const onSubmitAskForActivation = (form) => {
        const { email } = form;
        AuthService.askForEmailActivation(email)
            .then(() => {
                dispatchModal({ msg: 'Email activation send to your email box' });
            }).catch(err => {
                dispatchModalError({ err });
            },
        );
    };

    useEffect(() => {
        if (!token) return;
        AuthService.confirmAccount(token)
            .then(() => {
                router.push('/auth/callback?redirect=/auth/login');
            })
            .catch(err => {
                const action = err.name === 'AlreadyActivatedError' ? 'already-activated' : 'activation-invalid';
                const redirect = `/auth/error?${querystring.stringify({ action })}`;
                router.push(`/auth/callback?redirect=${redirect}`);
            });
    }, []);

    if (!token) {
        return (
            <>
                <h1>Activer mon compte Kargain</h1>
                <Row className="justify-content-center">
                    <Col sm={12} md={6} lg={6}>
                        <form className="p-3 mt-3 mx-auto" onSubmit={handleSubmit(onSubmitAskForActivation)}>
                            <FieldWrapper label="Email" required>
                                <EmailInput
                                    name="email"
                                    inline
                                    errors={errors}
                                    control={control}
                                />
                            </FieldWrapper>
                            <div className="submit">
                                <button className="btn btn-outline-primary" type="submit">Activer mon compte</button>
                            </div>
                        </form>
                    </Col>
                </Row>
            </>
        );
    } else {
        return <Loader/>;
    }
};

export default ConfirmAccount;
