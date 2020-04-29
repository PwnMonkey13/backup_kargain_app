import React from 'react'
import PropTypes from 'prop-types'

const FieldWrapper = ({ children, ...props }) => {
    const { tooltip, label } = props
    const { name, rules } = children.props
    const { required } = rules || {}
    return (
        <div className="my-2">
            {label && (
                <label htmlFor={name}>
                    <span>
                        {label}
                        {required && <span className="required_label">*</span>}
                    </span>
                </label>
            )}
            {tooltip}
            <div>
                {children}
            </div>
        </div>
    )
}

FieldWrapper.propTypes = {
    labelTop: PropTypes.bool,
    as: PropTypes.string
}

FieldWrapper.defaultProps = {
    labelTop: false,
    as: 'label'
}

export default FieldWrapper
