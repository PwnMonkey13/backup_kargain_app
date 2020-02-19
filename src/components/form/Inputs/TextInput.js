import React, {memo, useState, useEffect, useCallback} from 'react';
import classNames from 'classnames';
import ValidationAlert from '../Validations/ValidationAlert';
import useIsMounted from "../../../hooks/useIsMounted";

function TextInput({setInputs, ...props}) {
    const isMountRef = useIsMounted();
    const [value, setValue] = useState(props.value);

    const onChange = useCallback(e => {
        setValue(e.target.value);
    },[]);

    useEffect(() => {
        if (isMountRef && value) setInputs(props.name, value);
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

                <div className={classNames('input', props.fullWidth ? "w100" : '')}>
                    <input
                        name={props.name}
                        type={props.type}
                        value={value}
                        onChange={onChange}
                        required={props.required}
                        disabled={props.disabled}
                        className={classNames(
                            props.alert ? 'form-danger' : '',
                            props.fullWidth ? "w100" : '')
                        }
                    />
                    <ValidationAlert content={props.alert}/>
                </div>
            </div>
        </div>
    )
}

TextInput.defaultProps = {
    required: false,
    disabled: false,
    display: 'col',
    type: 'text',
    value: ''
};

export default TextInput;
