const isProd = process.env.NODE_ENV === 'production';
const env = isProd ? 'prod' : 'dev';
const api = isProd ? 'https://kargain-api.now.sh/api' : 'http://localhost:8080/api';

module.exports = {
    isProd,
    env,
    api,
    sso_providers : ['google', 'facebook'],
    stripe: {
        API_KEY: process.env.STRIPE_API_KEY,
    },
    google: {
        STATIC_API_KEY: process.env.GOOGLE_STATIC_API_KEY,
        sso: {
            CLIENT_ID : process.env.GOOGLE_SSO_CLIENT_ID
        },
    },
    facebook: {
        sso: {
            APP_ID: process.env.FACEBOOK_SSO_APP_ID,
            profileFields: ['id', 'emails', 'name', 'picture.width(250)'],
        },
    },
};
