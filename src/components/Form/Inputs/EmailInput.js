import React, {memo} from 'react';
import ValidationError from "../Validations/ValidationError";

const EmailInput = memo(({name, classname, register, errors, ...props}) => {

    return (
        <>
            <input className="input-field"
                   name={name}
                   ref={register}
                   type="text"
                   placeholder={props.placeholder}
                   required={props.required}
                   disabled={props.disabled}
            />
            {errors && <ValidationError errors={errors} name={name}/>}
        </>
    )
});

EmailInput.defaultProps = {
    required: false,
    disabled: false,
};

export default EmailInput;
