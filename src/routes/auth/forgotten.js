import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { EmailInput } from '../../components/Form/Inputs';
import FieldWrapper from '../../components/Form/FieldWrapper';
import AuthService from '../../services/AuthService';
import { ModalDialogContext } from '../../context/ModalDialogContext';
import CTAButton from '../../components/CTAButton';
import { useAuth } from '../../context/AuthProvider';
import useTranslation from 'next-translate/useTranslation'

const ForgottenForm = () => {
    const { t } = useTranslation()
    const { authenticatedUser } = useAuth();
    const { dispatchModal, dispatchModalError } = useContext(ModalDialogContext);
    const { control, errors, handleSubmit } = useForm({
        mode: 'onChange',
        validateCriteriaMode: 'all',
        defaultValues: authenticatedUser.getRaw
    });

    const onSubmit = (form) => {
        AuthService.forgotPassword(form.email)
            .then(() => {
                dispatchModal({
                    msg: t('vehicles:email_had_been_sent_to_{email}', {email : form.email}),
                    persist: true
                });
            }).catch(err => {
                dispatchModalError({ err });
            });
    };

    return (
        <main>
            <h1>{t('vehicles:password-forgotten')}</h1>
            <form className="mt-3 mx-auto"
                onSubmit={handleSubmit(onSubmit)}
                style={{ maxWidth: '500px' }}>

                <FieldWrapper label={t('vehicles:email_address')} center>
                    <EmailInput
                        name="email"
                        errors={errors}
                        control={control}
                        rules={{ required: t('form_validations:required')}}
                    />
                </FieldWrapper>

                <div className="submit">
                    <CTAButton
                        title={t('vehicles:ask_new_password')}
                        submit
                    />
                </div>
            </form>
        </main>
    );
};

export default ForgottenForm;
