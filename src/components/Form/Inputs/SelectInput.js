import React, {memo} from 'react';
import NiceSelect from "react-select";
import {Controller} from "react-hook-form";
import {flatten, inflate} from 'flattenjs';
import PropTypes from "prop-types";
import ValidationError from "../Validations/ValidationError";
import {TextInput} from "./index";
import ClassNames from "classnames";

const CustomClearText = () => "clear all";
const ClearIndicator = props => {
    const {
        children = <CustomClearText/>,
        getStyles,
        innerProps: {ref, ...restInnerProps}
    } = props;

    return (
        <div ref={ref} style={getStyles("clearIndicator", props)} {...restInnerProps}>
            <div style={{padding: "0px 5px"}}>{children}</div>
        </div>
    );
};
const ClearIndicatorStyles = (base, state) => ({
    ...base,
    cursor: "pointer",
    color: state.isFocused ? "blue" : "black"
});
const customStyles = {
    option: (provided, state) => ({
        ...provided,
        borderBottom: '1px dotted pink',
        color: state.isSelected ? 'red' : 'blue',
        padding: 20,
    }),
    control: () => ({
        // none of react-select's styles are passed to <Control />
        width: 200,
    }),
    singleValue: (provided, state) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        const transition = 'opacity 300ms';

        return { ...provided, opacity, transition };
    }
};

const SelectInput = memo(({name, control, rules, errors, ...props}) => {
    const { options, selected } = props;

    let defaultValues = [];
    if(selected && Array.isArray(selected)){
        defaultValues = selected.reduce((carry, selected) =>
            ([...carry, options.find(option =>
                option.value.toLowerCase() === selected.toString().toLowerCase())]),[]
        );
    }

    const classnames = ClassNames("input-field", {'w-100' : props.fullwidth,});

    return (
        <>
            <Controller
                as={<NiceSelect
                    components={{clearValue: ClearIndicator}}
                    styles={{customStyles}}
                    width='auto'
                    defaultValue={defaultValues}
                    options={options}
                />}
                className={classnames}
                isClearable
                name={name}
                control={control}
                rules={rules}
                onChange={props.onChange}
            />
            {errors && <ValidationError errors={errors} name={name} />}
        </>
    )
});

export default SelectInput;

SelectInput.propTypes = {
    name: PropTypes.string.isRequired,
    control: PropTypes.object.isRequired,
};

SelectInput.defaultProps = {
    'fullwidth' : true
};
