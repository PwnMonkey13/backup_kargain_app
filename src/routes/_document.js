import React from 'react';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import documentLang from 'next-translate/documentLang';

class MyDocument extends Document {
    render () {
        return (
            <Html lang={documentLang(this.props)}>
                <Head>
                    <meta charSet="UTF-8"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1"/>
                    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
                    <script type="text/javascript" src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"/>
                </Head>
                <body>
                    <Main/>
                    <NextScript/>
                </body>
            </Html>
        );
    }
}

export default MyDocument;
