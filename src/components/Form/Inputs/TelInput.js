import React from 'react';
import PhoneInput from "react-phone-number-input/input";
import flags from 'country-flag-icons/react/3x2'
import 'react-phone-number-input/style.css'
import ValidationError from "../Validations/ValidationError";

function TelInput({ setInputs, ...props }) {
    return(
        <>
            <PhoneInput
                className="input-field"
                name={props.name}
                type={props.type}
                value={value}
                onChange={onChange}
                required={props.required}
                disabled={props.disabled}
                defaultCountry={props.country}
                flags={flags}
                placeholder="Enter phone number"
               />
            {errors && <ValidationError errors={errors} name={name}/>}
        </>
    )
}

TelInput.defaultProps = {
    required: false,
    disabled : false,
    type : 'tel',
    country : 'FR'
};

export default TelInput;
