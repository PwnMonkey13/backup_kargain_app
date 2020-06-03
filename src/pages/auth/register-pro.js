import React, { useContext } from 'react';
import Link from 'next/link';
import { Col, Row } from 'reactstrap';
import { useForm } from 'react-hook-form';
import AuthService from '../../services/AuthService';
import Divider from '../../components/Divider';
import { ModalDialogContext } from '../../context/ModalDialogContext';
import { CheckBoxInput, EmailInput, PasswordInput, TextInput } from '../../components/Form/Inputs';
import FieldWrapper from '../../components/Form/FieldWrapper';
import GeoStreetsInput from '../../components/Form/Inputs/GeoAddressSearchInput';
import Typography from '@material-ui/core/Typography';
import SelectCountryFlags from '../../components/Form/Inputs/SelectCountryFlags';
import Spacer from '../../components/Spacer';
import CTALink from '../../components/CTALink';

const formConfig = {
    mode: 'onChange',
    validateCriteriaMode: 'all',
};

const RegisterPro = () => {
    const { control, errors, setValue, getValues, formState, watch, register, handleSubmit } = useForm(formConfig);
    const { dispatchModal, dispatchModalError } = useContext(ModalDialogContext);

    const onSubmit = (form) => {
        const { confirm, confirmPwd, ...data } = form;
        AuthService.registerPro(data)
            .then(() => {
                dispatchModal({
                    persist: true,
                    msg: 'Account created. Please check your email box to validate your account',
                });
            }).catch(err => {
            dispatchModalError({ err });
        });
    };

    const countrySelect = watch('countrySelect');

    return (
        <>
            <h1>Créer un compte Pro</h1>
            <Row>
                <Col sm="12" md="5">
                    <div className="d-flex flex-column mx-auto" style={{ maxWidth : '400px'}}>
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
                        <CTALink
                            className="my-2"
                            title="Se connecter"
                            href="/auth/login"
                        />
                        <CTALink
                            className="my-2"
                            title="Creer un compte client"
                            href="/auth/register"
                        />
                    </div>
                </Col>

                <Col className="m-auto" sm="12" md="7">
                    <style jsx>{`
                        form{
                            border-radius : 5px; 
                            border : 1px solid gainsboro;
                            max-width : 500px
                        }
                    `}
                    </style>
                    <form className="p-3 mt-3 mx-auto" onSubmit={handleSubmit(onSubmit)}>

                        <Typography component="h3" variant="h3">Votre société</Typography>
                        <FieldWrapper label="Raison sociale">
                            <TextInput
                                name="company.name"
                                errors={errors}
                                control={control}
                                rules={{ required: 'Required' }}
                            />
                        </FieldWrapper>

                        <FieldWrapper label="SIREN">
                            <TextInput
                                name="company.siren"
                                errors={errors}
                                control={control}
                                rules={{ required: 'Required' }}
                            />
                        </FieldWrapper>

                        <FieldWrapper label="Pays">
                            <SelectCountryFlags
                                name="countrySelect"
                                errors={errors}
                                control={control}
                            />
                        </FieldWrapper>

                        {countrySelect && countrySelect.value === 'FR' ? (
                            <FieldWrapper label="Ville ou code postal">
                                <GeoStreetsInput
                                    name="address"
                                    enableGeoloc
                                    long={coordinates?.[0]}
                                    lat={coordinates?.[1]}
                                    control={control}
                                    errors={errors}
                                    rules={{ required: 'Required' }}
                                    inputProps={{
                                        placeholder: '10 avenue du Prado, 13008 Marseille',
                                    }}
                                />
                            </FieldWrapper>
                        ) : (
                            <>
                                <FieldWrapper label="Ville">
                                    <TextInput
                                        name="address.city"
                                        errors={errors}
                                        control={control}
                                        rules={{ required: 'Required' }}
                                    />
                                </FieldWrapper>

                                <FieldWrapper label="Adresse">
                                    <TextInput
                                        name="address.street"
                                        errors={errors}
                                        control={control}
                                        rules={{ required: 'Required' }}
                                    />
                                </FieldWrapper>
                            </>
                        )}

                        <Spacer bottom="30"/>
                        <Typography component="h3" variant="h3">Vous </Typography>

                        <FieldWrapper label="Nom">
                            <TextInput
                                name="lastname"
                                errors={errors}
                                control={control}
                                rules={{ required: 'Required' }}
                            />
                        </FieldWrapper>

                        <FieldWrapper label="Prénom">
                            <TextInput
                                name="firstname"
                                errors={errors}
                                control={control}
                                rules={{ required: 'Required' }}
                            />
                        </FieldWrapper>

                        <FieldWrapper label="Email">
                            <EmailInput
                                name="email"
                                errors={errors}
                                control={control}
                                rules={{ required: 'Required' }}
                            />
                        </FieldWrapper>

                        <FieldWrapper label="Mot de passe">
                            <PasswordInput
                                name="password"
                                errors={errors}
                                control={control}
                                rules={{
                                    required: 'field required',
                                    minLength: {
                                        value: 6,
                                        message: 'Min 6 chars',
                                    },
                                    // pattern: { value : /^(?=.*\d).{4,8}$/, message : 'Invalid password : Min must length 4 - 8 and include 1 number at least' }
                                }}
                            />
                        </FieldWrapper>

                        <FieldWrapper label="Confirmer mot de passe">
                            <PasswordInput
                                name="confirmPwd"
                                errors={errors}
                                control={control}
                                rules={{
                                    required: 'Required',
                                    minLength: {
                                        value: 6,
                                        message: 'Min 6 chars',
                                    },
                                    validate: {
                                        matchesPreviousPassword: (value) => {
                                            const { password } = getValues();
                                            return password === value || 'Passwords should match!';
                                        },
                                    },
                                }}
                            />
                        </FieldWrapper>

                        <FieldWrapper>
                            <CheckBoxInput
                                label="J’ai lu et j’accepte les conditions générales d’utilisation"
                                name="confirm"
                                errors={errors}
                                control={control}
                                rules={{ required: 'Required' }}
                            />
                        </FieldWrapper>
                    </form>
                </Col>
            </Row>
        </>
    );
};

export default RegisterPro;
