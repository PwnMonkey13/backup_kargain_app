import React, { useContext, useEffect } from 'react';
import Link from 'next-translate/Link';
import { useForm } from 'react-hook-form';
import { Col, Row } from 'reactstrap';
import nextCookies from 'next-cookies';
import useTranslation from 'next-translate/useTranslation';
import { EmailInput, PasswordInput } from '../../components/Form/Inputs';
import { ModalDialogContext } from '../../context/ModalDialogContext';
import FieldWrapper from '../../components/Form/FieldWrapper';
import SSOProviders from '../../components/SSOProviders';
import CTAButton from '../../components/CTAButton';
import AuthService from '../../services/AuthService';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthProvider';

export default ({ forceLogout }) => {
    const router = useRouter();
    const { redirect } = router.query;
    const { logout } = useAuth();
    const { dispatchModalError } = useContext(ModalDialogContext);
    const { t } = useTranslation();
    const { control, errors, handleSubmit } = useForm({
        mode: 'onChange',
        validateCriteriaMode: 'all',
    });

    useEffect(() => {
        if (forceLogout) logout();
    }, []);

    const onSubmit = (form) => {
        const { email, password } = form;
        AuthService.login({
            email,
            password,
        })
            .then(user => {
                if (redirect) {
                    router.push(`/auth/callback?redirect=${redirect}`);
                } else {
                    const isAdmin = user.isAdmin;
                    if (isAdmin) {
                        router.push(`/auth/callback?redirect=/admin`);
                    } else {
                        router.push(`/auth/callback?redirect=/profile/${user.username}`);
                    }
                }
            }).catch(err => {
                dispatchModalError({ err });
                if (redirect) router.push({ pathname: redirect });
            },
        );
    };

    return (
        <>
            <h1>{t('vehicles:login')}</h1>
            <Row>
                <Col className="m-auto" sm="12" md="6">
                    <SSOProviders/>
                    <form className="p-3 mx-auto"
                          onSubmit={handleSubmit(onSubmit)}
                          style={{
                              borderRadius: '5px',
                              maxWidth: '500px',
                          }}
                    >

                        <FieldWrapper label="Email">
                            <EmailInput
                                name="email"
                                inline
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

                        <div className="text-right">
                            <Link href="/auth/forgotten">
                                <a className="">{t('vehicles:password-forgotten')} </a>
                            </Link>
                        </div>

                        <div className="submit">
                            <CTAButton
                                title={t('vehicles:login')}
                                submit
                            />
                        </div>
                    </form>
                </Col>
            </Row>
        </>
    );
}

export async function getServerSideProps (ctx) {
    const cookies = nextCookies(ctx);
    return {
        props: {
            forceLogout: !!cookies.token,
        },
    };
}
