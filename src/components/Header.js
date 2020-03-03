import React from 'react'
import PropTypes from "prop-types";

const Header = ({as, text, className, children, ...props}) => {
    return React.createElement(as, { className }, [text, children]);
};

Header.propTypes = {
    as: PropTypes.string.isRequired,
    className: PropTypes.string,
    text: PropTypes.string
};

export default Header;
