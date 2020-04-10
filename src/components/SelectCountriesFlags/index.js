import React, {useEffect} from "react";
import PropTypes from "prop-types";
import NiceSelect, {components} from 'react-select';
import {Controller} from "react-hook-form";
import countries from './countries';
import ValidationError from "../Form/Validations/ValidationError";

const ReactFlagsSelect = ({name, rules, control, errors, ...props}) => {

    const options = Object.keys(countries).map(key => {
        return {
            value: key,
            label: countries[key],
            icon : <img src={`/images/flags/${key.toLowerCase()}.svg`} width="20" height="20" alt=""/>
        };
    });

    let defaultValue = props.defaultValue &&
        options.find(option => option.value === props.defaultValue);

    useEffect(()=>{
        control.setValue(name, defaultValue);
    },[]);

    const SingleValue = (props) => (
        <components.SingleValue {...props}>
            <p className="d-flex m-0">
                {props.data.icon}
                <span className="mx-2"> {props.data.label} </span>
            </p>
        </components.SingleValue>
    );

    const Option = (props) => {
        return (
            <components.Option {...props}>
                <p className="d-flex m-0">
                    {props.data.icon}
                    <span className="mx-2"> {props.data.label} </span>
                </p>
            </components.Option>
        );
    };

    return (
        <>
            <div className="select-field">
                <Controller
                    instanceId={name}
                    name={name}
                    control={control}
                    rules={rules}
                    onChange={props.onChange}
                    as={<NiceSelect
                        options={options}
                        isClearable={props.isClearable}
                        components={ {SingleValue, Option }}
                        defaultValue={defaultValue}
                        placeholder={props.placeholder}
                   />}
                />
            </div>
            {errors && <ValidationError errors={errors} name={name}/>}
        </>
    );
};

ReactFlagsSelect.propTypes = {
    name: PropTypes.string.isRequired,
    control: PropTypes.object.isRequired,
    isClearable : PropTypes.bool,
};

ReactFlagsSelect.defaultProps = {
    rules: {},
    defaultValue : "FR",
    isClearable : true,
};

export default ReactFlagsSelect;
