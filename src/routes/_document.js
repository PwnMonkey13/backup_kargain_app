import React from 'react';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import documentLang from '../components/Locales/documentLang';

class MyDocument extends Document {
    render () {
        return (
            <Html lang={documentLang(this.props)}>
                <Head>
                    <meta charSet="UTF-8"/>
                    <meta property="og:title" content="kargain" />
                    <meta property="og:url" content="kargain.com" />
                    <meta name="viewport" content="width=device-width, initial-scale=1"/>
                    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
                    <script type="text/javascript" src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"/>
                    <script type="text/javascript" id="hs-script-loader" async defer src="https://js.hs-scripts.com/7923469.js"/>
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
