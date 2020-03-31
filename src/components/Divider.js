import React, {memo} from "react";
import classnames from 'classnames';

const Divider = memo(({text, vertical}) => {
    const Classnames = classnames(
        'divider_stick',
        vertical ? 'vertical' : '',
    );

    return (
        <div className={Classnames}>
            <hr/>
            { text && <span><strong>{text}</strong></span> }
        </div>
    )
});

export default Divider;
