const mix = require('laravel-mix');
mix.setPublicPath(`public`);

// mix.sass(`src/styles/app.scss`, 'styles');
mix.sass(`src/scss/app.scss`, 'css')
    .sass(`src/scss/theme.scss`, 'css').options({
    processCssUrls: false
});

if (mix.config.inProduction) {
    mix.version();
}
