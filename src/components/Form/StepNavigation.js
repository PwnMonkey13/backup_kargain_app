import React from "react";
import {Row} from "reactstrap";
import PropTypes from "prop-types";
import classNames from "classnames";
import styled from "styled-components";

const Button = styled.button`
      padding: 2rem;
      margin: 10px;
      margin-top: 40px;
      padding: 10px;
      border: 1px solid;
`;

const StepNavigation = ({prev, prevLabel, next, nextLabel, submit, submitLabel, ...props}) => {
    return (
        <Row className={classNames('form_navigation', 'justify-content-around')}>

            {prev && (
                <Button
                    className="btn" type="button" onClick={() => prev()}>
                    {prevLabel}
                </Button>
            )}

            {next && !submit && (
                <Button
                    className="btn" type="button" onClick={e => next(e)}>
                    {nextLabel}
                </Button>
            )}

            {!next && submit && (
                <Button className="btn btn-primary" type="submit">
                    {submitLabel}
                </Button>
            )}

        </Row>
    );
};

StepNavigation.propTypes = {
    prev: PropTypes.func,
    next: PropTypes.func,
};

StepNavigation.defaultProps = {
    prevLabel: "Précédent",
    nextLabel: "Suivant",
    submitLabel: "Suivant"
};

export default StepNavigation;
