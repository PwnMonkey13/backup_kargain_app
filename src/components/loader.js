import React from 'react'

const Loader = (props) => {
    return (
        <React.Fragment>
            <span className={props.fullscreen ? 'circle_loader_fullscreen' : 'circle_loader'}>
                <svg className="circle" width="60" height="60" version="1.1" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="30" cy="30" r="15"/>
                </svg>
            </span>
        </React.Fragment>
    )
};

export default Loader;
