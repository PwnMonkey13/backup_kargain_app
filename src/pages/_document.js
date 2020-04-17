import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
    render () {
        return (
            <Html>
                <Head>
                    <meta charSet="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
                    <script type="text/javascript" src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"/>
                    <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAWfuFiGzngYAgiv1NKUyTbVDOXskv34r8&libraries=places"/>
                    <title/>
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
