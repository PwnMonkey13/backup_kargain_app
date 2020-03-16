import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from "prop-types";
import classNames from "classnames";
import ValidationAlert from '../Validations/ValidationAlert';
import useIsMounted from "../../../hooks/useIsMounted";
import ValidationError from "../Validations/ValidationError";

function TextareaInput({...props}) {
    const isMountRef = useIsMounted();
    const [value, setValue] = useState(props.value);

    const onChange = useCallback(e => {
        setValue(e.target.value);
    },[]);

    useEffect(() => {
        // if(isMountRef && value) setInputs(props.name, value);
    }, [value]);

    return (
        <>
            <textarea
                name={props.name}
                type={props.type}
                rows={props.rows}
                className={props.alert ? 'form-danger' : ''}
            />
            <ValidationAlert content={props.alert}/>
            { errors && <ValidationError errors={errors} name={name} /> }
        </>
    )
}

TextareaInput.propTypes = {
    name : PropTypes.string.isRequired,
};

TextareaInput.defaultProps = {
    rows: 10,
};

export default TextareaInput;
