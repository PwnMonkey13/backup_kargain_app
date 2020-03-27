import React from "react";
import PropTypes from "prop-types";
import ValidationError from "../Validations/ValidationError";
import ClassNames from "classnames";

const TextInput = ({name, rules, control, errors, ...props}) => {
    const classnames = ClassNames("input-field", {'w-100' : props.fullwidth});

    return (
        <>
            <div className={classnames}>
                <input
                       type="text"
                       ref={control.register(rules)}
                       name={name}
                       placeholder={props.placeholder}
                       disabled={props.disabled}
                       onBlur={props.onBlur}
                />
            </div>
            {errors && <ValidationError errors={errors} name={name}/>}
        </>
    );
};

TextInput.propTypes = {
    name: PropTypes.string.isRequired,
};

TextInput.defaultProps = {
    rules: {},
};

export default TextInput;
