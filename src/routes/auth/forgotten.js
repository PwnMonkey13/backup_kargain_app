import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { EmailInput } from '../../components/Form/Inputs';
import FieldWrapper from '../../components/Form/FieldWrapper';
import AuthService from '../../services/AuthService';
import { ModalDialogContext } from '../../context/ModalDialogContext';
import CTAButton from '../../components/CTAButton';

const formConfig = {
    mode: 'onChange',
    validateCriteriaMode: 'all',
};

const LoginPage = () => {
    const { dispatchModal, dispatchModalError } = useContext(ModalDialogContext);
    const { control, errors, handleSubmit } = useForm(formConfig);

    const onSubmit = (form) => {
        AuthService.forgotPassword(form.email)
            .then(() => {
                dispatchModal({
                    msg: `An email had been sent to ${form.email}`,
                    persist: true,
                });
            }).catch(err => {
                dispatchModalError({
                    err,
                    // msg: 'User not found',
                });
            },
        );
    };

    return (
        <main>
            <h1>Mot de passe oublié</h1>
            <form className="mt-3 mx-auto" style={{ maxWidth: '500px' }} onSubmit={handleSubmit(onSubmit)}>

                <FieldWrapper label="Email" required center>
                    <EmailInput
                        name="email"
                        inline
                        errors={errors}
                        control={control}
                    />
                </FieldWrapper>

                <div className="submit">
                    <CTAButton
                        title="Demander un nouveau mot de passe"
                        submit
                    />
                </div>
            </form>
        </main>
    );
};

export default LoginPage;
