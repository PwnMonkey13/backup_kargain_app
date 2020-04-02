import React, {memo} from 'react';
import PropTypes from 'prop-types';
import ClassNames from "classnames";
import ValidationError from "../Validations/ValidationError";

const CheckBoxInput = memo(({name, required, rules, control, errors, ...props}) => {
    const classnames = ClassNames('d-flex', {'w-100' : props.fullwidth});
    return (
        <>
            <div className={classnames}>
                <input
                    name={name}
                    ref={control.register(rules)}
                    className="radio_field"
                    type="checkbox"
                />

                {props.label &&
                    <label>
                        {props.label}
                        {props.required && <span className="required_label">*</span>}
                        :
                    </label>
                }
            </div>
            {errors && <ValidationError errors={errors} name={name}/>}
        </>
    )
});

export default CheckBoxInput;
