import React, { useContext, useEffect } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { Col, Row } from 'reactstrap';
import cookies from 'next-cookies'
import { EmailInput, PasswordInput } from '../../components/Form/Inputs';
import { ModalDialogContext } from '../../context/ModalDialogContext';
import FieldWrapper from '../../components/Form/FieldWrapper';
import SSOProviders from '../../components/SSOProviders';
import CTAButton from '../../components/CTAButton';
import AuthService from '../../services/AuthService';
import CTALink from '../../components/CTALink';
import Divider from '../../components/Divider';
import { useRouter } from 'next/router';

export default ({ forceLogout }) => {
    const router = useRouter();
    const { redirect } = router.query;
    const { dispatchModalError } = useContext(ModalDialogContext);
    const { control, errors, handleSubmit } = useForm({
        mode: 'onChange',
        validateCriteriaMode: 'all',
    });

    useEffect(()=>{
        if (forceLogout){
            return router.push('/auth/logout');
        }
    },[])

    const onSubmit = (form) => {
        const { email, password } = form;
        AuthService.login({
            email,
            password,
        })
            .then(user => {
                if (redirect) {
                    router.push(redirect);
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
            <h1>Se connecter</h1>
            <Row>
                <Col className="m-auto" sm="12" md="5">
                    <div className="d-flex flex-column mx-auto" style={{ maxWidth: '400px' }}>
                        <SSOProviders/>
                        <Divider text="ou"/>
                        <CTALink
                            className="my-2"
                            title="Créer un compte"
                            href="/auth/register"
                        />
                        <CTALink
                            className="my-2"
                            title="S'enregistrer en tant que Pro"
                            href="/auth/register-pro"
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
                    <form className="p-3 mt-3 mx-auto"
                          onSubmit={handleSubmit(onSubmit)}>

                        <FieldWrapper label="Email" required>
                            <EmailInput
                                name="email"
                                inline
                                errors={errors}
                                control={control}
                            />
                        </FieldWrapper>

                        <FieldWrapper label="Mot de passe" required>
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

                        <div className="text-right">
                            <Link href="/auth/forgotten">
                                <a className=""> mot de passe oublié</a>
                            </Link>
                        </div>

                        <div className="submit">
                            <CTAButton
                                title="Se connecter"
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
    const { token } = cookies(ctx);
    return {
        props: {
            forceLogout: !!token,
        },
    };
};
