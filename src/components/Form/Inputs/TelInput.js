import React, { useState } from 'react'
import clsx from 'clsx'
import ReactPhoneInput from 'react-phone-input-2'
import ValidationError from '../Validations/ValidationError'

import PropTypes from 'prop-types'

function TelInput ({ name, rules, control, errors, ...props }) {
    const classnames = clsx('input-field',  props.fullwidth && 'w-100' )
    const [phone, setPhone] = useState('')

    const handleOnChange = value => {
        setPhone(value)
    }

    return (
        <>
            <div className={classnames}>
                <ReactPhoneInput
                    ref={control.register(rules)}
                    className="input-field"
                    name={name}
                    inputExtraProps={{
                        name: 'phone',
                        required: true,
                        autoFocus: true
                    }}
                    defaultCountry={props.country}
                    value={phone}
                    onChange={handleOnChange}
                    placeholder="Enter phone number"
                />
            </div>
            {errors && <ValidationError errors={errors} name={name}/>}
        </>
    )
}

TelInput.propTypes = {
    name: PropTypes.string.isRequired
}

TelInput.defaultProps = {
    rules: {},
    country: 'FR'
}

export default TelInput
