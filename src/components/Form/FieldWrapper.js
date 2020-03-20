import React, {memo} from "react";
import classNames from "classnames";
import {Col, Row} from "reactstrap";
import ToolTipWrapper from "./ToolTipWrapper";
import Header from "../Header";
import PropTypes from "prop-types";

const FieldWrapper = memo(({children, ...props}) => {
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
        'fg-field-wrapper',
        'justify-content-center',
        { 'align-items-center' : labelTop}
    );

    const classnamesField = classNames(
        'd-flex',
        'flex-column',
        { 'justify-content-center' : labelTop },
        'align-items-baseline'
    );

    if(labelTop){
        return(
            <div className={classnamesFieldGroup}>
                <section className="position-relative">
                    <Header as={as} className={classnamesHeader} {...labelProps}>
                        {!labelProps.dangerouslySetInnerHTML && (
                            <>
                                {label}
                                {required && <span className="required_label">*</span>}
                            </>
                        )}
                    </Header >
                    {
                        tooltip && <ToolTipWrapper {...tooltip}/>
                    }
                </section>
                <section className={classnamesField}>
                    {children}
                </section>
            </div>
        )
    }
    else return (
        <Row className={classnamesFieldGroup}>
            {labelProps && (
                <Col sm={12} md={3}>
                    <section className="position-relative">
                        <Header as={as} className={classnamesHeader} {...labelProps}>
                            {!labelProps.dangerouslySetInnerHTML && (
                                <>
                                    {label}
                                    {required && <span className="required_label">*</span>}
                                </>
                            )}
                        </Header >
                        {
                            tooltip && <ToolTipWrapper {...tooltip}/>
                        }
                    </section>
                </Col>
            )}
            <Col sm={12} md={labelProps ? 9 : 12}>
                <div className={classNames('fg-field-wrapper', 'my-2')}>
                    {children}
                </div>
            </Col>
        </Row>
    );
});

FieldWrapper.propTypes = {
    labelTop: PropTypes.bool,
};

FieldWrapper.defaultProps = {
    labelTop : false,
    as : 'h4'
};

export default FieldWrapper;
