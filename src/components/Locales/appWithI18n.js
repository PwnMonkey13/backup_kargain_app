import React from 'react';
import I18nProvider from './I18nProvider';
import startsWithLang from 'next-translate/_helpers/startsWithLang';
import getDefaultLang from 'next-translate/_helpers/getDefaultLang';

function getLang (ctx, config) {
    const { req, asPath } = ctx;
    if (req && req.query) {
        const { lang } = req.query;
        if (lang) return lang;
    }
    return startsWithLang(asPath, config.allLanguages)
        ? asPath.split('/')[1]
        : config.defaultLanguage;
}

function removeTrailingSlash (path = '') {
    return path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path;
}

export default function appWithI18n (AppToTranslate, config = {}) {
    function AppWithTranslations (props) {
        const { lang, defaultLanguage } = props;
        const { defaultLangRedirect } = config;
        // console.log('props');
        // console.log(props);

        return (
            <I18nProvider
                lang={lang}
                internals={{
                    defaultLangRedirect,
                    defaultLanguage,
                }}
            >
                <AppToTranslate {...props} />
            </I18nProvider>
        );
    }

    AppWithTranslations.getInitialProps = async ({ Component, ctx }) => {
        const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

        let defaultLanguage = ctx.req
            ? getDefaultLang(ctx.req, config)
            : __NEXT_DATA__.props.defaultLanguage;

        const lang = getLang(ctx, {
            ...config,
            defaultLanguage,
        });

        // const page = removeTrailingSlash(ctx.pathname);

        return {
            config,
            lang,
            defaultLanguage,
            pageProps,
        };

        // try {
        // const namespaces = await getPageNamespaces(config, page, ctx);
        // const asyncLoadNS = async (lang, ns) => await Promise.resolve(await import(`../../locales/${lang}/${ns}.json`));
        // const pageNamespaces = await Promise.all(namespaces.map(ns => asyncLoadNS(lang, ns)));
        // return {
        //     lang,
        //     defaultLanguage,
        //     pageProps,
        // namespacesNames: namespaces,
        // namespaces: namespaces.reduce((obj, ns, i) => ({
        //     ...obj,
        //     [ns]: pageNamespaces[i],
        // }), {}),
        // };
        //
        // } catch (err) {
        //     return {
        //         lang,
        //         defaultLanguage,
        //         pageProps
        //     };
        // }
    };

    return AppWithTranslations;
}
