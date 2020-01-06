const NextI18Next = require('next-i18next').default;

const nextInstance = new NextI18Next({
    defaultLanguage: 'fr',
    otherLanguages: ['en', 'de'],
    localePath: 'public/locales',
    debug: true,
    // ignoreRoutes: ['/_next', '/public']
    localeSubpaths: {
        fr: 'fr',
        en: 'en',
    }
}, (err, t) => {
    // if (err) return console.log('something went wrong loading', err);
    // t('key'); // -> same as i18next.t
});


module.exports = nextInstance;

