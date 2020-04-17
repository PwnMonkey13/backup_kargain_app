import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Tooltip } from 'reactstrap'

const ToolTipWrapper = (props) => {
    const [tooltipOpen, setTooltipOpen] = useState(false)
    const toggle = () => setTooltipOpen(!tooltipOpen)
    const tooltipRef = useRef(null)

    return (
        <div className = "fg-tooltip-wrapper" >
            <span ref={ tooltipRef }
                className={ classNames('fg-tooltip', `fg-tooltip-${props.template}`, props.position) }>
                { props.icon }
            </span>

            {tooltipRef && (
                <Tooltip placement={ props.position }
                    isOpen={ tooltipOpen }
                    target={ tooltipRef }
                    toggle={ toggle }>
                    { props.children }
                </Tooltip>
            )}
        </div>
    )
}

ToolTipWrapper.propTypes = {
    icon: PropTypes.string.isRequired
}

ToolTipWrapper.defaultProps = {
    position: 'right'
}

export default ToolTipWrapper
