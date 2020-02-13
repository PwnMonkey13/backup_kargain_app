import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import ValidationAlert from '../Validations/ValidationAlert';

const EmailInput = ({ setInputs, ...props }) => {
    const [value, setValue] = useState(props.value);

    const onChange = (e) => {
        setValue(e.target.value);
    };

    useEffect(() => {
        if(value) setInputs(props.name, value);
    }, [value]);

    return (
        <div className={classNames(props.classname, 'form-field')}>
            <div className={classNames(props.classname, { 'form-field-row' : props.display === 'inline' })}>
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
                        name={props.name}
                        type={props.type}
                        value={props.value}
                        onChange={onChange}
                        required={props.required}
                        disabled={props.disabled}
                        className={props.alert ? 'form-danger' : ''}
                    />
                </div>
            </div>
            <ValidationAlert content={props.alert} />
        </div>
    )
};

EmailInput.defaultProps = {
    required: false,
    disabled : false,
    display : 'col',
    value : ''
};

export default EmailInput;
