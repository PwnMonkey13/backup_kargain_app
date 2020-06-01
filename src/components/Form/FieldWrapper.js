import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx';

const   FieldWrapper = ({ classNameWrapper, isRow, children, ...props }) => {
    const { tooltip, label } = props
    if(!children) return null;
    const { name, rules } = children.props
    const { required } = rules || {}

    return (
        <div className={clsx(isRow && 'row align-items-center', 'FieldWrapper m-2', classNameWrapper)}>
            {label && (
                <label className="mb-0" htmlFor={name}>
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
