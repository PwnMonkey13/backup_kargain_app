import React, { useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import { DefaultSeo } from 'next-seo';
import nextCookie from 'next-cookies';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import NextProgress from '../components/NextProgress';
import PopupAlert from '../components/PopupAlert';
import PopupLogin from '../components/PopupLogin';
import { ModalDialogContextProvider } from '../context/ModalDialogContext';
import { FormContextProvider } from '../context/FormContext';
import { UserContextProvider } from '../context/UserContext';
import AdminLayout from '../components/Admin/Layout/AdminLayout';
import AuthService from '../services/AuthService';
import Layout from '../layouts/Layout';
import SEO from '../next-seo.config';
import theme from '../theme';
import '../scss/theme.scss';

const MyApp = ({ Component, pageProps }) => {
    Router.events.on('routeChangeStart', () => {
        console.log('route start changed');
    });
    Router.events.on('routeChangeComplete', () => {
        console.log('route end changed');
    });
    Router.events.on('routeChangeError', () => {
        console.log('route error changed');
    });

    useEffect(() => {
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles && jssStyles.parentNode) {
            jssStyles.parentNode.removeChild(jssStyles);
        }
    }, []);

    const router = useRouter();
    const { route } = router;
    const adminRoute = route.split('/').includes('admin');

    return (
        <ThemeProvider theme={theme}>
            <ModalDialogContextProvider>
                <UserContextProvider isLoggedIn={pageProps.isLoggedIn} loggedInUser={pageProps.loggedInUser}>
                    <FormContextProvider formKey={pageProps.formKey}>
                        <NextProgress/>
                        <DefaultSeo {...SEO} />
                        <PopupAlert/>
                        {(pageProps.requiredAuth && !pageProps.loggedIn) && <PopupLogin pageProps={pageProps}/>}
                        {adminRoute ? (
                            <AdminLayout {...pageProps}>
                                <Component {...pageProps}/>
                            </AdminLayout>
                        ) : (
                            <Layout {...pageProps}>
                                <Component {...pageProps}/>
                            </Layout>
                        )}

                    </FormContextProvider>
                </UserContextProvider>
            </ModalDialogContextProvider>
        </ThemeProvider>
    );
};

MyApp.getInitialProps = async (app) => {

    const cookies = nextCookie(app.ctx);
    const { token } = cookies;
    let props = (app.Component.getInitialProps ? await app.Component.getInitialProps(app.ctx) : null) || {};

    if (props.statusCode && app.ctx.res) {
        app.ctx.res.statusCode = props.statusCode;
    }

    const defaultProps = {
        formKey : 'car'
    }

    props = {...props, ...defaultProps}

    if (token) {
        try {
            const result = await AuthService.authorizeSSR(cookies);
            const { isLoggedIn, user } = result;
            props = {
                ...props,
                isLoggedIn,
                loggedInUser: user,
            };
        } catch (err) {
            props = {
                ...props,
                err,
                loggedIn: false,
            };
        }
    } else {
        props = {
            ...props,
            loggedIn: false,
        };
    }

    return { pageProps: { ...props } }
}

export default MyApp
