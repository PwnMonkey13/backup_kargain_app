import React from 'react'
import PropTypes from "prop-types";

const Header = ({as, text, className, ...props}) => {
    return React.createElement(as, { className }, text);
};

Header.propTypes = {
    as: PropTypes.string.isRequired,
    className: PropTypes.string,
    text: PropTypes.string.isRequired
};

export default Header;
