const withCSS = require('@zeit/next-css');

module.exports = withCSS({
    webpack(config, options) {
        if (!options.defaultLoaders) {
            throw new Error(
                'This plugin is not compatible with Next.js versions below 5.0.0 https://err.sh/next-plugins/upgrade'
            )
        }

        config.module.rules.push({
            test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
            use: {
                loader: 'url-loader',
                options: {
                    limit: 100000
                }
            }
        });

        return config
    }
});
