import React, {memo, useState, useEffect, useCallback} from 'react';
import {FormGroup} from 'reactstrap';
import PropTypes from "prop-types";
import classNames from 'classnames';
import ValidationError from "../Validations/ValidationError";

const TextInput = memo(({name, register, classname, errors, ...props}) => {
    return (
        <div className={classNames(classname, 'form-field')}>
            <div className={classNames(classname, props.inline ? 'form-field-row' : '')}>
                {props.label &&
                <div className="fg-label label">
                    <h4>
                        {props.label}
                        {props.required && <span className="required_label">*</span>}
                        :
                    </h4>
                </div>
                }
                <div className={classNames('fg-field input', props.fullwidth ? "w100" : '')}>
                    <input
                        type="text"
                        ref={register}
                        name={name}
                        disabled={props.disabled}
                        className={classNames(props.fullwidth ? "w100" : '')}
                    />
                </div>
            </div>
            {
                errors && <ValidationError errors={errors} name={name}/>
            }
        </div>
    )
});

TextInput.propTypes = {
    name: PropTypes.string.isRequired,
};

TextInput.defaultProps = {
    required: false,
    disabled: false,
};

export default TextInput;
