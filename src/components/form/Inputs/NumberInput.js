import React, { useState, useEffect } from 'react';
import classNames from "classnames";
import ValidationAlert from '../Validations/ValidationAlert';

function NumberInput({ setInputs, ...props }) {

    const onKeyPress = e =>{
        const { charCode } = e,
            { integer, positive } = props,
            allowed = ( positive ? [] : [ 45 ]).concat( integer ? [] : [ 46 ] );

        if( e.ctrlKey ) return;

        if( charCode && // allow control characters
            ( charCode < 48 || charCode > 57 ) && // char is number
            allowed.indexOf( charCode ) < 0 ){ // allowed char codes
            e.preventDefault();
        }
    };

    if(props.positive) props.value = Math.abs(Number(props.value));
    if(props.integer) props.value = Math.round( props.value );

    const [value, setValue] = useState(props.value);
    const onChange = (e) => {
        setValue(e.target.value);
    };

    useEffect(() => {
        if(value) setInputs(props.name, value);
    }, [value]);

    return (
        <div className={classNames(props.classname, 'form-field')}>
            <div className={classNames(props.classname, {'form-field-row': props.display === 'inline'})}>

                <div className="label">
                    {props.label &&
                        <h4>
                            {props.label}
                            {props.required && <span className="required_label">*</span>}
                            :
                        </h4>
                    }
                </div>

                <div className="input">
                    <input
                        name={props.name}
                        type="text"
                        required={props.required}
                        disabled={props.disabled}
                        value={value}
                        onChange={onChange}
                        onKeyPress={onKeyPress}
                        placeholder={props.placeholder}
                        className={props.alert ? 'form-danger' : ''}
                    />
                </div>
                <ValidationAlert content={props.alert} />
            </div>
        </div>
    )
}

NumberInput.defaultProps = {
    integer: true,
    positive: false,
    required: false,
    disabled : false,
    display : 'col',
    value : null
};

export default NumberInput;
