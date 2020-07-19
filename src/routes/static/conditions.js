import React from 'react';
import { Container } from 'reactstrap';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import ContentfulHOC from '../../components/ContenFulHOC';

const Conditions = (props) => {
    const { richTextDocument, options } = props;
    const article = documentToReactComponents(richTextDocument, options);

    return (
        <Container>
            {article && (
                <div className="article-wrapper">
                    <div className="rich-text-content">
                        {article}
                    </div>
                </div>
            )}
        </Container>
    );
};

let entriesId = {
    'fr': '6z7omSmSGSRXjeqfI4Qm91',
    'en': '2Vmxe1xvgDoSxNAdP1hTFg'
};

export default ContentfulHOC(Conditions, entriesId);

