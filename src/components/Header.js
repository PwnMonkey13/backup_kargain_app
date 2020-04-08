import React from 'react'
import PropTypes from "prop-types";
import classNames from "classnames";

const Header = ({as, text, className, children, ...props}) => {
    const classnames = classNames(className, 'text-center');
    let styles = {};
    let el = as;
    if(props.p) el = 'p';
    if(props.white) styles.color = "white";
    if(props.strong) styles.fontWeight = "bold";

    return React.createElement(el, {
        className : classnames,
        style : styles,
    }, [text, children]);
};

Header.propTypes = {
    as: PropTypes.string.isRequired,
    className: PropTypes.string,
    text: PropTypes.string,
    center : PropTypes.bool
};

Header.defaultProps = {
    as: 'h3',
    center : true
};

export default Header;
