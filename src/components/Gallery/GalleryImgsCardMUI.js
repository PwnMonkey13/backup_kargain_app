import React from 'react';
import { Col } from 'reactstrap';
import TitleMUI from '../TitleMUI';
import CardMediaMUI from '../CardMediaMUI';
import UploadedImage from '../../models/ImageModel';

const GalleryImgsCardMUI = ({ images }) => {
    return (
        <>
            <TitleMUI>Images</TitleMUI>
            {images && (
                <div className="m-2 m-auto p-2">
                    <div className="row">
                        {images.map((item, index) => {
                            const image = new UploadedImage(item);
                            return (
                                <Col key={index} md={4}>
                                    <div className="m-2">
                                        <CardMediaMUI
                                            src={image.getImageLocation}
                                            classes={{
                                                img: {
                                                    maxWidth: '100%',
                                                    margin: '0 auto',
                                                    maxHeight: '400px',
                                                    objectFit: 'contain',
                                                },
                                            }}/>
                                    </div>
                                </Col>
                            );
                        })}
                    </div>
                </div>
            )}
        </>
    );
};

export default GalleryImgsCardMUI;
