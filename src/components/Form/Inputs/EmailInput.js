import React, {memo, useEffect} from 'react';
import ClassNames from "classnames";
import ValidationError from '../Validations/ValidationError'
import ValidationsRules from '../Validations/ValidationRules'
import PropTypes from "prop-types";

const EmailInput = ({name, required, classname, rules, control, errors, ...props}) => {
    const classnames = ClassNames("input-field", {'w-100': props.fullwidth});
    const { validate } = rules;

    let validations = {
        validate: {
            isEmail: val => ValidationsRules.checkIsEmail(val) || "Invalid email",
            ...validate
        }
    };

    return (
        <>
            <div className={classnames}>
                <input
                    type="email"
                    name={name}
                    defaultValue={props.defaultValue}
                    ref={control.register(validations)}
                    placeholder={props.placeholder}
                    required={props.required}
                    disabled={props.disabled}
                />
            </div>
            {errors && <ValidationError errors={errors} name={name}/>}
        </>
    )
};

EmailInput.propTypes = {
    name: PropTypes.string.isRequired,
};

EmailInput.defaultProps = {
    rules: {}
};

export default EmailInput;
