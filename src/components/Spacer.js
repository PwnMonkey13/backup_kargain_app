import React, {memo} from "react";
import PropTypes from "prop-types";
import classnames from 'classnames';

const Spacer = memo(({className}) => {
    const Classnames = classnames(
        'my-2',
        className
    );

    return (
        <div className={Classnames}/>
    )
});

export default Spacer;
