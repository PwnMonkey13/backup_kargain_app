import React, { useState, useEffect } from 'react';
import classNames from "classnames";
import {Row} from "reactstrap";
import PropTypes from 'prop-types';
import ValidationAlert from '../Validations/ValidationAlert';

const CheckboxMultipleInput = ({ setInputs, ...props }) => {

    const [ checkedItems, setCheckedItems ] = useState(new Map());

    const onChange = (e) => {
        const item = e.target.value;
        const isChecked = e.target.checked;
        setCheckedItems(checkedItems.set(item, isChecked));
    };

    useEffect(() => {
        if(checkedItems){
            const values = Array.from(checkedItems.keys());
            setInputs(props.name, values);
        }
    }, [checkedItems]);

    return (
        <div className={classNames(props.classname, 'form-field')}>
            <div className={classNames(props.classname, {'form-field-row': props.display === 'inline'})}>

                { props.label &&
                    <div className="label">
                        <h4>
                            {props.label}
                            {props.required && <span className="required_label">*</span>}
                            :
                        </h4>
                    </div>
                }

                <Row>
                    {props.options && props.options.map((option, index) => {
                        return (
                            <div className="d-flex col-4 col-lg-3 radio_field" key={index}>
                                <Checkbox
                                    name={props.name}
                                    checked={checkedItems.get(option.value)}
                                    onChange={onChange}
                                    {...option}
                                />
                                <label> {option.label} </label>
                            </div>
                        )
                    })}
                </Row>
            </div>
            <ValidationAlert content={props.alert} />
        </div>
    )
};

CheckboxMultipleInput.defaultProps = {
    required: false,
    disabled : false,
    display : 'col',
    value : '',
    values : []
};

CheckboxMultipleInput.propTypes = {
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    display: PropTypes.string,
    value: PropTypes.any,
    options: PropTypes.array,
};

const Checkbox = ({ onChange, ...props }) => {
    return <input
        type={props.type}
        name={props.name}
        checked={props.checked}
        onChange={onChange}
        {...props}
    />
};

Checkbox.propTypes = {
    type: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    checked: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
};

Checkbox.defaultProps = {
    type : 'checkbox',
    checked : false
};

export default CheckboxMultipleInput;
