import React, {memo} from "react";
import classNames from "classnames";
import {Tooltip , Col, Row} from "reactstrap";
import ToolTipWrapper from "./ToolTipWrapper";
import Header from "../../Header";

const FieldWrapper = ({children, ...props}) => {
    const {as, label, labelHtml, required, labelTop, tooltip } = props;
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

    console.log('render FieldWrapper');

    if(labelTop){
        return(
            <div className={classnamesFieldGroup}>
                <Header as={as} className={classnamesHeader} {...labelProps}>
                    {!labelProps.dangerouslySetInnerHTML && (
                        <>
                            {label}
                            {required && <span className="required_label">*</span>}
                        </>
                    )}
                </Header >

                <div className={classNames('fg-field-wrapper')}>
                    {children}
                    {
                        tooltip && <ToolTipWrapper {...tooltip}/>
                    }
                </div>
            </div>
        )
    }
    else return (
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
                    </Header >
                </Col>
            )}
            <Col sm={12} md={labelProps ? 8 : 12}>
                <div className={classNames('fg-field-wrapper')}>
                    {children}
                    {
                        tooltip && <ToolTipWrapper {...tooltip}/>
                    }
                </div>
            </Col>
        </Row>
    );
};

FieldWrapper.defaultProps = {
    vertical : false,
    as : 'h4'
};

export default memo(FieldWrapper);
