import React from 'react';
import classNames from "classnames"
import {Row, Col} from "reactstrap";
import PropTypes from 'prop-types';
import ValidationError from "../Validations/ValidationError";

const CheckboxMultipleInput = ({register, errors, vertical, classname, options, defaultChecked, ...rest}) => {
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
        <>
            <Row className={classNames('d-flex', vertical ? 'd-flex flex-column' : '')}>
                {options && options.map((option, index) => {
                    const isChecked = defaultChecked ? defaultChecked.find(value => value.toLowerCase() === option.value.toLowerCase()) : false;

                    return (
                        <Col key={index} md={4} lg={3}>
                            <div className={classNames('form-check', 'my-2')}>
                                <input
                                    type="checkbox"
                                    ref={register}
                                    id={`${name}_${index}`}
                                    name={name}
                                    defaultChecked={isChecked}
                                    value={option.value}
                                    {...innerProps}
                                />
                                <label htmlFor={`${name}_${index}`}> {option.label} </label>
                            </div>
                        </Col>
                    )
                })
                }
            </Row>
            {errors && <ValidationError errors={errors} name={name}/>}
        </>
    )
};

CheckboxMultipleInput.propTypes = {
    name: PropTypes.string.isRequired,
};

export default CheckboxMultipleInput;
