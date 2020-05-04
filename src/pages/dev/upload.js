import React, { useContext, useState } from 'react'
import { Row, Col } from 'reactstrap'
import UploadService from '../../services/UploadService'
import UploadDropZone from '../../components/UploadDropZone'
import { ModalDialogContext } from '../../context/ModalDialogContext'
import CardMediaMUI from '../../components/CardMediaMUI'
import TitleMUI from '../../components/TitleMUI'

export default () => {
    const [uploads, setUploads ] = useState([]);

    const { dispatchModal, dispatchModalError } = useContext(ModalDialogContext)

    const startUploadAPI = (files) => {
        dispatchModal({ msg : "Uploading" })
        let data = new FormData();

        data.append('dir', 'test');

        for(let i = 0; i<files.length; i++){
            data.append('images', files[i]);
        }

        UploadService.putObjects(data)
            .then(res => {
                dispatchModal({ msg : "Upload Successful..." })
                setUploads(res)
            })
            .catch(err => {
                dispatchModalError({ err : "Sorry, something went wrong" })
            }
        )
    }

    return(
        <>
            <UploadDropZone fireFiles={startUploadAPI}/>
            <TitleMUI>{uploads.length} images téléchargées </TitleMUI>

            {uploads && (
                <div className="m-2 m-auto p-2">
                    <Row>
                        {uploads.map((upload, index) => {
                            return(
                                <Col key={index}>
                                    <div className="m-2">
                                        <CardMediaMUI src={upload.location} classes={{
                                            img : {
                                                maxWidth: '100%',
                                                margin: '0 auto',
                                                maxHeight: '200px',
                                                objectFit : 'contain'
                                            }}}/>
                                    </div>
                                </Col>
                            )
                        })}
                    </Row>
                </div>
            )}
        </>
    )
}
