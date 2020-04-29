import React from 'react'

const ProfileAvatar = ({src}) => {
    return(
        <div className="avatar-upload">
            <div className="avatar-edit">
                <input type="file" id="imageUpload" accept=".png, .jpg, .jpeg"/>
                <label htmlFor="imageUpload"/>
            </div>
            <div className="avatar-preview">
                <div id="imagePreview" style={{ backgroundImage: `url(${src})` }} />
            </div>
        </div>
    )
}

export default ProfileAvatar;
