import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { Row, Col } from 'reactstrap'
import ValidationAlert from '../Validations/ValidationAlert';

function RadioInput({setInputs, template, ...props }) {

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

                { props.label &&
                    <h4>
                        {props.label}
                        {props.required && <span className="required_label">*</span> }
                        :
                    </h4>
                }
                <Row>
                    {props.choices && props.choices.map((choice, index) => {
                        return (
                            <div key={index} className="d-flex col-4 col-lg-3 radio_field">
                                <input
                                    name={props.name}
                                    type={props.type}
                                    value={choice.value}
                                    onChange={onChange}
                                    checked={choice.value === value}
                                    className={props.classnameInput}
                                />
                                <label> {choice.label} </label>
                            </div>
                        )
                    })}
                </Row>
            </div>
            <ValidationAlert content={props.alert} />
        </div>
    )
}

export default RadioInput;

RadioInput.defaultProps = {
    required: false,
    disabled : false,
    display : 'col',
    type : 'radio',
};
