import React, { memo } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const Divider = ({ text, vertical }) => {
    const Classnames = classnames(
        'divider_stick',
        vertical ? 'vertical' : ''
    )

    return (
        <div className={Classnames}>
            <hr/>
            { text && <span><strong>{text}</strong></span> }
        </div>
    )
}

Divider.propTypes = {
    text: PropTypes.string
}

Divider.defaultProps = {
    text: 'or'
}

export default memo(Divider);
