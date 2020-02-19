import React, { memo, useState, useEffect, useCallback } from 'react';
import classNames from "classnames";
import ValidationAlert from '../Validations/ValidationAlert';
import useIsMounted from "../../../hooks/useIsMounted";

const PasswordInput = memo(({ setInputs, ...props }) => {
    const isMountRef = useIsMounted();
    const [ hidden, setHidden ] = useState(props.hidden);
    const [value, setValue] = useState(props.value);

    const onChange = useCallback(e => {
        setValue(e.target.value);
    },[]);

    useEffect(() => {
        if(isMountRef && value) setInputs(props.name, value);
    }, [value]);

    return (
        <div className={classNames(props.classname, 'form-field')}>
            <div className={classNames(props.classname, {'form-field-row': props.display === 'inline'})}>
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
                        name={props.name}
                        type={hidden ? "password" : "text"}
                        value={value}
                        onChange={onChange}
                        className={props.alert ? 'form-danger' : ''}
                    />
                    <span className="password__show"
                          onClick={() => setHidden(!hidden)}> {hidden ? 'Show' : 'Hide'}
                    </span>
                </div>
            </div>
            <ValidationAlert content={props.alert} />
        </div>
    )
});

PasswordInput.defaultProps = {
    required: false,
    disabled : false,
    hidden : true,
    display : 'col',
    value : ''
};

export default PasswordInput;


