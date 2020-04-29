
import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core';

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

const TitleMUI = ({as, children, color, gutterBottom, ...rest }) => {
    return (
        <Typography component={as} style={{color : color}} gutterBottom>
            {children}
        </Typography>
    );
}

TitleMUI.propTypes = {
    as : PropTypes.string,
    children: PropTypes.node,
    color : PropTypes.string,
    gutterBottom : PropTypes.bool
};

TitleMUI.defaultProps = {
    as : 'h2',
    color : 'primary',
    gutterBottom : true
};

export default TitleMUI
