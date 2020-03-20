import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from "prop-types";
import classNames from "classnames";
import ValidationAlert from '../Validations/ValidationAlert';
import useIsMounted from "../../../hooks/useIsMounted";
import ValidationError from "../Validations/ValidationError";

function TextareaInput({name, register, errors, ...props}) {

    return (
        <>
            <textarea
                name={props.name}
                ref={register}
                placeholder={props.placeholder}
                disabled={props.disabled}
                className="input-field m-0"
                type={props.type}
                rows={props.rows}
            />
            { errors && <ValidationError errors={errors} name={name} /> }
        </>
    )
}

TextareaInput.propTypes = {
    name : PropTypes.string.isRequired,
};

TextareaInput.defaultProps = {
    rows: 5,
};

export default TextareaInput;
