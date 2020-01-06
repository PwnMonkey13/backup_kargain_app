import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Row, Col } from 'reactstrap'
import Cookies from 'universal-cookie'
import Layout from '../../layouts/Layout'
import SignIn from '../../components/signin'
import userAgent from "../../components/HelloUA";

const AuthIndex = (props) => {
    return (
        <Layout {...props}>
            <p className="lead text-center mt-5 mb-5">
                <Link href="/account"><a>Manage your profile</a></Link>
            </p>
        </Layout>
    )
};

// AuthIndex.getInitialProps = async ({ req, res, query }) => {
//     // const session = props.session = await NextAuth.init({force: true, req: req});
//     // const providers = props.providers = await NextAuth.providers({req});
//     const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;
//
//     // If signed in already, redirect to account management page.
//     if (props.session.user) {
//         if (req) {
//             res.redirect('/account')
//         } else {
//             router.push('/account')
//         }
//     }
//
//     // If passed a redirect parameter, save it as a cookie
//     if (query.redirect) {
//         const cookies = new Cookies((req && req.headers.cookie) ? req.headers.cookie : null);
//         cookies.set('redirect_url', query.redirect, { path: '/' })
//     }
//
//     return { ...props, userAgent };
// };

export default AuthIndex;
