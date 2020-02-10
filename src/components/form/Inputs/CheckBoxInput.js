import React, { useState, useEffect } from 'react';
import classNames from "classnames";
import {Row} from "reactstrap";
import PropTypes from 'prop-types';
import ValidationAlert from '../Validations/ValidationAlert';

const CheckBoxInput = ({ setInputs, ...props }) => {

    const [checked, setChecked] = useState(props.value);
    const onChange = (e) => {
        setChecked(e.target.checked);
    };

    useEffect(() => {
        if(checked) setInputs(props.name, checked);
    }, [checked]);

    return (
        <div className={classNames(props.classname, 'form-field')}>
            <div className={classNames(props.classname, {'form-field-row': props.display === 'inline'})}>

                <input
                    className="radio_field"
                    type={props.type}
                    name={props.name}
                    checked={props.checked}
                    onChange={onChange}
                />

                { props.label &&
                    <label>
                        {props.label}
                        {props.required && <span className="required_label">*</span>}
                        :
                    </label>
                }

            </div>
            <ValidationAlert content={props.alert} />
        </div>
    )
};

CheckBoxInput.defaultProps = {
    required: false,
    disabled : false,
    checked : false,
    display : 'col',
    value : '',
    options : []
};

CheckBoxInput.propTypes = {
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    checked: PropTypes.bool,
    display: PropTypes.string,
    value: PropTypes.any,
};

export default CheckBoxInput;
