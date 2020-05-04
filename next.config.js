const withPlugins = require('next-compose-plugins');
const Dotenv = require("dotenv-webpack");
const withImages = require('next-images');
const path = require('path');

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
    // Have to list all the environment variables used here to make it available
    // to the client side code
    env: {
        GOOGLE_STATIC_API_KEY: process.env.GOOGLE_STATIC_API_KEY,
    },
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        config.resolve.mainFields = ['main', 'browser', 'module'];
        // Add the new plugin to the existing webpack plugins
        config.plugins.push(new Dotenv({ silent: true }));
        config.resolve.alias['@'] = path.join(__dirname, 'src');
        config.module.rules.push({
            test: /\.svg$/,
            use: [
                'svg-loader',
            ],
        });
        config.module.rules.push(
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
            },
            {
                test: /\.(ico|png|jpe?g|gif|eot|ttf|woff|woff2)$/,
                use: [
                    'file-loader',
                    'image-webpack-loader',
                    {
                        loader: 'url-loader',
                        options: {
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
