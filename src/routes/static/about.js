import React from 'react';
import { Container } from 'reactstrap';
import ContentfulHOC from '../../components/ContenFulHOC';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

let entriesId = {
    'fr': '527HfMlV3wSsMd7DPiyB7z',
    'en': '2no7Rb2tmUdYhsWTyVcXiR',
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
