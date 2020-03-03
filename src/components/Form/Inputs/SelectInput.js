import React from 'react';
import classNames from "classnames";
import NiceSelect from "react-select";
import ValidationError from "../Validations/ValidationError";
import {Controller} from "react-hook-form";
import PropTypes from "prop-types";

const CustomClearText = () => 'clear all';
const ClearIndicator = props => {
    const {
        children = <CustomClearText/>,
        getStyles,
        innerProps: {ref, ...restInnerProps},
    } = props;

    return (
        <div {...restInnerProps}
             ref={ref}
             style={getStyles('clearIndicator', props)}>
            <div style={{padding: '0px 5px'}}>{children}</div>
        </div>
    );
};
const ClearIndicatorStyles = (base, state) => ({
    ...base,
    cursor: 'pointer',
    color: state.isFocused ? 'blue' : 'black',
});

const SelectInput = ({label, display, alert, classname, required, inline, disabled, errors, ...rest}) => {
    const {control, rules, name, defaultValue, ...innerProps} = rest;
    const controllerProps = {control, rules, name, defaultValue};

    return (
        <div className={classNames(classname, inline ? 'form-field-row' : 'form-field')}>
            {label &&
                <div className="fg-label label">
                    <h4>
                        {label}
                        {required && <span className="required_label">*</span>}
                        :
                    </h4>
                </div>
            }

            <Controller
                as={<NiceSelect
                    components={{clearValue: ClearIndicator}}
                    styles={{clearIndicator: ClearIndicatorStyles}}
                    {...innerProps}
                />}
                onChange={([selected]) => ({value: selected})}
                {...controllerProps}
            />

            {
                errors && <ValidationError errors={errors} name={name}/>
            }
        </div>
    )
};

SelectInput.propTypes = {
    name : PropTypes.string.isRequired,
};

export default SelectInput;


