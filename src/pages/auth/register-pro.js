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

const formConfig = {
    mode: 'onChange',
    reValidateMode: 'onChange',
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
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <TextInput
                            label="Nom de société"
                            name="company_name"
                            required
                            inline
                            register={register({required : 'Required'})}
                        />
                        <TextInput
                            label="SIREN de la société"
                            name="company_ID"
                            required
                            inline
                            register={register({required : 'Required'})}
                        />
                        <TextInput
                            label="Gérant de la société"
                            name="company_owner"
                            required
                            inline
                            register={register({required : 'Required'})}
                        />
                        <SelectInput
                            label="Pays"
                            name="address.country"
                            required
                            inline
                            control={control}
                            register={register({required : 'Required'})}
                            options={[
                                { value: 'france', label: 'France' },
                                { value: 'spain', label: 'Espagne' },
                                { value: 'italie', label: 'Italie' }
                            ]}
                        />
                        <TextInput
                            label="Ville ou code postal"
                            name="address.postalcode"
                            required
                            inline
                            register={register({required : 'Required'})}
                        />
                        <TextInput
                            label="Adresse"
                            name="address.address"
                            required
                            inline
                            register={register({required : 'Required'})}
                        />
                        <TextInput
                            label="Nom"
                            name="lastname"
                            required
                            inline
                            register={register({required : 'Required'})}
                        />
                        <TextInput
                            label="Prénom"
                            name="firstname"
                            required
                            inline
                            register={register({required : 'Required'})}
                        />
                        <EmailInput
                            label="Email"
                            name="email"
                            required
                            inline
                            register={register({required : 'Required'})}
                        />
                        <PasswordInput
                            label="Mot de passe"
                            name="password"
                            required
                            inline
                            register={register({required : 'Required'})}
                        />
                        <PasswordInput
                            label="Confirmer mot de passe"
                            name="confirm_pwd"
                            required
                            inline
                            register={register({
                                required : 'Required',
                                validate: {
                                    matchesPreviousPassword: (value) => {
                                        const { password } = getValues();
                                        return password === value || 'Passwords should match!';
                                    },
                                }
                            })}
                        />
                        <CheckBoxInput
                            label="J’ai lu et j’accepte les conditions générales d’utilisation"
                            name="confirm"
                            required
                            inline
                            register={register({
                                required : 'Required',
                            })}
                        />
                    </form>
                </Col>
            </Row>
        </main>
    );
};

export default RegisterPro;
