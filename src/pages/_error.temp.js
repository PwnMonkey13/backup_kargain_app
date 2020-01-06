import React from 'react'
import Link from 'next/link'
import { Container } from 'reactstrap'

const Error = ({ errorCode}) => {
    let response;

    // Also display a 404 if someone requests /_error explicitly
    switch (errorCode) {
        case 200:
        case 404:
            response = (
                <Container className="pt-5 text-center">
                    <h1 className="display-4">Page Not Found</h1>
                    <p>The page does not exist.</p>
                    <p><Link href="/"><a>Home</a></Link></p>
                </Container>
            );
            break;
        case 500:
            response = (
                <Container className="pt-5 text-center">
                    <h1 className="display-4">Internal Server Error</h1>
                    <p>An internal server error occurred.</p>
                </Container>
            );
            break;
        default:
            response = (
                <Container className="pt-5 text-center">
                    <h1 className="display-4">HTTP {errorCode} Error</h1>
                </Container>
            );
        return response;
    }

    return(
        {response}
    );
};

Error.getInitialProps = ({res, xhr}) => {
    const errorCode = res ? res.statusCode : (xhr ? xhr.status : null);
    return { errorCode }
};

export default Error;

