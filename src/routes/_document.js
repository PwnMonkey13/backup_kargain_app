import React from 'react';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import documentLang from '../components/Locales/documentLang';
import config from '../config/config'

class MyDocument extends Document {
    render () {
        return (
            <Html lang={documentLang(this.props)}>
                <Head>
                    <meta charSet="UTF-8"/>
                    <meta property="og:title" content="kargain"/>
                    <meta property="og:url" content="kargain.com"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1"/>
                    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
                    <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js"/>
                    <script type="text/javascript"
                        src={`https://maps.googleapis.com/maps/api/js?key=${config.google.STATIC_API_KEY}&libraries=places`}/>
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
