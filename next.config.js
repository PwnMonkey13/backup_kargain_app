
module.exports = {
    webpack(config, options) {
        if (!options.defaultLoaders) {
            throw new Error(
                'This plugin is not compatible with Next.js versions below 5.0.0 https://err.sh/next-plugins/upgrade'
            )
        }

        config.resolve.mainFields = ["main", "browser", "module"];

        // config.module.rules.push({
        //     test: /\.svg$/,
        //     issuer: {
        //         test: /\.(js|ts)x?$/,
        //     },
        //     use: ['@svgr/webpack'],
        // });

        config.module.rules.push({
            test: /\.svg$/,
            use: [
                // 'svg-inline-loader',
                'svg-loader'
            ]
        });

        config.module.rules.push({
            test: /\.(png|jpe?g|gif|eot|ttf|woff|woff2)$/,
            use: [
                'file-loader',
                'image-webpack-loader',
                {
                    loader: 'url-loader',
                    options: {
                        limit: 100000
                    }
                }
            ]
        });

        return config
    }
};
