import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import ImageGallery from 'react-image-gallery';

const GalleryViewer = forwardRef(({ images }, ref) => {
    if(!images || images.length === 0) return null;

    return <ImageGallery
        ref={ref}
        lazyLoad
        autoPlay
        showIndex
        showBullets
        items={images}
    />;
});

GalleryViewer.PropTypes = {
    images: PropTypes.arrayOf(
        PropTypes.shape({
            original: PropTypes.string.isRequired,
            thumbnail: PropTypes.string.isRequired,
        })),
};

export default GalleryViewer;
