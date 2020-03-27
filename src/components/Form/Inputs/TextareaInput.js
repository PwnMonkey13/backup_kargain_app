import React, { memo } from 'react';
import PropTypes from "prop-types";
import ValidationError from "../Validations/ValidationError";

const TextareaInput = memo(({name, control, rules, errors, ...props}) => {
    return (
        <>
            <textarea
                name={props.name}
                ref={control.register(rules)}
                placeholder={props.placeholder}
                disabled={props.disabled}
                className="input-field m-0"
                rows={props.rows}
            />
            { errors && <ValidationError errors={errors} name={name} /> }
        </>
    )
});

TextareaInput.propTypes = {
    name : PropTypes.string.isRequired,
};

TextareaInput.defaultProps = {
    rows: 5,
    rules : {}
};

export default TextareaInput;
