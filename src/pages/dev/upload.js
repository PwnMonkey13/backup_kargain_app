import React, { useContext, useState } from 'react'
import UploadDropZone from '../../components/UploadDropZone'
import UploadService from '../../services/UploadService'
import { ModalDialogContext } from '../../components/Context/ModalDialogContext'
import { Row, Col } from 'reactstrap'
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
                console.log(res);
                setUploads(res)
            })
            .catch(err =>{
                dispatchModalError({ err : "Sorry, something went wrong" })
            }
        )
    }

    const startUpload = async (files) => {

        console.log(files)
        dispatchModal({ msg : "Uploading" })

        const putFilesArrayPromises = files.map(async file => {
            const ContentType = file.type; // eg. image/jpeg or image/svg+xml
            const Key = `uploads/${file.name}`;
            const data = await UploadService.generatePutUrl(Key, ContentType)
            const { putURL } = data
            if(putURL) return await UploadService.putSingleObjectExternal(putURL, file, Key, ContentType)
            else{
                console.log("TODO CATCH")
                return null;
            }
        });

        try{
            const results = await Promise.all(putFilesArrayPromises);
            dispatchModal({ msg : "Upload Successful..." })
            console.log(results);
        }catch (err) {
            dispatchModalError({ err : "Sorry, something went wrong" })
            console.log('err', err)
        }
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
