import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet as StyledComponentSheets } from 'styled-components'
import { ServerStyleSheets as MaterialUiServerStyleSheets } from '@material-ui/core/styles'

class MyDocument extends Document {

    static async getInitialProps (ctx) {
        const styledComponentSheet = new StyledComponentSheets()
        const materialUiSheets = new MaterialUiServerStyleSheets()
        const originalRenderPage = ctx.renderPage
        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: App => props =>
                        styledComponentSheet.collectStyles(
                            materialUiSheets.collect(<App {...props} />),
                        ),
                })
            const initialProps = await Document.getInitialProps(ctx)
            return {
                ...initialProps,
                styles: [
                    <React.Fragment key="styles">
                        {initialProps.styles}
                        {materialUiSheets.getStyleElement()}
                        {styledComponentSheet.getStyleElement()}
                    </React.Fragment>,
                ],
            }
        } finally {
            styledComponentSheet.seal()
        }
    }

    render () {
        return (
            <Html lang="fr">
                <Head>
                    <meta charSet="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
                    <script type="text/javascript" src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"/>
                    <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAWfuFiGzngYAgiv1NKUyTbVDOXskv34r8&libraries=places"/>
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
