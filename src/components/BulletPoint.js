import React from 'react';
import PropTypes from 'prop-types';

const black = "#111111";
const grey = "#AAAAAA";
const green = "#2ECC40";
const blue = "#0074D9";
const yellow = "#FFDC00";
const orange = "#FF851B";
const red = "#FF4136";

const switchColor = color => {
    switch (color) {
    case 'grey':
        return grey;
    case 'black':
        return black;
    case 'green':
        return green;
    case 'blue':
        return blue;
    case 'yellow':
        return yellow;
    case 'orange':
        return orange;
    case 'red':
        return red;
    default:
        return color;
    }
};

const BulletPoint = ({width, bordered, color, tooltipHelper}) => {
    const Color = switchColor(color);

    return (
        <div title={tooltipHelper}>
            <svg height={width} width={width}>
                <circle cx={Math.round(width/2)} cy={Math.round(width/2)} r={Math.round(width/4)} stroke={bordered ? 'black' : ''} strokeWidth="1" fill={Color} />
            </svg>
        </div>
    );
};

BulletPoint.propTypes = {
    width : PropTypes.number,
    color: PropTypes.string,
    tooltipHelper : PropTypes.string
};

BulletPoint.defaultProps = {
    width : 30,
    color : 'green'
};

export default BulletPoint;
