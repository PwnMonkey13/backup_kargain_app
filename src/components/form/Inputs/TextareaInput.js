import React, { useState, useEffect } from 'react';
import classNames from "classnames";
import ValidationAlert from '../Validations/ValidationAlert';

function TextareaInput({setInputs, ...props}) {

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
                <textarea
                    name={props.name}
                    type={props.type}
                    rows={props.rows}
                    value={value}
                    onChange={onChange}
                    className={props.alert ? 'form-danger' : ''}
                />
            </div>
            <ValidationAlert content={props.alert}/>
        </div>
    )
}

TextareaInput.defaultProps = {
    required: false,
    disabled: false,
    display: 'col',
    rows: 10,
    value : ''
};

export default TextareaInput;
