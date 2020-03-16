import React from 'react';
import NiceSelect from "react-select";
import {Controller} from "react-hook-form";
import PropTypes from "prop-types";
// import classNames from "classnames";
import ValidationError from "../Validations/ValidationError";

// const CustomClearText = () => "clear all";
// const ClearIndicator = props => {
//     const {
//         children = <CustomClearText/>,
//         getStyles,
//         innerProps: {ref, ...restInnerProps}
//     } = props;
//
//     return (
//         <div ref={ref} style={getStyles("clearIndicator", props)} {...restInnerProps}>
//             <div style={{padding: "0px 5px"}}>{children}</div>
//         </div>
//     );
// };
// const ClearIndicatorStyles = (base, state) => ({
//     ...base,
//     cursor: "pointer",
//     color: state.isFocused ? "blue" : "black"
// });
// const customStyles = {
//     option: (provided, state) => ({
//         ...provided,
//         borderBottom: '1px dotted pink',
//         color: state.isSelected ? 'red' : 'blue',
//         padding: 20,
//     }),
//     control: () => ({
//         // none of react-select's styles are passed to <Control />
//         width: 200,
//     }),
//     singleValue: (provided, state) => {
//         const opacity = state.isDisabled ? 0.5 : 1;
//         const transition = 'opacity 300ms';
//
//         return { ...provided, opacity, transition };
//     }
// };

const SelectInput = ({name, control, rules, errors, ...props}) => {
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
            <Controller
                as={<NiceSelect
                    // components={{clearValue: ClearIndicator}}
                    // styles={{customStyles}}
                    // defaultValue={defaultValues}
                    options={options}
                />}
                isClearable
                name={name}
                control={control}
                // rules={rules}
            />
            {errors && <ValidationError errors={errors} name={name} />}
        </>
    )
};

export default SelectInput;

SelectInput.propTypes = {
    name: PropTypes.string.isRequired,
    control: PropTypes.object.isRequired,
};
