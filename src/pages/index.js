import React, { useState, useContext } from 'react';
import Link from 'next/link';
import axioswal from 'axioswal';
import getConfig from 'next/config';
import {Container, Row, Col, ListGroup, ListGroupItem, Jumbotron} from 'reactstrap'
import { UserContext } from '../components/UserContext';
import Layout from '../layouts/Layout'
import { getApiUrl } from '../libs/functions'

const index = (props) => {
    const { dispatch } = useContext(UserContext);
    const [ state, setState ] = useState({ isLoggedIn : false});

    const handleLogout = (event) => {
        event.preventDefault();
        axioswal.delete('/api/session')
            .then((data) => {
                if (data.status === 'ok') {
                    dispatch({ type: 'clear' });
                }
            }
        );
    };

    return (
        <Layout {...props}>
            <h1>Hello, {(state.isLoggedIn ? state.name : 'stranger.')}</h1>

            <p> Connected to {getApiUrl()} </p>

            {(!state.isLoggedIn ? (
                <>
                    <Link href="/auth/login">
                        <button>Login</button>
                    </Link>
                    <br/>
                    <br/>
                    <Link href="/auth/register">
                        <button>Sign up</button>
                    </Link>
                    <br/>
                    <br/>
                    <Link href="/auth/register-pro">
                        <button>Sign up pro</button>
                    </Link>
                </>
            ) : <button onClick={handleLogout}>Logout</button>)}

            <p className="text-muted small">
                * This project is not associated with Next.js or Zeit.
            </p>

            <Jumbotron className="text-light rounded-0" style={{
                backgroundColor: 'rgba(73,155,234,1)',
                background: 'radial-gradient(ellipse at center, rgba(73,155,234,1) 0%, rgba(32,124,229,1) 100%)',
                boxShadow: 'inset 0 0 100px rgba(0,0,0,0.1)'
            }}>
                <Container className="mt-2 mb-2">
                    <h1 className="display-2 mb-3" style={{fontWeight: 300}}>
                        <span style={{fontWeight: 600}}>
                            <span className="mr-3">▲</span>
                            <br className="v-block d-sm-none"/>
                            Next.js
                        </span>
                        <br className="v-block d-lg-none"/> Starter Project
                    </h1>
                    <p className="lead mb-5">
                        A reference and template for React projects
                    </p>
                    <p className="text-right">
                        <a className="btn btn-outline-light btn-lg">
                            <i className="icon ion-md-heart"/>
                            <span className="icon ion-logo-github mr-2"/> Download from GitHub
                        </a>
                    </p>
                </Container>
            </Jumbotron>
        </Layout>
    )
};

export default index;
