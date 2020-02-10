import React, { useState, useEffect, useContext } from 'react'
import Link from 'next/link';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap'
import { UserContext } from '../../components/Context/UserContext';
import {ModalDialogContext} from '../../components/Context/ModalDialogContext';
import Layout from '../../layouts/Layout';
import AuthService from '../../services/AuthService';


const Index = (props) => {
    const { session, dispatch } = useContext(UserContext);
    const { dispatchModal } = useContext(ModalDialogContext);
    const { isLoggedIn, user } = session;
    const [ state, setState] = useState({
        user,
        alertText: null,
        alertStyle: null
    });

    const handleChange = (e) => {
        setState({
            [e.target.name]: e.target.value
        });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setState({
            alertText: null,
            alertStyle: null
        });

        AuthService.updateUser(state.user)
            .then(data => {
                setState({
                    alertText: 'Changes to your profile have been saved',
                    alertStyle: 'alert-success',
                });
                dispatchModal({type : 'success', msg : 'profile update successufully' });
            })
            .catch(err => {
                setState({
                    alertText: 'Failed to save changes to your profile',
                    alertStyle: 'alert-danger',
                });
                dispatchModal({type : 'error', err });
            }
        )
    };

    if (!session.isLoggedIn) {
        return (
            <Layout {...props} navmenu={false}>
                <Row>
                    <Col xs="12" className="text-center pt-5 pb-5">
                        <p className="lead m-0">
                            <Link href="/auth/login"><a>Sign in to manage your profile</a></Link>
                        </p>
                    </Col>
                </Row>
            </Layout>
        )
    } else return (
        <Layout {...props}>
            <Row className="mb-1">
                <Col xs="12">
                    <h2>Edit Profile</h2>
                </Col>
            </Row>

            <Row className="mt-4">
                <Col xs="12" md="8" lg="9">
                    <Form method="post" action="/account/edit" onSubmit={onSubmit}>
                        {/*<Input name="_csrf" type="hidden" value={state.session.csrfToken} onChange={()=>{}}/>*/}
                        <FormGroup row>
                            <Label sm={2}>Name:</Label>
                            <Col sm={10} md={8}>
                                <Input name="name" value={session.user.fullname} onChange={handleChange}/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={2}>Email:</Label>
                            <Col sm={10} md={8}>
                                <Input name="email"
                                       value={(session.user.email.match(/.*@localhost\.localdomain$/)) ? '' : session.user.email}
                                       onChange={handleChange}/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col sm={12} md={10}>
                                <p className="text-right">
                                    <Button color="primary" type="submit">Save Changes</Button>
                                </p>
                            </Col>
                        </FormGroup>
                    </Form>
                </Col>
                {/*<Col xs="12" md="4" lg="3">*/}
                {/*    <LinkAccounts/>*/}
                {/*</Col>*/}
            </Row>
            <Row>
                <Col>
                    <h2>Delete your account</h2>
                    <p>
                        If you delete your account it will be erased immediately.
                        You can sign up again at any time.
                    </p>
                    <Form id="signout" method="post" action="/account/delete">
                        {/*<input name="_csrf" type="hidden" value={state.session.csrfToken}/>*/}
                        <Button type="submit" color="outline-danger"><span className="icon ion-md-trash mr-1"/> Delete Account</Button>
                    </Form>
                </Col>
            </Row>
        </Layout>
    )
};

const LinkAccounts = () => {
    const linkedAccounts = [ "facebook", "twitter"];
    return(
        Object.keys(linkedAccounts).map((provider, i) => {
            return <LinkAccount key={i} provider={provider} linked={false}/>
        })
    )
};

const LinkAccount = (props) => {
    if (props.linked) {
        return (
            <form method="post" action={`/auth/oauth/${props.provider.toLowerCase()}/unlink`}>
                <input name="_csrf" type="hidden" value={props.session.csrfToken}/>
                <p>
                    <button className="btn btn-block btn-outline-danger" type="submit">
                        Unlink from {props.provider}
                    </button>
                </p>
            </form>
        )
    } else {
        return (
            <p>
                <a className="btn btn-block btn-outline-primary" href={`/auth/oauth/${props.provider.toLowerCase()}`}>
                    Link with {props.provider}
                </a>
            </p>
        )
    }
};

export default Index;
