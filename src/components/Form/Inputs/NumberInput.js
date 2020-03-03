import React, { memo, useState, useEffect, useCallback } from 'react';
import PropTypes from "prop-types";
import classNames from "classnames";
import {FormGroup} from 'reactstrap';
import useIsMounted from "../../../hooks/useIsMounted";
import ValidationError from "../Validations/ValidationError";

const NumberInput = memo(({ register, errors, ...props }) => {
    if(props.positive) props.value = Math.abs(Number(props.value));
    if(props.integer) props.value = Math.round( props.value );
    const [value, setValue] = useState(props.value);
    const isMountRef = useIsMounted();

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

    return (
        <FormGroup>
            <div className={classNames(props.classname, {"form-field-row": props.inline})}>
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
                        ref={register}
                        name={props.name}
                        type="text"
                        required={props.required}
                        disabled={props.disabled}
                        onKeyPress={onKeyPress}
                        placeholder={props.placeholder}
                    />
                </div>
            </div>
            {errors && <ValidationError errors={errors} name={props.name} />}
        </FormGroup>
    )
});

NumberInput.propTypes = {
    name: PropTypes.string.isRequired,
};

NumberInput.defaultProps = {
    integer: true,
    positive: false,
    required: false,
    disabled : false,
};

export default NumberInput;
