import React, { memo } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const Spacer = ({ top, bottom, className }) => (
    <div
        className={clsx(className)}
        style={{
            marginTop: `${top}px`,
            marginBottom: `${bottom}px`,
        }}/>
);

Spacer.PropTypes = {
    top: PropTypes.number,
    bottom: PropTypes.number,
};

Spacer.defaultProps = {
    top: 20,
    bottom: 20,
};

export default memo(Spacer);
