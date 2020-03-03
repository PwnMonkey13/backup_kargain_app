import React, { useState, useEffect,useCallback } from 'react';
import PhoneInput from "react-phone-number-input/input";
import flags from 'country-flag-icons/react/3x2'
import 'react-phone-number-input/style.css'
import classNames from "classnames";
import ValidationAlert from '../Validations/ValidationAlert';

function TelInput({ setInputs, ...props }) {

    const [value, setValue] = useState(props.value);

    const onChange = useCallback(e => {
        setValue(e.target.value);
    },[]);

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
                    <PhoneInput
                        name={props.name}
                        type={props.type}
                        value={value}
                        onChange={onChange}
                        required={props.required}
                        disabled={props.disabled}
                        defaultCountry={props.country}
                        flags={flags}
                        placeholder="Enter phone number"
                        className={props.alert ? 'form-danger' : ''}/>
                    <ValidationAlert content={props.alert} />
                </div>
            </div>
            <ValidationAlert content={props.alert} />
        </div>
    )
}

TelInput.defaultProps = {
    required: false,
    disabled : false,
    value : '',
    type : 'tel',
    country : 'FR'
};

export default TelInput;
