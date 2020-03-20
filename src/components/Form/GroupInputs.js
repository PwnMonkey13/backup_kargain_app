import React, {memo} from "react";
import classNames from "classnames";
import {Col, Row} from "reactstrap";
import ToolTipWrapper from "./ToolTipWrapper";
import Header from "../Header";

const GroupInputs = ({children, ...props}) => {
    const {as, label, labelHtml, required, labelTop, vertical, tooltip} = props;
    const cols = vertical ? 12 : children.length === 2 ? 6 : 4;
    const labelProps = labelHtml || label ? {
        dangerouslySetInnerHTML: labelHtml ? {__html: labelHtml} : null,
        children: label ? label : null
    } : null;

    const classnamesHeader = classNames(
        "fg-label",
        "fg-label-field",
        labelTop ? 'text-center' : 'text-right'
    );

    const classnamesFieldGroup = classNames(
        'fg-field-group',
        'justify-content-center',
        'align-items-baseline',
        labelTop ? 'align-items-center' : '',
    );

    const classnamesFieldsRow = classNames(
        'justify-content-center',
        vertical ? "flex-column" : '',
        vertical ? "align-items-center" : ''
    );

    if (labelTop) {
        return (
            <div className={classnamesFieldGroup}>
                <Header as={as} className={classnamesHeader} {...labelProps}>
                    {!labelProps.dangerouslySetInnerHTML && (
                        <>
                            {label}
                            {required && <span className="required_label">*</span>}
                        </>
                    )}
                </Header>

                {
                    Array.isArray(children) ? (
                        <Row className={classnamesFieldsRow}>
                            {
                                children.map((child, index) => (
                                    <Col key={index} className="fg-field-wrapper" xs={12} sm={6} md={cols} lg={cols}
                                         xl={cols}>
                                        {child}
                                    </Col>
                                ))
                            }
                        </Row>
                    ) : children
                }
                {
                    tooltip && <ToolTipWrapper {...tooltip}/>
                }
            </div>
        )
    } else
        return (
            <Row className={classnamesFieldGroup}>
                {labelProps && (
                    <Col sm={12} md={4}>
                        <Header as={as} className={classnamesHeader} {...labelProps}>
                            {!labelProps.dangerouslySetInnerHTML && (
                                <>
                                    {label}
                                    {required && <span className="required_label">*</span>}
                                </>
                            )}
                        </Header>
                    </Col>
                )}
                <Col sm={12} md={labelProps ? 8 : 12}>
                    <div className={classNames('fg-group-wrapper')}>
                        {
                            Array.isArray(children) ? (
                                <Row className={classNames(vertical ? "flex-column" : '')}>
                                    {
                                        children.map((child, index) => (
                                            <Col key={index} className="fg-field-wrapper" xs={12} sm={6} md={cols}
                                                 lg={cols}
                                                 xl={cols}>
                                                {child}
                                            </Col>
                                        ))
                                    }
                                </Row>
                            ) : children
                        }
                        {
                            tooltip && <ToolTipWrapper {...tooltip}/>
                        }
                    </div>
                </Col>
            </Row>
        )
};

GroupInputs.defaultProps = {
    vertical: false,
    as: 'h3'
};

export default memo(GroupInputs);
