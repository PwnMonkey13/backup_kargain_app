import React from 'react';

const ValidationAlert = ({ content }) => {
    return content ? <div className="validation-error" dangerouslySetInnerHTML={{__html: content}}/> : '';
};

export default ValidationAlert;
