import React, {memo} from 'react';
import NiceSelect, {components} from "react-select";
import PropTypes from "prop-types";
import ValidationError from "../Validations/ValidationError";

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
const Menu = props => props.options.length ? <components.Menu {...props}>{props.children}</components.Menu> : null;

const customStyles = {
    menu: (provided, state) => ({
        ...provided,
        width: state.selectProps.width,
        borderBottom: '1px dotted pink',
        color: state.selectProps.menuColor,
        padding: 20,
    }),
    control: (_, { selectProps: { width }}) => ({
        width: width,
        flex: 1
    }),
    option: (provided, state) => ({
        ...provided,
        borderBottom: '1px dotted pink',
        color: state.isSelected ? 'red' : 'blue',
        padding: 20,
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

    return (
        <>
            <div className="select-field">
                <NiceSelect
                    name={name}
                    ref={control.register(rules)}
                    styles={{customStyles}}
                    width='200px'
                    options={options}
                    defaultValue={defaultValues}
                    placeholder={props.placeholder}
                    components={{clearValue: ClearIndicator, Menu}}

                />
            </div>
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
