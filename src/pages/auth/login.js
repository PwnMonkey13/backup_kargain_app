import React, { memo, useContext } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { EmailInput, PasswordInput } from '../../components/Form/Inputs';
import FieldWrapper from '../../components/Form/FieldWrapper';
import { Col, Row } from 'reactstrap';
import Link from 'next/link';
import Divider from '../../components/Divider';
import AuthService from '../../services/AuthService';
import { ModalDialogContext } from '../../context/ModalDialogContext';
import withoutAuth from '../../hoc/withoutAuth';
import CTALink from '../../components/CTALink';
import CTAButton from '../../components/CTAButton';

const formConfig = {
    mode: 'onChange',
    validateCriteriaMode: 'all',
};

export default withoutAuth(() => {
    const router = useRouter();
    const { redirect } = router.query;
    const { dispatchModalError } = useContext(ModalDialogContext);
    const { control, errors, handleSubmit } = useForm(formConfig);

    const onSubmit = (form) => {
        const { email, password } = form;
        AuthService.login({
            email,
            password,
        })
            .then(data => {
                if (redirect) {
                    router.push(redirect);
                } else {
                    const isAdmin = data.user.isAdmin;
                    if (isAdmin) {
                        router.push(`/auth/callback?redirect=/admin`);
                    } else {
                        router.push(`/auth/callback?redirect=/profile/${data.user.username}`);
                    }
                }
            }).catch(err => {
                dispatchModalError({ err });
                if (redirect) router.push({ pathname: redirect });
            },
        );
    };

    const Providers = memo(() => {
        return (
            <div className="d-flex flex-column">
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
                    title="Créer un compte"
                    href="/auth/register"
                />
                <CTALink
                    title="S'enregistrer en tant que Pro"
                    href="/auth/register-pro"
                />
            </div>
        );
    });

    return (
        <main>
            <h1>Se connecter</h1>
            <Row>
                <Col className="m-auto" sm="12" md="5">
                    <Providers/>
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
        </main>
    );
});
