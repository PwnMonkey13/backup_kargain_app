import React, { useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import { DefaultSeo } from 'next-seo';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import { ModalDialogContextProvider } from '../context/ModalDialogContext';
import { FormContextProvider } from '../context/FormContext';
import { AuthProvider, useAuth } from '../context/AuthProvider';

import AdminLayout from '../components/Admin/Layout/AdminLayout';
import Layout from '../layouts/Layout';
import Forbidden403Page from './403';
import PopupLogin from '../components/PopupLogin';

import NextProgress from '../components/NextProgress';
import PopupAlert from '../components/PopupAlert';
import SEO from '../next-seo.config';
import '../scss/theme.scss';
import theme from '../theme';
import Loader from '../components/Loader';

const MyApp = ({ Component, pageProps }) => {

    useEffect(() => {
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles && jssStyles.parentNode) {
            jssStyles.parentNode.removeChild(jssStyles);
        }

        Router.events.on('routeChangeStart', () => {
            console.log('route start changed');
        });

        Router.events.on('routeChangeComplete', () => {
            console.log('route end changed');
        });

        Router.events.on('routeChangeError', () => {
            console.log('route error changed');
        });

        return () => {
            Router.events.off('routeChangeStart', () => {
                console.log('unscribe route change');
            });
        };
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <ModalDialogContextProvider>
                <AuthProvider>
                    <FormContextProvider>
                        <NextProgress/>
                        <DefaultSeo {...SEO} />
                        <PopupAlert/>
                        <ProtectedRouter>
                            <Component {...pageProps}/>
                        </ProtectedRouter>
                    </FormContextProvider>
                </AuthProvider>
            </ModalDialogContextProvider>
        </ThemeProvider>
    );
};

const ProtectedRouter = ({ children }) => {
    const router = useRouter();
    const isAdminRoute = router.route.split('/').includes('admin');
    const { isLoading, isAuthenticated, isAuthenticatedUserAdmin } = useAuth();
    const pageProps = children.props;

    if (isLoading) return <Loader/>;

    if (isAdminRoute) {
        if (isAuthenticatedUserAdmin) {
            return (
                <AdminLayout>
                    {children}
                </AdminLayout>
            );
        } else {
            return <Forbidden403Page/>;
        }
    }

    return (
        <Layout>
            {(pageProps.requiredAuth && !isAuthenticated) && <PopupLogin pageProps={pageProps}/>}
            {children}
        </Layout>
    );
};

export default MyApp;
