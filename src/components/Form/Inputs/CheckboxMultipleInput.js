import React, { memo, useState, useEffect, useCallback } from 'react';
import classNames from "classnames"
import {FormGroup, Row} from "reactstrap";
import PropTypes from 'prop-types';
import ValidationError from "../Validations/ValidationError";
import {Controller} from "react-hook-form";

const CheckboxMultipleInput = ({register, errors, inline, label, classname, options, defaultChecked, ...rest}) => {
    const {control, rules, name, defaultValue, ...innerProps} = rest;
    const controllerProps = {control, rules, name, defaultValue};
    console.log(defaultChecked);

    // let defaultChecked = [];
    // if(checked){
    //     defaultChecked = checked.reduce((carry, value) => {
    //         const match = options.find(option => option.value.toLowerCase() === value.toLowerCase());
    //         if (match) return [...carry, match.value];
    //         else return carry;
    //     },[]);
    // }
    // console.log(defaultChecked);

    return (
        <FormGroup className={classNames(classname, {"form-field-row": inline})}>
            {label &&
                <div className="fg-label label">
                    <h4>
                        {label}
                        {innerProps.required && <span className="required_label">*</span>} :
                    </h4>
                </div>
            }
            <Row>
                {options && options.map((option, index) => {
                    const isChecked = defaultChecked ?
                        defaultChecked.find(value => value.toLowerCase() === option.value.toLowerCase()) : false;
                    console.log(isChecked);

                    return (
                        <div key={index} className="d-flex col-4 col-lg-3 radio_field">
                            <input
                                ref={register}
                                id={`${name}_${index}`}
                                type="checkbox"
                                name={`${name}`}
                                defaultChecked={isChecked}
                                value={option.value}
                                {...innerProps}
                            />
                            <label htmlFor={`${name}_${index}`}> {option.label} </label>
                        </div>
                    )
                })}
            </Row>
        </FormGroup>
    )
};

CheckboxMultipleInput.propTypes = {
    name: PropTypes.string.isRequired,
};

export default CheckboxMultipleInput;
