import React from 'react';
import Link from 'next/link';
import { Container } from 'reactstrap';
import CTALink from '../components/CTALink';

const Error = ({ message, statusCode }) => {
    let response;
    console.log(message);

    switch (statusCode) {
    case 200:
    case 404:
        response = (
            <>
                <h2 className="display-5">Page Not Found</h2>
                <CTALink
                    title="Retour kargain"
                    href="/"
                />
                <div className="imgContainer mt-1" >
                    <img src="/images/404_template1.jpg" alt="404" height={350}/>
                </div>
            </>
        );
        break;
    case 500:
        response = (
            <h1 className="display-4">Internal Server Error</h1>
        );
        break;
    default:
        response = (
            <>
                <h1 className="display-4">An {statusCode} Error occurred</h1>
            </>
        );
        return response;
    }

    return (
        <Container className="text-center">
            {response}
        </Container>
    );
};

Error.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode };
};

export default Error;
