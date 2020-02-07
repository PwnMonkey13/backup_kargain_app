let env;
let config;
const global = {
    port : process.env.PORT || 3000,
};

const dev = {
    api : "http://localhost:8080/api",
    wp_rest_api : "http://localhost:5555/wp-json/wp/v2",
};

const prod = {
    api: "https://api.kargain/v1",
};

switch (process.env.NODE_ENV) {
    case 'development' || 'dev':
    default:
        env = 'dev';
        config = dev;
        break;
    case 'production' || 'prod':
        env = 'prod';
        config = prod;
        break;
}

module.exports = { ...global, ...config, env, isDev : env === 'dev'};
