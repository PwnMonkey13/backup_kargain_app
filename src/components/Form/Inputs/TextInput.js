import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import {Row, Col, FormGroup} from "reactstrap";
import ValidationError from "../Validations/ValidationError";
import ClassNames from "classnames";

const TextInput = ({name, register, errors, ...props}) => {

    const classnames = ClassNames(
        "input-field",
        {
            'w-100' : props.fullwidth,
        }
    );

    return (
        <>
            <input className={classnames}
                   type="text"
                   ref={register}
                   name={name}
                   placeholder={props.placeholder}
                   disabled={props.disabled}
                   onBlur={props.onBlur}
            />
            {errors && <ValidationError errors={errors} name={name}/>}
        </>
    );
};

TextInput.propTypes = {
    name: PropTypes.string.isRequired,
};

export default TextInput;
