import React, { useState } from 'react';
import Router from 'next/router';
import { Row, Col, Form, Input, Label, Button } from 'reactstrap';
import Cookies from 'universal-cookie';

export default (props) => {
    const [ state, setState ] = useState(
        { email : '', password : '', submitting : false }
    );

    const handleEmailChange = (event) => {
        setState({email: event.target.value.trim()});
    };

    const handleSubmit = (event) => {
        const { email } = state;
        event.preventDefault();
        if (!email) return;
        setState({submitting: true});

        // Save current URL so user is redirected back here after signing in
        const cookies = new Cookies();
        cookies.set('redirect_url', window.location.pathname, { path: '/' });

        AuthService.signin(this.state.email)
            .then(maffoi => {
                console.log(maffoi);
                Router.push(`/auth/check-email?email=${this.state.email}`)
            })
            .catch(err => {
                console.log(err);
                Router.push(`/auth/error?action=signin&type=email&email=${this.state.email}`)
            })

    };

    return() => {
        if (this.props.token.user) {
            return(<div/>)
        } else {
            return (
                <React.Fragment>
                    <p className="text-center" style={{marginTop: 10, marginBottom: 30}}>{`If you don't have an account, one will be created when you sign in.`}</p>
                    <Row>
                        <Col xs={12} md={6}>
                            <SignInButtons providers={this.props.providers}/>
                        </Col>
                        <Col xs={12} md={6}>
                            <Form id="signin" method="post" action="/auth/email/signin" onSubmit={this.handleSubmit}>
                                <Input name="_csrf" type="hidden" value={this.state.session.csrfToken}/>
                                <p>
                                    <Label htmlFor="email">Email address</Label><br/>
                                    <Input name="email" disabled={this.state.submitting} type="text" placeholder="j.smith@example.com" id="email" className="form-control" value={this.state.email} onChange={this.handleEmailChange}/>
                                </p>
                                <p className="text-right">
                                    <Button id="submitButton" disabled={this.state.submitting} outline color="dark" type="submit">
                                        {this.state.submitting === true && <span className="icon icon-spin ion-md-refresh mr-2"/>}
                                        Sign in with email
                                    </Button>
                                </p>
                            </Form>
                        </Col>
                    </Row>
                </React.Fragment>
            )
        }
    }
}

export const SignInButtons = () => {
    return (
        <React.Fragment>
            {
                Object.keys(this.props.providers).map((provider, i) => {
                    if (!this.props.providers[provider].signin) return null;

                    return (
                        <p key={i}>
                            <a className="btn btn-block btn-outline-secondary" href={this.props.providers[provider].signin}>
                                Sign in with {provider}
                            </a>
                        </p>
                    )
                })
            }
        </React.Fragment>
    )
};
