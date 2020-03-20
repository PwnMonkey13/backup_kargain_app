import React from "react";
import {ErrorMessage} from "react-hook-form";

const ValidationError = ({errors, name}) => {
    return (
        <ErrorMessage errors={errors} name={name}>
            {({message, messages}) => {
                if(!message && !messages) return '';
                else if(message != null){
                    return <p className="error">{ message }</p>
                }
                else if (Array.isArray(messages)){
                    return Object.entries(messages).map(([type, message]) => (
                            <p className="error" key={type}>{message}</p>
                        )
                    );
                }
            }}
        </ErrorMessage>
    )
};

export default ValidationError;
