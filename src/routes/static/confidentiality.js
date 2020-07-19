import React from 'react';
import { Container } from 'reactstrap';
import ContentfulHOC from '../../components/ContenFulHOC';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

let entriesId = {
    'fr': '103grUBWVfZYA5SL3HV3c1',
    'en': '7k5gtvxFQtZBcWAB02cx9Rf'
};

const About = (props) => {
    const { richTextDocument, options } = props;
    const article = documentToReactComponents(richTextDocument, options);

    return (
        <Container>
            {article ? (
                <div className="article-wrapper">
                    <div className="rich-text-content">
                        {article}
                    </div>
                </div>
            ) : (
                <p> Translation is missing</p>
            )}
        </Container>
    );
};

export default ContentfulHOC(About, entriesId);
