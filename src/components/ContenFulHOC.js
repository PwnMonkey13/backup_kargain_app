import React, { Component } from 'react';
import { BLOCKS, MARKS } from '@contentful/rich-text-types';

const CONTENTFUL_ACCESS_TOKEN = '1FLg_Swv-LqFXKNENZ_IqzEw4ajYAbMcKUJCNg1YnTw';
const CONTENTFUL_SPACE = '15r3jjrdfhc7';

const client = require('contentful').createClient({
    space: CONTENTFUL_SPACE,
    accessToken: CONTENTFUL_ACCESS_TOKEN,
});

const options = {
    renderNode: {
        [MARKS.BOLD]: (node, children) => (
            <span className="bold-title">{children}</span>
        ),
        [BLOCKS.PARAGRAPH]: (node, children) => (
            <p>{children}</p>
        ),
    },
};

export default function ContentfulHOC (WrappedComponent, entriesID) {
    return class ContentFulFunction extends Component {
        static async getInitialProps (ctx) {
            const { lang } = ctx;
            const pageProps = WrappedComponent.getInitialProps && await WrappedComponent.getInitialProps(ctx);
            try {
                const entry = await client.getEntry(entriesID[lang]);
                const richTextDocument = entry.fields.content;
                const HOCProps = {
                    options,
                    lang,
                    entry: entriesID[lang],
                    richTextDocument,
                };

                return {
                    ...HOCProps,
                    ...pageProps,
                    entriesID,
                    lang,
                };

            } catch (err) {
                return {
                    error,
                    ...pageProps,
                    lang,
                };
            }
        };

        render () {
            return (
                <WrappedComponent {...this.props} />
            );
        }
    };
}
