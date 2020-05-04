function hexToRgb (hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
    } : null;
}

// convert 0..255 R,G,B values to binary string
function RGBToBin (r, g, b) {
    const bin = r << 16 | g << 8 | b;
    return (function(h) {
        return new Array(25 - h.length).join('0') + h;
    })(bin.toString(2));
}

function hexToBin(hex){
    return RGBToBin(hexToRgb(hex));
}

export {
    hexToRgb,
    RGBToBin,
    hexToBin
};
