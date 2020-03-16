import React, { memo } from 'react';
import PropTypes from "prop-types";
import classNames from "classnames";
import ValidationError from "../Validations/ValidationError";

const NumberInput = memo(({name, register, errors, ...props }) => {
    if(props.positive) props.value = Math.abs(Number(props.value));
    if(props.integer) props.value = Math.round( props.value );

    return (
        <>
            <div className="input">
                <input
                    ref={register}
                    name={name}
                    type="text"
                    className="input-field"
                    placeholder={props.placeholder}
                    defaultValue={props.defaultValue}
                    disabled={props.disabled}
                    required={props.required}
                />
            </div>
            {errors && <ValidationError errors={errors} name={name} />}
        </>
    )
});

NumberInput.propTypes = {
    name: PropTypes.string.isRequired,
};

NumberInput.defaultProps = {
    integer: true,
    positive: false,
};

export default NumberInput;
