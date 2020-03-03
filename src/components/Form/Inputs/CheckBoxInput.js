import React, {memo, useState, useEffect, useCallback} from 'react';
import classNames from "classnames";
import PropTypes from 'prop-types';
import ValidationAlert from '../Validations/ValidationAlert';
import useIsMounted from "../../../hooks/useIsMounted";

const CheckBoxInput = memo(({setInputs, ...props}) => {
    const isMountRef = useIsMounted();
    const [checked, setChecked] = useState(props.value);

    const onChange = useCallback(e => {
        setChecked(e.target.checked);
    },[]);

    useEffect(() => {
        if (isMountRef && checked) setInputs(props.name, checked);
    }, [checked]);

    return (
        <div className={classNames(props.classname, 'form-field')}>
            <div className={classNames(props.classname, {'form-field-row': props.display === 'inline'})}>

                <input
                    className="radio_field"
                    type={props.type}
                    name={props.name}
                    checked={checked}
                    onChange={onChange}
                />

                {props.label &&
                <label>
                    {props.label}
                    {props.required && <span className="required_label">*</span>}
                    :
                </label>
                }

            </div>
            <ValidationAlert content={props.alert}/>
        </div>
    )
});

CheckBoxInput.defaultProps = {
    required: false,
    disabled: false,
    checked: false,
    display: 'col',
    value: '',
    options: []
};

CheckBoxInput.propTypes = {
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    checked: PropTypes.bool,
    display: PropTypes.string,
    value: PropTypes.any,
};

export default CheckBoxInput;
