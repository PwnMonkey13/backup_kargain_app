import React, { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { Col, Row } from 'reactstrap';
import UploadDropZone from '../../components/UploadDropZone';
import { ModalDialogContext } from '../../context/ModalDialogContext';
import CardMediaMUI from '../../components/CardMediaMUI';
import TitleMUI from '../../components/TitleMUI';
import AnnounceService from '../../services/AnnounceService';

export default () => {
    const [uploads, setUploads] = useState([]);
    const router = useRouter();
    const { query } = router;
    const { slug } = query;
    const { dispatchModal, dispatchModalError } = useContext(ModalDialogContext);

    const startUploadAPI = (files) => {

        if (!slug) return dispatchModalError({ err: 'add a slug' });

        dispatchModal({ msg: 'Uploading...' });
        let data = new FormData();

        data.append('dir', 'test');

        for (let i = 0; i < files.length; i++) {
            data.append('images', files[i]);
        }

        AnnounceService.uploadImages(slug, data)
            .then(doc => {
                dispatchModal({ msg: 'Upload Successful' });
            }).catch(err => {
            dispatchModalError({ err: 'Sorry, something went wrong' });
        });
    };

    return (
        <>
            <UploadDropZone fireFiles={startUploadAPI}/>
            <TitleMUI>{uploads.length} images téléchargées </TitleMUI>

            {uploads && (
                <div className="m-2 m-auto p-2">
                    <Row>
                        {uploads.map((upload, index) => {
                            return (
                                <Col key={index}>
                                    <div className="m-2">
                                        <CardMediaMUI src={upload.location} classes={{
                                            img: {
                                                maxWidth: '100%',
                                                margin: '0 auto',
                                                maxHeight: '200px',
                                                objectFit: 'contain',
                                            },
                                        }}/>
                                    </div>
                                </Col>
                            );
                        })}
                    </Row>
                </div>
            )}
        </>
    );
}
