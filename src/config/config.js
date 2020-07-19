const isProd = process.env.NODE_ENV === 'production';
const api = isProd ? 'https://api.kargain.com/v1' : 'http://localhost:8080/v1';
// const api = 'http://localhost:8080/v1';

module.exports = {
    env : process.env.NODE_ENV,
    isProd,
    api,
    sso_providers: ['google', 'facebook'],
    contentful : {
        CONTENTFUL_ACCESS_TOKEN : process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
        CONTENTFUL_SPACE : process.env.NEXT_PUBLIC_CONTENFUL_SPACE
    },
    stripe: {
        API_KEY: process.env.NEXT_PUBLIC_STRIPE_API_KEY
    },
    google: {
        STATIC_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
        sso: {
            CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_SSO_CLIENT_ID
        }
    },
    facebook: {
        sso: {
            APP_ID: process.env.NEXT_PUBLIC_FACEBOOK_SSO_APP_ID,
            profileFields: ['id', 'emails', 'name', 'picture.width(250)']
        }
    }
}
