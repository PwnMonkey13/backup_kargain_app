import React, {useRef, useState, useEffect} from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import {Tooltip, Col, Row} from "reactstrap";
import styled from "styled-components";

function createMarkup(content) {
    return {__html: content};
}

const ToolTipWrapper = (props) => {
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const toggle = () => setTooltipOpen(!tooltipOpen);
    const tooltipRef = useRef(null);

    useEffect(() => {
        // console.log(tooltipRef.current);
    }, [tooltipRef]);

    return (
        <div className="fg-tooltip-wrapper">
            <span ref={tooltipRef} className={classNames("fg-tooltip", `fg-tooltip-${props.template}`, props.position)}> {props.icon} </span>
            {
                tooltipRef && (
                    <Tooltip placement={props.position} isOpen={tooltipOpen} target={tooltipRef} toggle={toggle}
                             dangerouslySetInnerHTML={createMarkup(props.content)}/>
                )
            }
        </div>
    )
};

ToolTipWrapper.propTypes = {
    icon: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
};

ToolTipWrapper.defaultProps = {
    position: "right"
};

export default ToolTipWrapper;