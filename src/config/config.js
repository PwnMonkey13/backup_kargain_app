const isProd = process.env.NODE_ENV === 'production'
const env = isProd ? "prod" : "dev"
const api = isProd ? "https://kargain-api.now.sh/api" : "http://localhost:8080/api"

module.exports = {
    isProd,
    env,
    api,
    STRIPE_API_KEY : process.env.STRIPE_API_KEY,
    GOOGLE_STATIC_API_KEY : process.env.GOOGLE_STATIC_API_KEY
}
