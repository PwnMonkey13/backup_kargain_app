import React, { useEffect } from 'react';
import { Router, useRouter } from 'next/router';
import { DefaultSeo } from 'next-seo';
import withGA from 'next-ga'
import DynamicNamespaces from 'next-translate/DynamicNamespaces';
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
import i18nConfig from '../../i18n.json';
import appWithI18n from '../components/Locales/appWithI18n';

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
    const isAdminRoute = router.route.split('/').includes('admin');
    const { stateReady, isLoading, forceLoginModal, isAuthenticated, isAuthenticatedUserAdmin } = useAuth();
    const showLoginModal = (pageProps.requiredAuth && !isAuthenticated) || forceLoginModal;

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
        <DynamicNamespaces
            dynamic={(lang, ns) => import(`../locales/${lang}/${ns}.json`).then((m) => m.default)}
            namespaces={['layout']}
        >
            {showLoginModal && <PopupLogin/>}
            <Layout>
                {children}
            </Layout>
        </DynamicNamespaces>
    );
};

export default withGA('UA-229369587', Router)(appWithI18n(MyApp, i18nConfig));
