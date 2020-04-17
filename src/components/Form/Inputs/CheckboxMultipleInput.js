import React from 'react'
import classNames from 'classnames'
import { Row, Col } from 'reactstrap'
import PropTypes from 'prop-types'
import ValidationError from '../Validations/ValidationError'

const CheckboxMultipleInput = ({ name, register, errors, classname, options, defaultChecked, ...props }) => {
    const FieldRow = classNames(
        'd-flex',
        { 'justify-content-center': props.center },
        { 'flex-column': props.vertical }
    )

    return (
        <>
            <Row className={FieldRow}>
                {options && options.map((option, index) => {
                    const isChecked = defaultChecked
                        ? defaultChecked.find(value => value.toLowerCase() === option.value.toLowerCase()) : false

                    return (
                        <div key={index} className={classNames('form-check', 'm-2')}>
                            <input
                                type="checkbox"
                                ref={register}
                                id={`${name}_${index}`}
                                name={name}
                                defaultChecked={isChecked}
                                value={option.value}
                            />
                            <label htmlFor={`${name}_${index}`}> {option.label} </label>
                        </div>
                    )
                })
                }
            </Row>
            {
                errors && <ValidationError errors={errors} name={name}/>
            }
        </>
    )
}

CheckboxMultipleInput.propTypes = {
    name: PropTypes.string.isRequired,
    center: PropTypes.bool
}

CheckboxMultipleInput.defaultProps = {
    center: true
}

export default CheckboxMultipleInput
