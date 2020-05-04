import React, { memo } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx';
import ValidationError from '../Validations/ValidationError'

const CheckBoxInput = memo(({ name, required, rules, control, errors, ...props }) => {
    const classnames = clsx('checkbox', 'd-flex', 'align-items-center', props.fullwidth && 'w-100')

    if(!control) return null;

    return (
        <>
            <div className={classnames}>
                <label className="pl-1" htmlFor={name}>
                    <input
                        id={name}
                        name={name}
                        ref={control.register(rules)}
                        className="radio_field"
                        type="checkbox"
                    />

                    {props.label}
                    {props.required && <span className="required_label">*</span>}
                </label>
            </div>
            {errors && <ValidationError errors={errors} name={name}/>}
        </>
    )
})

CheckBoxInput.propTypes = {
    control : PropTypes.any.isRequired,
}

export default CheckBoxInput
