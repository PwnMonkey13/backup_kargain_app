'use strict'
const next = require('next')
const onRequest = require('firebase-functions').https.onRequest

const dev = process.env.NODE_ENV !== 'production';
const app = next({dev, conf: {distDir: 'next'}});
const handle = app.getRequestHandler()

exports.next = onRequest((req, res) => {
    app.prepare().then(() => handle(req, res))
})
