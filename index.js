    const next = require('next');
const server = require('./server');
const csrf = require('csurf');
const csrfProtection = csrf({ session: true });
const config = require('./src/config/config');
const app = next({ dev : config.isDev });
const handle = app.getRequestHandler();

app.prepare().then(() => {

    server.get('*', (req, res) => {
        return handle(req, res)
    });

    server.listen(config.port, err => {
        if (err) throw err;
        console.log(`There will be dragons: http://localhost:${config.port}`);
        console.log(`db host : ${config.api}`);
    })
});
