import React, { useContext } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { PasswordInput } from '../../components/Form/Inputs'
import FieldWrapper from '../../components/Form/FieldWrapper'
import AuthService from '../../services/AuthService'
import { ModalDialogContext } from '../../components/Context/ModalDialogContext'

const formConfig = {
    mode: 'onChange',
    validateCriteriaMode: 'all'
}

const ResetPassword = (props) => {
    const router = useRouter()
    const { redirect, token } = router.query
    const { dispatchModal, dispatchModalError } = useContext(ModalDialogContext)
    const { control, errors, setValue, getValues, formState, watch, register, handleSubmit } = useForm(formConfig)

    const onSubmit = (form) => {
        if (!token) return dispatchModal({ type: 'error', err: 'Invalid' })
        AuthService.resetPassword(token, form.password)
            .then(() => {
                dispatchModal({ msg: 'password reinitialized', persist: true })
                if (redirect) router.push({ pathname: redirect })
            }).catch(err => {
                dispatchModalError({ err })
                if (redirect) router.push({ pathname: redirect })
            }
            )
    }

    return (
        <main>
            <h1>Réinitialiser mot de passe</h1>
            <form className="mt-3 mx-auto" onSubmit={handleSubmit(onSubmit)}>

                <FieldWrapper label="Mot de passe" required>
                    <PasswordInput
                        name="password"
                        errors={errors}
                        control={control}
                        rules={{ required: 'Required' }}
                    />
                </FieldWrapper>

                <FieldWrapper label="Confirmer mot de passe" required>
                    <PasswordInput
                        name="confirm_pwd"
                        errors={errors}
                        control={control}
                        rules={{
                            required: 'Required',
                            validate: {
                                matchesPreviousPassword: (value) => {
                                    const { password } = getValues()
                                    return password === value || 'Passwords should match!'
                                }
                            }
                        }}
                    />
                </FieldWrapper>

                <div className="submit">
                    <button className="btn btn-outline-primary" type="submit">Se connecter</button>
                </div>
            </form>
        </main>
    )
}

export default ResetPassword
