import React from 'react'
import classNames from 'classnames'
import { Col, Row } from 'reactstrap'
import ToolTipWrapper from './ToolTipWrapper'
import PropTypes from 'prop-types'

const FieldWrapper = ({ as: Header, children, ...props }) => {
    const { required, center, label, labelTop, tooltip } = props

    const FieldRow = classNames(
        'fg-field-row',
        'my-2',
        'align-items-baseline',
        labelTop ? center ? 'justify-content-center' : 'justify-content-end' : '',
        { 'align-items-center': labelTop },
        { 'flex-column': labelTop }
    )

    const FieldLabel = classNames(
        'fg-label',
        labelTop ? 'justify-content-center align-items-center' : 'justify-content-end'
    )

    const FieldWrap = classNames(
        { 'justify-content-center': labelTop },
        { 'flex-column': labelTop }

    )

    return (
        <Row className={FieldRow}>
            {label && (
                <Col sm={12} md={labelTop ? 12 : 4}>
                    <div className={FieldLabel}>
                        <Header>
                            {label}
                            {required && <span className="required_label">*</span>}
                        </Header>
                        {
                            tooltip && <ToolTipWrapper {...tooltip}/>
                        }
                    </div>
                </Col>
            )}
            <Col sm={12} md={labelTop ? 12 : 8}>
                <div className={FieldWrap}>
                    {children}
                </div>
            </Col>
        </Row>
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
