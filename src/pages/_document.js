import React from "react";
import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <meta charSet="UTF-8" />
                    {/*<title>{title || ''}</title>*/}
                    {/*<meta name="description" content={description || ''} />*/}
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <meta name="description" content="nextjs-mongodb-app is a continously developed app built with Next.JS and MongoDB. This project goes further and attempts to integrate top features as seen in real-life apps." />
                    <link href="https://unpkg.com/ionicons@4.5.10-0d/dist/css/ionicons.min.css" rel="stylesheet"/>
                    <link rel="stylesheet" type="text/css" href="/css/app.css" />
                    <link rel="stylesheet" type="text/css" href="/css/theme.css" />
                </Head>
                <body>
                <Main />
                <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument
