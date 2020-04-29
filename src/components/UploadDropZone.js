import React, { useContext, useEffect, useState } from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import Alert from '@material-ui/lab/Alert'
import DropZone from 'react-dropzone-uploader'
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';
import makeStyles from '@material-ui/core/styles/makeStyles'
import { getDroppedOrSelectedFiles } from 'html5-file-selector'

const blue = '#007bff';

const useStyles = makeStyles((theme) => ({
    root : {
        float: "left",
        clear: "both",
        width: "100%",
        textAlign: 'center',
        background: theme.palette.white,
        borderRadius: '7px',
        border: '3px solid #eee',
        transition: 'all .2s ease',
        userSelect: 'none',

        '&:hover': {
            borderColor: blue
        }
    },

    previewContainer: {
        width: '100%',
        padding : '1rem',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },

    labelInput : {
        backgroundColor: blue,
        color: theme.palette.white,
        cursor: 'pointer',
        padding: 10,
        borderRadius: 3,
        transition: 'all .2s ease',
        border: `2px solid ${blue}`,
        '&:hover': {
            backgroundColor: theme.palette.white,
            color: blue,
        }
    },
    img : {
        objectFit : 'contain',
        maxHeight: '300px',
        maxWidth : '300px'
    }
}));

const Layout = ({ input, previews, submitButton, dropzoneProps, files, extra: { maxFiles } }) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            {previews}

            <div {...dropzoneProps} style={{overflow : 'hidden', border : 'none'}}>
                {files.length < maxFiles && input}
            </div>

            {files.length > 0 && submitButton}
        </div>
    )
}

const Preview = ({ meta, handleDelete }) => {
    const classes = useStyles()
    const { name } = meta;
    return (
        <div className={clsx(classes.previewContainer, "dzu-previewContainer")}>
            <div style={{margin : '1rem', flex : 1}}>
                <img className={clsx(classes.img, "dzu-previewImage")} src={meta.previewUrl} alt={meta.name}/>
            </div>
            <div style={{margin : '1rem', display : 'flex', flex : 2}}>
                <Alert severity="success">{name}</Alert>
            </div>
            <div className="dzu-previewStatusContainer">
                <IconButton aria-label="delete" onClick={handleDelete}>
                    <ClearIcon/>
                </IconButton>
            </div>
        </div>
    )
}

const getFilesFromEvent = e => {
    return new Promise(resolve => {
        getDroppedOrSelectedFiles(e).then(chosenFiles => {
            resolve(chosenFiles.map(f => f.fileObject))
        })
    })
}

const UploadDropZone = ({fireFiles, ...props}) => {

    const handleSubmit = (FilesObject, allFiles) => {
        let files = FilesObject.map(file => file.file);
        fireFiles(files);
        setTimeout(()=>{
            allFiles.forEach(f => f.remove())
        },3000)
    }

    return(
        <DropZone
            onSubmit={handleSubmit}
            maxFiles={props.maxFiles}
            accept={props.accept}
            multiple={props.multiple}
            canCancel={props.canCancel}
            // inputContent={(innerProps) =>
            //     <Input {...innerProps} dragLabelReject={props.dragLabelReject} dragLabel={props.dragLabel}/>}
            inputContent={(files, extra) => (extra.reject ? props.dragLabelReject : props.dragLabel)}
            LayoutComponent={Layout}
            PreviewComponent={ props => <Preview {...props} handleDelete={()=>{}}/>}
            getFilesFromEvent={getFilesFromEvent}
            styles ={{
                dropzoneReject: { borderColor: 'red', backgroundColor: '#DAA' },
                previewImage : { maxHeight : '100px'}
            }}
            inputWithFilesContent={files => `${props.maxFiles - files.length} ${props.remainingLabel}`}
        />
    )
}

UploadDropZone.PropsType = {
    //fireFiles(files:<File>)
    fireFiles : PropTypes.func.isRequired,
    maxFiles : PropTypes.Number,
    accept : PropTypes.String,
}

UploadDropZone.defaultProps = {
    maxFiles : 10,
    accept : "image/*",
    dragLabel : "Drag images",
    dragLabelReject : "Image, audio and video files only",
    remainingLabel : "images left allowed",
    multiple : true,
    canCancel : true,
}

export default UploadDropZone

