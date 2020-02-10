import React from 'react';
import { DefaultSeo } from 'next-seo';
import { UserContextProvider } from '../components/Context/UserContext'
import { ModalDialogContextProvider } from '../components/Context/ModalDialogContext'
import Loading from '../components/Loading'
import ModalExample from "../components/ModalExample";
import SEO from '../next-seo.config';
import nextCookie from "next-cookies";
import Layout from "../layouts/Layout";
import AuthService from "../services/AuthService";

function MyApp({ Component, pageProps }) {
    return (
        <ModalDialogContextProvider>
            <UserContextProvider>
                {/*<Loading {...state} />*/}
                <DefaultSeo {...SEO} />
                <ModalExample/>
                <Layout {...pageProps}>
                    <Component {...pageProps} />
                </Layout>
            </UserContextProvider>
        </ModalDialogContextProvider>
    );
}

MyApp.getInitialProps = async ({Component, ctx}) => {
    const {token} = nextCookie(ctx);
    let originalUrl;
    let pageProps = {};

    if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx);
    }

    originalUrl = ctx.req ?
        ctx.req.get('host') + ctx.req.originalUrl :
        window.location.hostname + (window.location.port ? ':' + window.location.port : '');

    if(token){
        try{
            const loggedInUser = await AuthService.authorize(token);
            pageProps = {...pageProps, token, loggedInUser };
        }catch (err) {
            console.log(err);
            pageProps = {...pageProps, token, err };
        }
    }

    return { pageProps: {...pageProps, originalUrl }};
};

export default MyApp;
