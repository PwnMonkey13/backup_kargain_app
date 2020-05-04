let env
let config
const global = {
    STRIPE_API_KEY : process.env.STRIPE_API_KEY,
    GOOGLE_STATIC_API_KEY : process.env.GOOGLE_STATIC_API_KEY
}

const dev = {
    api: 'http://localhost:8080/api'
}

const prod = {
    api: 'https://kargain-api.now.sh/api'
}

switch (process.env.NODE_ENV) {
case 'development' || 'dev':
default:
    env = 'dev'
    config = dev
    break
case 'production' || 'prod':
    env = 'prod'
    config = prod
    break
}

module.exports = { ...global, ...config, env, isDev: env === 'dev' }
