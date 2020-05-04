
import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core';
import { themeColors } from '../theme/palette'

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

const TitleMUI = ({as, variant, children, color, gutterBottom, ...rest }) => {
    return (
        <Typography component={as} variant={variant} style={{color : themeColors[color] }} gutterBottom>
            {children}
        </Typography>
    );
}

TitleMUI.propTypes = {
    as : PropTypes.string,
    variant : PropTypes.string,
    children: PropTypes.node,
    color : PropTypes.string,
    gutterBottom : PropTypes.bool
};

TitleMUI.defaultProps = {
    as : 'h3',
    variant : 'h2',
    color : 'primary',
    gutterBottom : true
};

export default TitleMUI
