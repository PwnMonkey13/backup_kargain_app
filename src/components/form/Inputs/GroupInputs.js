import React, { memo } from 'react';
import classNames from 'classnames';
import {Row, Col, FormGroup} from 'reactstrap'
import SwitchInput from "../SwitchInputs";

function GroupInputs({ fields, setInputs, ...props }) {

    const classnames = classNames({
        'form-field-row' : props.display === 'inline',
        'form-field' : props.display === 'col',
    });

    return (
        <FormGroup>
            { props.label &&
                <h4>
                    {props.label}
                    {props.required && <span className="required_label">*</span> }
                    :
                </h4>
            }
            <div className={classnames}/>
            <Row>
                { Array.isArray(fields) && fields.map((field, index) => {
                    const cols = fields.length === 2 ? 6 : 4;
                    return(
                        <Col key={index} xs={12} sm={6} md={cols} lg={cols} xl={cols}>
                            <SwitchInput setInputs={setInputs} {...field} />
                        </Col>
                    )
                })}
            </Row>
        </FormGroup>
    )
}

GroupInputs.defaultProps = {
    fields : []
};

export default memo(GroupInputs);


