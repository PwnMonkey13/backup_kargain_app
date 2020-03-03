import React from "react";
import {Container, Row, Col, FormGroup} from "reactstrap";

const FormStepDebug = ({getValues, formState, errors}) => {

    const parseErrors = () => {
        return Object.entries(errors).reduce((carry, [key, entry]) => {
            if (Array.isArray(entry)) {
                const sub = entry.map((subEntries) => {
                    return Object.entries(subEntries).reduce((carry2, [SubKey, subEntry]) => {
                        const {ref, ...keepAttrs} = subEntry;
                        return {...carry2, [SubKey]: keepAttrs};
                    },{});
                });
                carry = {...carry, [key]: sub};
            } else {
                const {ref, ...keepAttrs} = entry;
                carry = {...carry, [key]: keepAttrs};
            }
            return carry;
        }, {});
    };

    const parsedErrors = parseErrors();

    return (
        <Row className="form_navigation">
            <Col>
                <div>
                    <h2> onChange </h2>
                    <pre>{JSON.stringify(getValues(), null, 2)}</pre>
                </div>
            </Col>

            <Col>
                <div>
                    <h2> errors </h2>
                    {/*<pre>{JSON.stringify(parsedErrors, null, 2)}</pre>*/}
                </div>
            </Col>

            <Col>
                <div>
                    <h2> formState </h2>
                    <pre>{JSON.stringify(formState, null, 2)}</pre>
                </div>
            </Col>
        </Row>
    );
};

export default FormStepDebug;
