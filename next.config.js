const withPlugins = require('next-compose-plugins');
const withImages = require('next-images');
const path = require('path');
require('dotenv').config()

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
    distDir: 'dist/build',
    // Have to list all the environment variables used here to make it available to the client side code
    env: {
        GOOGLE_STATIC_API_KEY: process.env.GOOGLE_STATIC_API_KEY,
    },
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
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
            });
        return config;
    },
};

module.exports = withPlugins([
    [withImages, {
        exclude: path.resolve(__dirname, 'public/images/svg'),
    }],
], nextConfig);
