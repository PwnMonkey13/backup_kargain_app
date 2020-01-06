import React, { useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Cookies from 'universal-cookie'
import Loader from '../../components/loader'
import Layout from "../../layouts/Layout";

const callback = (props) => {
    const router = useRouter();

    useEffect(() => {
        // Get latest session data after rendering on client *then* redirect.
        // The ensures client state is always updated after signing in or out.
        // (That's why we use a callback page)
        // const session = await NextAuth.init({force: true})
        router.push(props.redirectTo || '/');
    }, []);

    // Provide a link for clients without JavaScript as a fallback.
    return (
        <Layout>
            <Loader fullscreen={true}/>
            <a href={props.redirectTo}>Redirection</a>
        </Layout>
    );
};

export default callback;

// static async getInitialProps({req}) {
//     const session = await NextAuth.init({force: true, req: req})
//     const cookies = new Cookies((req && req.headers.cookie) ? req.headers.cookie : null)
//
//     // If the user is signed in, we look for a redirect URL cookie and send
//     // them to that page, so that people signing in end up back on the page they
//     // were on before signing in. Defaults to '/'.
//     let redirectTo = '/'
//     if (session.user) {
//         // Read redirect URL to redirect to from cookies
//         redirectTo = cookies.get('redirect_url') || redirectTo
//
//         // Allow relative paths only - strip protocol/host/port if they exist.
//         redirectTo = redirectTo.replace( /^[a-zA-Z]{3,5}\:\/{2}[a-zA-Z0-9_.:-]+\//, '')
//     }
//
//     return {
//         session: session,
//         redirectTo: redirectTo
//     }
// }
