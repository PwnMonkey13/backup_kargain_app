import React, { memo, useState, useEffect, useCallback } from 'react';
import classNames from "classnames";
import ValidationError from "../Validations/ValidationError";
import {FormGroup} from "reactstrap";

const PasswordInput = memo(({name, classname, register, errors, ...props}) => {
    const [ hidden, setHidden ] = useState(true);

    return (
        <div className={classNames(classname, 'form-field')}>
            <div className={classNames(classname, props.inline ? 'form-field-row' : '')}>
                {props.label &&
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
                        ref={register}
                        name={name}
                        type={hidden ? "password" : "text"}
                        required={props.required}
                        disabled={props.disabled}
                    />
                    <span className="password__show"
                          onClick={() => setHidden(!hidden)}> {hidden ? 'Show' : 'Hide'}
                    </span>
                </div>
            </div>
            {errors && <ValidationError errors={errors} name={name}/>}
        </div>
    )
});

PasswordInput.defaultProps = {
    required: false,
    disabled : false,
    hidden : true,
    display : 'col',
};

export default PasswordInput;


