import React, { memo, useState, useEffect, useCallback } from 'react';
import PropTypes from "prop-types";
import classNames from 'classnames';
import { Row, Col } from 'reactstrap'
import ValidationAlert from '../Validations/ValidationAlert';
import useIsMounted from "../../../hooks/useIsMounted";
import ValidationError from "../Validations/ValidationError";

const RadioInput = ({register, errors, ...props }) => {
    return (
        <div className={classNames(props.classname, props.inline ? 'form-field-row' : 'form-field')}>
            {props.label &&
                <div className="fg-label label">
                    <h4>
                        {props.label}
                        {props.required && <span className="required_label">*</span>}:
                    </h4>
                </div>
            }

            <Row>
                {props.options && props.options.map((option, index) => {
                    return (
                        <div key={index} className="d-flex col-4 col-lg-3 radio_field">
                            <input
                                type="radio"
                                ref={register}
                                name={props.name}
                                value={option.value}
                            />
                            <label> {option.label} </label>
                        </div>
                    )
                })}
            </Row>
            {
                errors && <ValidationError errors={errors} name={props.name} />
            }
        </div>
    )
};

RadioInput.propTypes = {
    name : PropTypes.string.isRequired,
};

RadioInput.defaultProps = {
    required: false,
    disabled : false,
};

export default RadioInput;


