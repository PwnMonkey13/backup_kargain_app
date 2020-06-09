import React from 'react';
import I18nProvider from 'next-translate/I18nProvider';
import getDefaultLang from 'next-translate/_helpers/getDefaultLang';
import getPageNamespaces from 'next-translate/_helpers/getPageNamespaces';
import startsWithLang from 'next-translate/_helpers/startsWithLang';

function getLang (ctx, config) {
    const { req, asPath = '' } = ctx;
    if (req && req.query) return req.query.lang;
    return startsWithLang(asPath, config.allLanguages)
        ? asPath.split('/')[1]
        : config.defaultLanguage;
}

function removeTrailingSlash (path = '') {
    return path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path;
}

export default function appWithI18n (AppToTranslate, config = {}) {
    function AppWithTranslations (props) {
        const { lang, namespaces, defaultLanguage } = props;
        const { defaultLangRedirect } = config;

        return (
            <I18nProvider
                lang={lang}
                namespaces={namespaces}
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
        const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx): {}

        const defaultLanguage = ctx.req
            ? getDefaultLang(ctx.req, config)
            : __NEXT_DATA__.props.defaultLanguage;

        const lang = getLang(ctx, {
            ...config,
            defaultLanguage,
        });

        const page = removeTrailingSlash(ctx.pathname);
        const namespaces = await getPageNamespaces(config, page, ctx);
        const pageNamespaces =
            (await Promise.all(
                namespaces.map((ns) =>
                    typeof config.loadLocaleFrom === 'function'
                        ? config.loadLocaleFrom(lang, ns)
                        : Promise.resolve([]),
                ),
            ).catch(() => {
            })) || [];

        return {
            lang,
            defaultLanguage,
            pageProps : {...pageProps, lang},
            namespaces: namespaces.reduce((obj, ns, i) => ({
                ...obj,
                [ns]: pageNamespaces[i],
            }), {}),
        };
    };

    return AppWithTranslations;
}
