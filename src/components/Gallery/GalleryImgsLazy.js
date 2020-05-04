import React from 'react';
import clsx from 'clsx';
import { Col } from 'reactstrap';
import { LazyImage } from 'react-lazy-images';
import UploadedImage from '../../class/uploadedImage.class';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
    gallery: {
        width: '100%',
        height: '600px',
        position: 'relative',
        borderRadius: '5px',
        overflow: 'hidden',
    },

    galleryImg: {
        // height: '100%',
        // width: '100%',
        // position: 'absolute',
    },

    galleryImgSrc: {
        animation: 'fadeIn 1s',
        width: '100%',
        objectFit: 'contain',
    },
}));

const GalleryImgsLazy = ({ images, handleCLickImg }) => {
    const classes = useStyles();
    return(
        <div className="m-2 m-auto p-2">
            <div className="row">
                {images.map((item, index) => {
                    const image = new UploadedImage(item);
                    return(
                        <Col key={index} md={4}>
                            <div className="m-2">
                                <div key={index} className={classes.galleryImg}>
                                    <LazyImage
                                        onClick={() => handleCLickImg(index)}
                                        placeholder={({ imageProps, ref }) => (
                                            <img ref={ref} src="/images/car.png" alt={imageProps.alt}/>
                                        )}
                                        src={image.getImageUrl}
                                        alt={image.getTile}
                                        className={clsx("img-hover", classes.galleryImgSrc)}
                                        actual={({ imageProps }) => <img {...imageProps} alt={imageProps.alt}/>}
                                    />
                                </div>
                            </div>
                        </Col>
                    )
                })}
            </div>
        </div>
    )
}


export default GalleryImgsLazy
