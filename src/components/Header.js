import React from 'react'
import PropTypes from "prop-types";
import classNames from "classnames";

const Header = ({as, text, className, children, ...props}) => {
    const classnames = classNames(className, 'text-center');
    return React.createElement(as, { className : classnames}, [text, children]);
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
