import React from "react";
import classnames from 'classnames';

const Divider = ({text, vertical}) => {
    const Classnames = classnames(
        'divider_stick',
        vertical ? 'vertical' : '',
    );

    return (
        <div className={Classnames}>
            <hr/>
            { text && <span>{text}</span> }
        </div>
    )
};

export default Divider;
