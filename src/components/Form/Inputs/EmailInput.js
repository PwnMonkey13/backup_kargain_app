import React, { memo, useState, useEffect, useCallback } from 'react';
import classNames from 'classnames';
import ValidationError from "../Validations/ValidationError";

const EmailInput = memo(({ name, classname, register, errors, ...props }) => {

    return (
        <div className={classNames(classname, 'form-field')}>
            <div className={classNames(classname, props.inline ? 'form-field-row' : '')}>
                { props.label &&
                    <div className="label">
                        <h4>
                            {props.label}
                            {props.required && <span className="required_label">*</span>}
                            :
                        </h4>
                    </div>
                }

                <div className="input">
                    <input
                        name={name}
                        ref={register}
                        type="text"
                        required={props.required}
                        disabled={props.disabled}
                    />
                </div>
            </div>
            {errors && <ValidationError errors={errors} name={name}/>}
        </div>
    )
});

EmailInput.defaultProps = {
    required: false,
    disabled : false,
    display : 'col',
};

export default EmailInput;
