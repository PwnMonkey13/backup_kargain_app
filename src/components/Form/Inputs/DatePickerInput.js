import React from 'react'
import { DatePicker } from 'react-nice-dates'
import { Controller } from 'react-hook-form'
import PropTypes from 'prop-types'
import ValidationError from '../Validations/ValidationError'

const DatePickerInput = ({ name, control, rules, errors, ...props }) => {
    const { options, selected } = props

    let defaultValues = []
    if (selected && Array.isArray(selected)) {
        defaultValues = selected.reduce((carry, selected) =>
            ([...carry, options.find(option =>
                option.value.toLowerCase() === selected.toString().toLowerCase())]), []
        )
    }

    return (
        <>
            <Controller
                className="w-100"
                name={name}
                control={control}
                rules={rules}
                onChange={value => value[0]}
                onChangeName="onDateChange"
                valueName="date"
                as={
                    <DatePicker locale={enGB}>
                        {({ inputProps, focused }) => (
                            <Input value={date} {...inputProps} />
                        )}
                    </DatePicker>
                }
            />
            {errors && <ValidationError errors={errors} name={name} />}
        </>
    )
}

export default DatePickerInput

DatePickerInput.propTypes = {
    name: PropTypes.string.isRequired,
    control: PropTypes.object.isRequired
}
