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

// Take the text parameter passed to this HTTP endpoint and insert it into
// Cloud Firestore under the path /messages/:documentId/original
exports.addMessage = functions.https.onRequest(async (req, res) => {
    // Grab the text parameter.
    const original = req.query.text;
    // Push the new message into Cloud Firestore using the Firebase Admin SDK.
    const writeResult = await admin.firestore().collection('messages').add({ original: original });
    // Send back a message that we've succesfully written the message
    res.json({ result: `Message with ID: ${writeResult.id} added.` });
});
