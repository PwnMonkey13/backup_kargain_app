import React, { useContext } from 'react';
import { useRouter } from "next/router";
import Link from "next/link";
import {Col,Row} from 'reactstrap';
import {useForm} from "react-hook-form";
import { UserContext } from '../../components/Context/UserContext';
import AuthService from '../../services/AuthService'
import Divider from "../../components/Form/Divider";
import {ModalDialogContext} from "../../components/Context/ModalDialogContext";
import {TextInput, SelectInput, EmailInput, PasswordInput, CheckBoxInput} from "../../components/Form/Inputs";
import styled from "styled-components";
import FieldWrapper from "../../components/Form/FieldWrapper";

const formConfig = {
    mode: 'onChange',
    validateCriteriaMode: "all",
};

const RegisterPro = () => {
    const router = useRouter();
    const {control, errors, setValue, getValues, formState, watch, register, handleSubmit} = useForm(formConfig);
    const { dispatch } = useContext(UserContext);
    const {dispatchModal} = useContext(ModalDialogContext);
    const { redirect } = router.query;

    const onSubmit = async (e, data) => {
        AuthService.registerPro(data)
            .then(data => {
                dispatch({ type : 'registerProSuccess', payload : data });
                if (redirect) router.push({pathname: redirect});
                else router.push(`/auth/callback?redirect=/profile/${data.user.username}`);
            }).catch(err => {
                dispatchModal({type: 'error', err});
        });
    };

    const Main = styled.main`
        padding : 1rem
    `;

    const Left = styled.div`
        display:flex;
        flex-direction:column
    `;

    const AuthForm = styled.form`
        max-width: 40rem;
        margin: 3rem auto;
    `;

    return (
        <Main>
            <h1>Créer un compte Pro</h1>
            <Row>
                <Col className="m-auto" sm="12" md="5">
                    <Left>
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
                    </Left>
                </Col>
                <Col className="m-auto" sm="12" md="7">
                    <AuthForm onSubmit={handleSubmit(onSubmit)}>

                        <FieldWrapper label="Nom de société">
                            <TextInput
                                name="company_name"
                                errors={errors}
                                control={control}
                                rules={{required : 'Required'}}
                            />
                        </FieldWrapper>

                        <FieldWrapper label="SIREN de la société">
                            <TextInput
                                name="company_ID"
                                errors={errors}
                                control={control}
                                rules={{required : 'Required'}}
                            />
                        </FieldWrapper>

                        <FieldWrapper label="Gérant de la société">
                            <TextInput
                                name="company_owner"
                                errors={errors}
                                control={control}
                                rules={{required : 'Required'}}
                            />
                        </FieldWrapper>

                        <FieldWrapper label="Pays">
                            <SelectInput
                                label=""
                                name="address.country"
                                errors={errors}
                                control={control}
                                rules={{required : 'Required'}}
                                options={[
                                    { value: 'france', label: 'France' },
                                    { value: 'spain', label: 'Espagne' },
                                    { value: 'italie', label: 'Italie' }
                                ]}
                            />
                        </FieldWrapper>

                        <FieldWrapper label="Ville ou code postal">
                            <TextInput
                                name="address.postalcode"
                                errors={errors}
                                control={control}
                                rules={{required : 'Required'}}
                            />
                        </FieldWrapper>

                        <FieldWrapper label="Adresse">
                            <TextInput
                                name="address.address"
                                errors={errors}
                                control={control}
                                rules={{required : 'Required'}}
                            />
                        </FieldWrapper>

                        <FieldWrapper label="Nom">
                            <TextInput
                                name="lastname"
                                errors={errors}
                                control={control}
                                rules={{required : 'Required'}}
                            />
                        </FieldWrapper>

                        <FieldWrapper label="Prénom">
                            <TextInput
                                name="firstname"
                                errors={errors}
                                control={control}
                                rules={{required : 'Required'}}
                            />
                        </FieldWrapper>

                        <FieldWrapper label="Email">
                            <EmailInput
                                name="email"
                                errors={errors}
                                control={control}
                                rules={{required : 'Required'}}
                            />
                        </FieldWrapper>

                        <FieldWrapper label="Mot de passe">
                            <PasswordInput
                                name="password"
                                errors={errors}
                                control={control}
                                rules={{required : 'Required'}}
                            />
                        </FieldWrapper>

                        <FieldWrapper label="Confirmer mot de passe">
                            <PasswordInput
                                name="confirm_pwd"
                                errors={errors}
                                control={control}
                                rules={{
                                    required : 'Required',
                                    validate: {
                                        matchesPreviousPassword: (value) => {
                                            const { password } = getValues();
                                            return password === value || 'Passwords should match!';
                                        },
                                    }
                                }}
                            />
                        </FieldWrapper>

                        <FieldWrapper>
                            <CheckBoxInput
                                label="J’ai lu et j’accepte les conditions générales d’utilisation"
                                name="confirm"
                                errors={errors}
                                control={control}
                                rules={{required : 'Required'}}
                            />
                        </FieldWrapper>
                    </AuthForm>
                </Col>
            </Row>
        </Main>
    );
};

export default RegisterPro;
