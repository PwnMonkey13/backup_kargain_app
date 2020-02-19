import React from 'react';
import App from 'next/app';
import {DefaultSeo} from 'next-seo';
import {UserContextProvider} from '../components/Context/UserContext'
import {ModalDialogContextProvider} from '../components/Context/ModalDialogContext'
import {FormContextProvider} from '../components/Context/FormContext'

import Loading from '../components/Loading'
import SEO from '../next-seo.config';
import nextCookie from "next-cookies";
import Layout from "../layouts/Layout";
import AuthService from "../services/AuthService";
import PopupAlert from "../components/PopupAlert";
import PopupLogin from "../components/PopupLogin";

const MyApp = ({Component, pageProps}) => (
    <ModalDialogContextProvider>
        <UserContextProvider isLoggedIn={pageProps.isLoggedIn}>
            <FormContextProvider>
                {/*<Loading {...state} />*/}
                <DefaultSeo {...SEO} />
                <PopupAlert/>
                { pageProps.requiredAuth === true && <PopupLogin pageProps={pageProps}/> }
                <Layout {...pageProps}>
                    <Component/>
                </Layout>
            </FormContextProvider>
        </UserContextProvider>
    </ModalDialogContextProvider>
);

MyApp.getInitialProps = async (appContext) => {
    const {token} = nextCookie(appContext.ctx);
    let props = (appContext.Component.getInitialProps ? await appContext.Component.getInitialProps(appContext.ctx) : null) || {};

    if (props.statusCode && appContext.ctx.res) {
        appContext.ctx.res.statusCode = props.statusCode
    }

    if(token){
        try {
            const isLoggedIn = await AuthService.authorize(token);
            props = {...props, token, isLoggedIn };
        } catch (err) {
            props = {err: err, loggedIn: false};
        }
    } else props.loggedIn = false;

    return {pageProps: {router: appContext.router, ...props}};
};

export default MyApp;
