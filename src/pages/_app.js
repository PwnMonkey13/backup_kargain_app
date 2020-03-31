import React from 'react';
import Router from "next/router";
import {DefaultSeo} from 'next-seo';
import NextProgress from "../components/NextProgress";
import {UserContextProvider} from '../components/Context/UserContext'
import {ModalDialogContextProvider} from '../components/Context/ModalDialogContext'
import {FormContextProvider} from '../components/Context/FormContext'
import SEO from '../next-seo.config';
import nextCookie from "next-cookies";
import Layout from "../layouts/Layout";
import AuthService from "../services/AuthService";
import PopupAlert from "../components/PopupAlert";
import PopupLogin from "../components/PopupLogin";

import "react-step-progress-bar/styles.css";
import 'react-phone-input-2/lib/style.css'
import 'react-input-range/lib/css/index.css';
import '../components/SelectCountriesFlags/scss/react-flags-select.scss';


const MyApp = ({Component, pageProps}) => {

    Router.events.on('routeChangeStart', () => {
        console.log("route start changed");
    });
    Router.events.on('routeChangeComplete', () => {
        console.log("route end changed");
    });
    Router.events.on('routeChangeError', () => {
        console.log("route error changed");
    });

    return(
        <ModalDialogContextProvider>
            <UserContextProvider isLoggedIn={pageProps.isLoggedIn}>
                <FormContextProvider formKey={pageProps.formKey}>
                    <NextProgress/>
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
};

MyApp.getInitialProps = async (app) => {
    const {token} = nextCookie(app.ctx);
    let props = (app.Component.getInitialProps ? await app.Component.getInitialProps(app.ctx) : null) || {};

    if (props.statusCode && app.ctx.res) {
        app.ctx.res.statusCode = props.statusCode
    }

    if(token){
        try {
            const isLoggedIn = await AuthService.authorize(token);
            props = {...props, token, isLoggedIn };
        } catch (err) {
            props = {...props, err: err, loggedIn: false};
        }
    } else  props = {...props, loggedIn: false};

    return { pageProps: props};
};

export default MyApp;
