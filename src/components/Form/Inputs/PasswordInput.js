import React, {memo, useState} from 'react';
import ValidationError from "../Validations/ValidationError";

const PasswordInput = memo(({name, register, errors, ...props}) => {
    const [hidden, setHidden] = useState(true);

    return (
        <>
            <input className="input-field"
                   ref={register}
                   name={name}
                   type={hidden ? "password" : "text"}
                   placeholder={props.placeholder}
                   required={props.required}
                   disabled={props.disabled}
            />
            <span className="password__show"
                  onClick={() => setHidden(!hidden)}> {hidden ? 'Show' : 'Hide'}
                </span>
            {errors && <ValidationError errors={errors} name={name}/>}
        </>
    )
});

PasswordInput.defaultProps = {
    required: false,
    disabled: false,
    hidden: true,
    display: 'col',
};

export default PasswordInput;


