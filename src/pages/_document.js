import React from "react";
import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <meta charSet="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="stylesheet" type="text/css" href="/css/theme.css" />
                    <script type="text/javascript" src="https://code.jquery.com/jquery-3.3.1.slim.js"/>
                    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js"/>
                    <script type="text/javascript" src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"/>
                </Head>
                <body>
                <Main />
                <NextScript/>
                </body>
            </Html>
        )
    }
}

export default MyDocument
