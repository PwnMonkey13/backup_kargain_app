import React, { memo, useEffect } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Slider from '@material-ui/core/Slider'
import Tooltip from '@material-ui/core/Tooltip'
import ValidationError from '../Validations/ValidationError'
import { Controller } from 'react-hook-form'

const RangeSlider = ({ name, rules, control, errors, ...props }) => {
    const InputClasses = classNames(
        'input-field',
        { 'w-100': props.fullwidth },
        props.classNames
    )

    return (
        <>
            <div className={InputClasses} style={{ width: '80%', margin: '0 auto' }}>
                <Controller
                    name={name}
                    control={control}
                    defaultValue={props.defaultValue}
                    onChange={([, value]) => value}
                    as={<Slider
                        step={props.step}
                        min={props.min}
                        max={props.max}
                        valueLabelDisplay="on"
                        ValueLabelComponent={(innerProps) => <ValueLabelComponent
                            suffix={props.suffix} {...innerProps}
                        />}
                    />}
                />
            </div>
            {errors && <ValidationError errors={errors} name={name}/>}
        </>
    )
}

RangeSlider.propTypes = {
    name: PropTypes.string.isRequired,
    min: PropTypes.number,
    step: PropTypes.number,
    max: PropTypes.number
}

RangeSlider.defaultProps = {
    rules: {},
    min: 1,
    max: 100,
    step: 10
}

const ValueLabelComponent = memo((props) => {
    const { children, open, value } = props
    const title = props.suffix ? `${value} ${props.suffix}` : value
    return (
        <Tooltip
            open={open}
            enterTouchDelay={0}
            placement="top"
            title={title}>
            {children}
        </Tooltip>
    )
})

export default RangeSlider
