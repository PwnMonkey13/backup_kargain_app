import React from 'react'
import Link from 'next/link'
import { Container } from 'reactstrap'

const Error = ({statusCode}) => {
    let response;

    switch (statusCode) {
        case 200:
        case 404:
            response = (
                <>
                    <h1 className="display-4">Page Not Found</h1>
                    <p>The page does not exist.</p>
                    <p><Link href="/"><a>Home</a></Link></p>
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
                    <h1 className="display-4">An {errorCode} Error occurred</h1>
                </>
            );
        return response;
    }

    return(
        <Container className="pt-5 text-center">
            { response }
        </Container>
    )
};

Error.getInitialProps = ({res, err}) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode }
};

export default Error;

