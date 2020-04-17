import React, { memo, useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import ValidationError from '../Validations/ValidationError'

const NumberInput = memo(({ name, rules, control, errors, ...props }) => {
    const numericRegex = /[0-9]|\./

    const onValidate = e => {
        const event = e || window.event
        let key = null

        if (event.type === 'paste') {
            key = event.clipboardData.getData('text/plain')
        } else {
            key = event.keyCode || event.which
            key = String.fromCharCode(key)
        }

        if (!numericRegex.test(key)) {
            event.returnValue = false
            if (event.preventDefault) event.preventDefault()
        } else {
            if (rules.positive) e.target.value = Math.abs(Number(e.target.value))
            if (rules.integer) e.target.value = Math.round(Number(e.target.value))
        }
    }

    const InputClasses = classNames(
        'input',
        'input-field',
        { 'w-100': props.fullwidth },
        props.className
    )

    return (
        <>
            <div className={InputClasses}>
                <input
                    type="text"
                    name={name}
                    ref={control.register(rules)}
                    className="input-field"
                    placeholder={props.placeholder}
                    disabled={props.disabled}
                    required={props.required}
                    onKeyPress={onValidate}
                    onChange={onValidate}
                    onPaste={onValidate}
                />
            </div>
            {errors && <ValidationError errors={errors} name={name} />}
        </>
    )
})

NumberInput.propTypes = {
    name: PropTypes.string.isRequired
}

NumberInput.defaultProps = {
    integer: true,
    positive: false,
    rules: {}
}

export default NumberInput
