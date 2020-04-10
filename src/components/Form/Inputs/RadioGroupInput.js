import React, {useState, useEffect, memo} from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Row } from 'reactstrap';
import ValidationError from "../Validations/ValidationError";

const RadioGroupInput = memo(({name, control, rules, errors, options, ...props}) => {
    const FieldRow = classNames(
        'd-flex',
        { 'justify-content-center' : props.center},
        { 'flex-column' : props.vertical},
    );

    const InputClasses = classNames(
        props.noInputClass ? 'no-input' : 'form-check',
        'm-2'
    );

    return (
        <>
            <Row className={FieldRow}>
                {options && options.map((option, index) => {
                    let labelProps = { children : option.label ? option.label : null };
                    return (
                        <div key={index} className={InputClasses}>
                            <input
                                id={`${name}_${index}`}
                                type="radio"
                                ref={control.register(rules)}
                                name={name}
                                value={option.value}
                                disabled={option.disabled}
                            />
                            <label htmlFor={`${name}_${index}`} className="form-check-label" {...labelProps} />
                        </div>
                    );
                })}
            </Row>
            { errors && <ValidationError errors={errors} name={name} /> }
        </>
    )
});

RadioGroupInput.propTypes = {
    name: PropTypes.string.isRequired,
    center:  PropTypes.bool,
};

RadioGroupInput.defaultProps = {
    center : true,
    rules : {}
};

export default RadioGroupInput;
