import React, { memo, useState } from 'react'
import ValidationError from '../Validations/ValidationError'
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import ClassNames from 'classnames'
import PropTypes from 'prop-types';

const PasswordInput = memo(({ name, control, rules, errors, ...props }) => {
    const [hidden, setHidden] = useState(true)
    const classnames = ClassNames('input-field', { 'w-100': props.fullwidth })

    if(!control) return null;

    return (
        <>
            <div className={classnames}>
                <input
                    name={name}
                    ref={control.register(rules)}
                    type={hidden ? 'password' : 'text'}
                    placeholder={props.placeholder}
                    required={props.required}
                    disabled={props.disabled}
                />
                <span className="password__show" onClick={() => setHidden(!hidden)}>
                    {hidden ? <VisibilityIcon/>: <VisibilityOffIcon/> }
                </span>
            </div>
            {errors && <ValidationError errors={errors} name={name}/>}
        </>
    )
})

PasswordInput.propTypes = {
    control : PropTypes.any.isRequired,
}

PasswordInput.defaultProps = {
    required: false,
    disabled: false,
    hidden: true,
    display: 'col'
}

export default PasswordInput
