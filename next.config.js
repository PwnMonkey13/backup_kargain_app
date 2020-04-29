const withPlugins = require('next-compose-plugins')
const withImages = require('next-images')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
})
const nextConfig = {
    distDir: 'dist/build',
    webpack: (config, options) => {
        config.resolve.mainFields = ['main', 'browser', 'module']

        config.module.rules.push({
            test: /\.svg$/,
            use: [
                'svg-loader'
            ]
        })

        config.module.rules.push({
            test: /\.(ico|png|jpe?g|gif|eot|ttf|woff|woff2)$/,
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
        })
        return config
    }
}

module.exports = withBundleAnalyzer(withPlugins([
    // [withImages, {
    //     exclude: path.resolve(__dirname, 'public/images/svg'),
    // }],
], nextConfig))
