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

    server.get('/form', csrfProtection, function (req, res) {
        // pass the csrfToken to the view
        res.render('send', { csrfToken: req.csrfToken() })
    });

    server.listen(config.port, err => {
        if (err) throw err;
        console.log(`There will be dragons: http://localhost:${config.port}`);
    })
});
