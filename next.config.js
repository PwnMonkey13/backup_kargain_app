const withPlugins = require('next-compose-plugins')
const withImages = require('next-images')
const path = require('path')
require('dotenv').config()

const nextBundleAnalyzer = ({ enabled = true }) => (nextConfig = {}) => ({
    ...nextConfig,
    webpack (config, options) {
        const { isServer } = options
        const { bundleAnalyzer: bundleAnalyzerOptions = {} } = nextConfig

        if (enabled) {
            const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

            config.plugins.push(
                new BundleAnalyzerPlugin({
                    analyzerMode: 'static',
                    reportFilename: isServer
                        ? '../analyze/server.html'
                        : './analyze/client.html',
                    ...bundleAnalyzerOptions,
                }),
            )
        }

        if (typeof nextConfig.webpack === 'function') {
            return nextConfig.webpack(config, options)
        }

        return config
    },
})

const nextConfig = {
    distDir: 'dist',
    // Have to list all the environment variables used here to make it available to the client side code
    env: {
        GOOGLE_STATIC_API_KEY: process.env.GOOGLE_STATIC_API_KEY,
        GOOGLE_SSO_CLIENT_ID: process.env.GOOGLE_SSO_CLIENT_ID,
        FACEBOOK_SSO_APP_ID: process.env.FACEBOOK_SSO_APP_ID,
        SENTRY_DSN: process.env.SENTRY_DSN,
    },
    webpack: (config) => {
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

        config.resolve.mainFields = ['main', 'browser', 'module']
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
        )

        return config
    },
}

module.exports = withPlugins([
    [withImages, { exclude: path.resolve(__dirname, 'public/images/svg') }],
], nextConfig)
