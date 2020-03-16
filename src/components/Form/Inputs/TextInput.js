import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import {Row, Col, FormGroup} from "reactstrap";
import ValidationError from "../Validations/ValidationError";

const TextInput = ({name, register, errors, ...props}) => {

    return (
        <>
            <input className="input-field"
                   type="text"
                   ref={register}
                   name={name}
                   placeholder={props.placeholder}
                   disabled={props.disabled}
            />
            {errors && <ValidationError errors={errors} name={name}/>}
        </>
    );
};

TextInput.propTypes = {
    name: PropTypes.string.isRequired,
};

export default TextInput;
