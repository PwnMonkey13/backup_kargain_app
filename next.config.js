const withPlugins = require('next-compose-plugins');
const withSourceMaps = require('@zeit/next-source-maps')();
const withImages = require('next-images');
const path = require('path');
const packageJson = require('./package');
const date = new Date();

const nextBundleAnalyzer = ({ enabled = true }) => (nextConfig = {}) => ({
    ...nextConfig,
    webpack (config, options) {
        const { isServer } = options;
        const { bundleAnalyzer: bundleAnalyzerOptions = {} } = nextConfig;

        if (enabled) {
            const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

            config.plugins.push(
                new BundleAnalyzerPlugin({
                    analyzerMode: 'static',
                    reportFilename: isServer
                        ? '../analyze/server.html'
                        : './analyze/client.html',
                    ...bundleAnalyzerOptions,
                }),
            );
        }

        if (typeof nextConfig.webpack === 'function') {
            return nextConfig.webpack(config, options);
        }

        return config;
    },
});

const nextConfig = {
    distDir: 'dist/client',
    // Have to list all the environment variables used here to make it available to the client side code
    env: {
        GOOGLE_STATIC_API_KEY: process.env.GOOGLE_STATIC_API_KEY,
        GOOGLE_SSO_CLIENT_ID: process.env.GOOGLE_SSO_CLIENT_ID,
        FACEBOOK_SSO_APP_ID: process.env.FACEBOOK_SSO_APP_ID,
        SENTRY_DSN: process.env.SENTRY_DSN,
        BUILD_TIME: date.toString(),
        BUILD_TIMESTAMP: +date,
        APP_STAGE: process.env.APP_STAGE,
        APP_NAME: packageJson.name,
        APP_VERSION: packageJson.version,
    },
    webpack: (config, { isServer, buildId }) => {
        const APP_VERSION_RELEASE = `${packageJson.version}_${buildId}`;

        // Dynamically add some "env" variables that will be replaced during the build
        config.plugins[0].definitions['process.env.APP_RELEASE'] = JSON.stringify(buildId);
        config.plugins[0].definitions['process.env.APP_VERSION_RELEASE'] = JSON.stringify(APP_VERSION_RELEASE);

        if (isServer) { // Trick to only log once
            console.debug(`[webpack] Building release "${APP_VERSION_RELEASE}"`);
        }

        // Fixes npm packages that depend on `fs` module
        config.node = {
            fs: 'empty',
        };

        // XXX See https://github.com/zeit/next.js/blob/canary/examples/with-sentry-simple/next.config.js
        // In `pages/_app.js`, Sentry is imported from @sentry/node. While
        // @sentry/browser will run in a Node.js environment, @sentry/node will use
        // Node.js-only APIs to catch even more unhandled exceptions.
        //
        // This works well when Next.js is SSRing your page on a server with
        // Node.js, but it is not what we want when your client-side bundle is being
        // executed by a browser.
        //
        // Luckily, Next.js will call this webpack function twice, once for the
        // server and once for the client. Read more:
        // https://nextjs.org/docs#customizing-webpack-config
        //
        // So ask Webpack to replace @sentry/node imports with @sentry/browser when
        // building the browser's bundle

        config.resolve.mainFields = ['main', 'browser', 'module'];
        config.module.rules.push(
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
            },
            {
                test: /\.(ico|svg|png|jpe?g|gif|eot|ttf|woff|woff2)$/,
                use: [
                    'file-loader',
                    'image-webpack-loader',
                    {
                        loader: 'url-loader',
                        options: {
                            name: 'images/[hash]-[name].[ext]',
                            limit: 100000,
                        },
                    },
                ],
            },
        );

        return config;
    },
    poweredByHeader: 'NRN - With love',
};

console.debug(`Building Next with NODE_ENV="${process.env.NODE_ENV}" APP_STAGE="${process.env.APP_STAGE}" for CUSTOMER_REF="${process.env.CUSTOMER_REF}"`);

module.exports = withPlugins([
    [withSourceMaps],
    [withImages, { exclude: path.resolve(__dirname, 'public/images/svg') }],
], nextConfig);
