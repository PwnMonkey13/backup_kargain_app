import React, {useState, useEffect, memo} from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Row, Col} from 'reactstrap';
import ValidationError from "../Validations/ValidationError";

const RadioInput = ({name, register, vertical, options, errors, ...props}) => {
    return (
        <>
            <Row className={classNames('d-flex', vertical ? 'd-flex flex-column' : '')}>
                {options && options.map((option, index) => {
                    let labelProps = {
                        dangerouslySetInnerHTML : option.labelHtml ? {__html: option.labelHtml} : null,
                        children : option.label ? option.label : null
                    };
                    return (
                        <div key={index} className={classNames('form-check', 'my-2')}>
                            <input
                                id={`${name}_${index}`}
                                type="radio"
                                ref={register}
                                name={name}
                                value={option.value}
                                defaultChecked={option.checked}
                                disabled={props.disabled}
                            />
                            <label htmlFor={`${name}_${index}`} className="form-check-label" {...labelProps} />
                        </div>
                    );
                })}
            </Row>
            { errors && <ValidationError errors={errors} name={name} /> }
        </>
    )
};

RadioInput.propTypes = {
    name: PropTypes.string.isRequired,
};

export default RadioInput;
