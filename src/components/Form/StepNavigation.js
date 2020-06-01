import React from 'react';
import { Row } from 'reactstrap';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/core/styles/makeStyles';
import clsx from 'clsx';

const useStyles = makeStyles(() => ({
    button: {
        padding: '1rem',
        margin: '10px',
        marginTop: '40px',
        border: '1px solid',
    },
}));

const StepNavigation = ({ prev, prevLabel, next, nextLabel, submit, submitLabel }) => {
    const classes = useStyles();
    return (
        <Row className="form_navigation justify-content-around">

            {prev && (
                <button className={clsx('btn', classes.button)} type="button" onClick={() => prev()}>
                    {prevLabel}
                </button>
            )}

            {next && !submit && (
                <button className={clsx('btn', classes.button)} type="button" onClick={e => next(e)}>
                    {nextLabel}
                </button>
            )}

            {!next && submit && (
                <button className={clsx(classes.button, 'btn btn-primary')} type="submit">
                    {submitLabel}
                </button>
            )}

        </Row>
    );
};

StepNavigation.propTypes = {
    prev: PropTypes.func,
    next: PropTypes.func,
};

StepNavigation.defaultProps = {
    prevLabel: 'Précédent',
    nextLabel: 'Suivant',
    submitLabel: 'Suivant',
};

export default StepNavigation;
