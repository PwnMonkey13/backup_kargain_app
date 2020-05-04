import React, { useContext } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import { EmailInput, PasswordInput } from '../../components/Form/Inputs'
import FieldWrapper from '../../components/Form/FieldWrapper'
import { Col, Row } from 'reactstrap'
import Link from 'next/link'
import Divider from '../../components/Divider'
import AuthService from '../../services/AuthService'
import { ModalDialogContext } from '../../context/ModalDialogContext'
import { UserContext } from '../../context/UserContext'

const formConfig = {
    mode: 'onChange',
    validateCriteriaMode: 'all'
}

const LoginPage = () => {
    const { dispatchModal, dispatchModalError } = useContext(ModalDialogContext)
    const { control, errors, setValue, getValues, formState, watch, register, handleSubmit } = useForm(formConfig)

    const onSubmit = (form) => {
        AuthService.forgotPassword(form.email)
            .then(() => {
                dispatchModal({ msg: `An email had been sent to ${form.email}`, persist: true })
            }).catch(err => {
                dispatchModalError({ err, msg: 'User not found' })
            }
            )
    }

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
                    <button className="btn btn-outline-primary" type="submit">Demander un nouveau mot de passe</button>
                </div>

            </form>
        </main>
    )
}

export default LoginPage
