import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from "../layouts/Layout";
import { format } from 'url';
import {set} from "react-ga";
import {Col, Container, Jumbotron, ListGroup, ListGroupItem, Row} from "reactstrap";

const Index2 = () => {
    let [ counter, setCounter ] = useState(0);
    const router = useRouter();

    useEffect(() => {
        console.log(counter);
    }, [counter]);

    useEffect(() => {
        const { query } = router;
        console.log('set counter');
        setCounter(parseInt(query.counter) || 0);
    }, [router.query.counter]);

    useEffect(() => {
        const { query } = router;
        console.log('CHANGE ROUTE INIT');
        setCounter(parseInt(query.counter) || 0);
        router.events.on('routeChangeStart', handleRouteChange);

        return () => {
            console.log('unmount catched');
            router.events.off('routeChangeStart', handleRouteChange)
        };
    }, []);

    const handleRouteChange = url => {
        console.log('App is changing to: ', url)
    };

    const reload = () => {
        const { pathname, query } = router;
        router.push(format({ pathname, query }));
    };

    const incrementAndRedirect = () => {
        const { pathname } = router;
        setCounter(counter++);
        const href = `${pathname}?counter=${counter}`;
        router.push(href, href, { shallow: true });
    };

    const increment = () => {
        console.log(counter);
        setCounter(counter+1);
    };

    console.log('re render');
    return(
        <Layout>
            <button onClick={() => reload()}>Reload</button>
            <button onClick={() => incrementAndRedirect()}>
                Change and redirect
            </button>
            <button onClick={() => increment()}>
                Change State Counter
            </button>
            <p> Counter: {counter}.</p>

            <h2 className="text-center display-4 mt-5 mb-2">Features</h2>
            <Row className="pb-5">
                <Col xs="12" sm="4" className="pt-5">
                    <h3 className="text-center mb-4">Sessions / Security</h3>
                    <ListGroup>
                        <ListGroupItem><a className="text-dark" href="https://expressjs.com">Express</a></ListGroupItem>
                        <ListGroupItem><a className="text-dark" href="https://www.owasp.org/index.php/HttpOnly">HTTP Only Cookies</a></ListGroupItem>
                    </ListGroup>
                </Col>
            </Row>
            <Row>
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
            </Row>
        </Layout>
    );
};

export default Index2;
