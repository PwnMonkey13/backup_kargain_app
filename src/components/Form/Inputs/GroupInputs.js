import React, { memo } from 'react';
import classNames from 'classnames';
import {Row, Col, FormGroup} from 'reactstrap'
import Header from "../../Header";

const GroupInputs = ({ as, label, children, ...props }) => {

    const classnames = classNames({
        'form-field-row' : props.display === 'inline',
        'form-field' : props.display === 'col',
    });

    return (
        <FormGroup>
            { label &&
                <Header as={as}>
                    {props.label}
                    {props.required && <span className="required_label">*</span> }
                    :
                </Header>
            }
            <div className={classnames}/>
            <Row>
                {
                    children ?
                        Array.isArray(children) ? children.map((child, index) => {
                            const cols = children.length === 2 ? 6 : 4;
                            return(
                                <Col key={index} xs={12} sm={6} md={cols} lg={cols} xl={cols}>
                                    {child}
                                </Col>
                            )
                        }) : children
                    : null
                }
            </Row>
        </FormGroup>
    )
};

GroupInputs.defaultProps = {
    display : 'inline'
};

export default memo(GroupInputs);


