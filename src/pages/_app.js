import React, { useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import { DefaultSeo } from 'next-seo';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import { ModalDialogContextProvider } from '../context/ModalDialogContext';
import { AuthProvider, useAuth } from '../context/AuthProvider';
import { FormContextProvider } from '../context/FormContext';
import AdminLayout from '../components/Admin/Layout/AdminLayout';
import NextProgress from '../components/NextProgress';
import PopupAlert from '../components/PopupAlert';
import PopupLogin from '../components/PopupLogin';
import Layout from '../layouts/Layout';
import SEO from '../next-seo.config';
import Forbidden403Page from './403';
import theme from '../theme';
import '../scss/theme.scss';
import Loader from '../components/Loader';

const MyApp = ({ Component, pageProps }) => {
    const { formKey } = pageProps;

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
                    <FormContextProvider formKey={formKey}>
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
    const pageProps = children.props;
    const isAdminRoute = router.route.split('/').includes('admin');
    const { stateReady, isLoading, forceLoginModal, isAuthenticated, isAuthenticatedUserAdmin } = useAuth();
    const showLoginModal = (pageProps.requiredAuth && !isAuthenticated) || forceLoginModal;

    if (!stateReady || isLoading) return <Loader/>;
    if (stateReady && !isLoading && isAdminRoute && !isAuthenticatedUserAdmin) return <Forbidden403Page/>;

    if (isAdminRoute) {
        return (
            <AdminLayout>
                {children}
            </AdminLayout>
        );
    }

    return (
        <>
            {showLoginModal && <PopupLogin pageProps={pageProps}/>}
            <Layout>
                {children}
            </Layout>
        </>
    );
};

export default MyApp;
