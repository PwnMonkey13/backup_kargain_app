import React, { useContext } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { useForm } from 'react-hook-form';
import useTranslation from 'next-translate/useTranslation';
import AuthService from '../../services/AuthService';
import { ModalDialogContext } from '../../context/ModalDialogContext';
import { CheckBoxInput, EmailInput, PasswordInput, TextInput } from '../../components/Form/Inputs';
import FieldWrapper from '../../components/Form/FieldWrapper';
import GeoStreetsInput from '../../components/Form/Inputs/GeoAddressSearchInput';
import Typography from '@material-ui/core/Typography';
import SelectCountryFlags from '../../components/Form/Inputs/SelectCountryFlags';
import Spacer from '../../components/Spacer';
import SSOProviders from '../../components/SSOProviders';
import useAddress from '../../hooks/useAddress';

const formConfig = {
    mode: 'onChange',
    validateCriteriaMode: 'all',
};

const RegisterPro = () => {
    const { control, errors, getValues, watch, handleSubmit } = useForm(formConfig);
    const { dispatchModal, dispatchModalError } = useContext(ModalDialogContext);
    const [, , coordinates] = useAddress();
    const { t } = useTranslation();

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
        <Container>
            <h1>{t('vehicles:register-pro')}</h1>
            <Row>
                <Col className="m-auto" sm="12" md="6">
                    <SSOProviders/>
                    <form className="p-3 mx-auto" style={{
                        borderRadius: '5px',
                        maxWidth: '500px',
                    }}>

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

                        <FieldWrapper label={t('vehicles:country')}>
                            <SelectCountryFlags
                                name="countrySelect"
                                errors={errors}
                                control={control}
                            />
                        </FieldWrapper>

                        {countrySelect && countrySelect.value === 'FR' ? (
                            <FieldWrapper label={t('vehicles:address')}>
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
                                <FieldWrapper label={t('vehicles:city')}>
                                    <TextInput
                                        name="address.city"
                                        errors={errors}
                                        control={control}
                                        rules={{ required: 'Required' }}
                                    />
                                </FieldWrapper>

                                <FieldWrapper label={t('vehicles:address')}>
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

                        <FieldWrapper label={t('vehicles:lastname')}>
                            <TextInput
                                name="lastname"
                                errors={errors}
                                control={control}
                                rules={{ required: 'Required' }}
                            />
                        </FieldWrapper>

                        <FieldWrapper label={t('vehicles:firstname')}>
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

                        <FieldWrapper label={t('vehicles:password')}>
                            <PasswordInput
                                name="password"
                                errors={errors}
                                control={control}
                                rules={{
                                    required: 'Required',
                                    minLength: {
                                        value: 6,
                                        message: 'Min 6 chars',
                                    },
                                    // pattern: { value : /^(?=.*\d).{4,8}$/, message : 'Invalid password : Min must length 4 - 8 and include 1 number at least' }
                                }}
                            />
                        </FieldWrapper>

                        <FieldWrapper label={t('vehicles:password-confirm')}>
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
                                label={t('vehicles:accept-cgu')}
                                name="confirm"
                                errors={errors}
                                control={control}
                                rules={{ required: 'Required' }}
                            />
                        </FieldWrapper>
                    </form>
                </Col>
            </Row>
        </Container>
    );
};

export default RegisterPro;
