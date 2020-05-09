import React from 'react'
import EditIcon from '@material-ui/icons/Edit';
const ProfileAvatar = ({src}) => {
    return(
        <div className="avatar-upload">
            <div className="avatar-edit">
                <input type="file" id="imageUpload" accept=".png, .jpg, .jpeg"/>
                <label htmlFor="imageUpload">
                    <EditIcon/>
                </label>
            </div>
            <div className="avatar-preview">
                <div id="imagePreview" style={{ backgroundImage: `url(${src})` }} />
            </div>
        </div>
    )
}

export default ProfileAvatar;
