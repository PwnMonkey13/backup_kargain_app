import React from "react";
import classNames from 'classnames'
import PropTypes from "prop-types";
import {tagPropType} from "reactstrap/lib/utils";

const propTypes = {
    children: PropTypes.node,
    col: PropTypes.bool,
    check: PropTypes.bool,
    inline: PropTypes.bool,
    disabled: PropTypes.bool,
    tag: tagPropType,
    className: PropTypes.string,
};

const defaultProps = {
    tag: 'div',
};

const Row = ({children, className}) =>{
    return <div className={classNames("form-row", className)}>
        { children}
    </div>
};

const Col = ({children, className }) =>{
    return <div className={classNames("form-col", className)}>
        { children}
    </div>
};

const FormGroupCustom = (props) => {
    const {
        className,
        col,
        row,
        disabled,
        check,
        inline,
        tag: Tag,
        ...attributes
    } = props;

    const classes = classNames(
            className,
            {
                'form-col' : col,
                'form-row' : row,
                'disabled' : disabled,
                'form-check-inline' : inline
            },
            check ? 'form-check' : 'form-group',
    );

    return (
        <Tag {...attributes} className={classes} />
    );
};

FormGroupCustom.propTypes = propTypes;
FormGroupCustom.defaultProps = defaultProps;
FormGroupCustom.Row = Row;
FormGroupCustom.Col = Col;

export default FormGroupCustom;
