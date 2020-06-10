'use strict';
const admin = require('firebase-admin');
const functions = require('firebase-functions');
const next = require('next');

const runtimeOpts = {
    timeoutSeconds: 300,
    memory: '1GB',
};

admin.initializeApp();

const dev = process.env.NODE_ENV !== 'production';
const app = next({
    dev,
    conf: {
        distDir: 'dist/client',
    },
});
const handle = app.getRequestHandler();

exports.next = functions
    .runWith(runtimeOpts)
    .https
    .onRequest((req, res) => {
        try {
            app.prepare().then(() => handle(req, res));
        } catch (err) {
            return err;
        }
    });
