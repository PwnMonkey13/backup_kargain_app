import React, { useEffect } from 'react';
import { Router, useRouter } from 'next/router';
import withGA from 'next-ga';
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
import SEO from '../../next-seo.config';
import Forbidden403Page from './403';
import theme from '../theme';
import '../scss/theme.scss';
import Loader from '../components/Loader';
import appWithI18n from '../components/Locales/appWithI18n';
import i18nConfig from '../../i18n.json';

const MyApp = ({ Component, pageProps }) => {
    const { formKey } = pageProps;

    useEffect(() => {
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles && jssStyles.parentNode) {
            jssStyles.parentNode.removeChild(jssStyles);
        }
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <ModalDialogContextProvider>
                <AuthProvider>
                    <FormContextProvider formKey={formKey}>
                        <NextProgress/>
                        <DefaultSeo {...SEO} />
                        <PopupAlert/>
                        <ProtectedRouter pageProps={pageProps}>
                            <Component {...pageProps}/>
                        </ProtectedRouter>
                    </FormContextProvider>
                </AuthProvider>
            </ModalDialogContextProvider>
        </ThemeProvider>
    );
};

const ProtectedRouter = ({ children, pageProps }) => {
    const router = useRouter();
    const { lang } = pageProps;
    const isAdminRoute = router.route.split('/').includes('admin');
    const { stateReady, isLoading, forceLoginModal, isAuthenticated, isAuthenticatedUserAdmin } = useAuth();
    const showLoginModal = (pageProps.requiredAuth && !isAuthenticated) || forceLoginModal;

    if (!stateReady || isLoading) {
        return <Loader/>;
    }

    if (isAdminRoute) {
        if (stateReady && !isLoading) {
            if (!isAuthenticatedUserAdmin) {
                return <Forbidden403Page/>;
            }
        }
        return (
            <AdminLayout>
                {children}
            </AdminLayout>
        );
    }

    return (
        <>
            {showLoginModal && <PopupLogin lang={lang}/>}
            <Layout>
                {children}
            </Layout>
        </>
    );
};

export default withGA('UA-229369587', Router)(appWithI18n(MyApp, i18nConfig));
