import React from 'react'
import { Row } from 'reactstrap'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import makeStyles from '@material-ui/core/styles/makeStyles';
import clsx from 'clsx';

const useStyles = makeStyles(() => ({
    button: {
        padding: '1rem',
        margin: '10px',
        marginTop: '40px',
        border: '1px solid'
    }
}))

const StepNavigation = ({ prev, prevLabel, next, nextLabel, submit, submitLabel }) => {
    const classes = useStyles()
    return (
        <Row className={classNames('form_navigation', 'justify-content-around')}>

            {prev && (
                <button classname={classes.button}
                    className="btn" type="button" onClick={() => prev()}>
                    {prevLabel}
                </button>
            )}

            {next && !submit && (
                <button classname={classes.button}
                    className="btn" type="button" onClick={e => next(e)}>
                    {nextLabel}
                </button>
            )}

            {!next && submit && (
                <button classname={clsx(classes.button, "btn btn-primary")} type="submit">
                    {submitLabel}
                </button>
            )}

        </Row>
    )
}

StepNavigation.propTypes = {
    prev: PropTypes.func,
    next: PropTypes.func
}

StepNavigation.defaultProps = {
    prevLabel: 'Précédent',
    nextLabel: 'Suivant',
    submitLabel: 'Suivant'
}

export default StepNavigation
