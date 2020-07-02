import React, { memo } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { Controller } from 'react-hook-form'
import NiceSelect, { components } from 'react-select'
import ValidationError from '../Validations/ValidationError'

const CustomClearText = () => 'clear all'

const ClearIndicator = props => {
    const {
        children = <CustomClearText/>,
        getStyles,
        innerProps: { ref, ...restInnerProps }
    } = props

    return (
        <div ref={ref} style={getStyles('clearIndicator', props)} {...restInnerProps}>
            <div style={{ padding: '0 5px' }}>{children}</div>
        </div>
    )
}

const customStyles = {
    menu: (provided, state) => ({
        ...provided,
        width: state.selectProps.width,
        borderBottom: '1px dotted pink',
        color: state.selectProps.menuColor,
        padding: 20
    }),
    control: (_, { selectProps: { width } }) => ({
        width: width,
        flex: 1
    }),
    option: (provided, state) => ({
        ...provided,
        borderBottom: '1px dotted pink',
        color: state.isSelected ? 'red' : 'blue',
        padding: 20
    }),
    singleValue: (provided, state) => {
        const opacity = state.isDisabled ? 0.5 : 1
        const transition = 'opacity 300ms'
        return { ...provided, opacity, transition }
    }
}

const SelectInput = memo(({ name, control, rules, errors, ...props }) => {
    const { options, selected } = props
    let defaultValues = []
    if (selected && Array.isArray(selected)) {
        defaultValues = selected.reduce((carry, selected) =>
            ([...carry, options.find(option => option.value.toLowerCase() === selected.toString().toLowerCase())]), [])
    }

    return (
        <>
            <div className={clsx('select-field', 'my-1', props.className)}>
                <Controller
                    instanceId={name}
                    name={name}
                    control={control}
                    rules={rules}
                    as={ <NiceSelect
                        options={options}
                        width={props.width}
                        isClearable={props.isClearable}
                        isMulti={props.isMulti}
                        isDisabled={props.disabled}
                        styles={{ customStyles }}
                        defaultValue={defaultValues}
                        placeholder={props.placeholder}
                        components={{ clearValue: ClearIndicator }}
                        forwardProps={{ featured: props.featured }}
                    />}
                />
            </div>
            {errors && <ValidationError errors={errors} name={name} />}
        </>
    )
})

export default SelectInput

SelectInput.propTypes = {
    name: PropTypes.string.isRequired,
    control: PropTypes.object.isRequired,
    isClearable: PropTypes.bool
}

SelectInput.defaultProps = {
    rules: {},
    isMulti: false,
    isClearable: true,
    disabled: false,
    width: '200px'
}
