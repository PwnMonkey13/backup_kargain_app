import React from "react";
import PropTypes from "prop-types";
import Select, {components} from 'react-select';
import ValidationError from "../Form/Validations/ValidationError";
import countries from './countries';

const ReactFlagsSelect = ({name, rules, control, errors, ...props}) => {

    const options = Object.keys(countries).map(key => {
        return {
            value: key,
            label: countries[key],
            icon : <img src={`/images/flags/${key.toLowerCase()}.svg`} width="20" height="20" alt=""/>
        };
    });

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
                <Select
                    name={name}
                    ref={control.register(rules)}
                    components={ {SingleValue, Option } }
                    defaultValue={options[0]}
                    options={ options }
                />
            </div>
            {errors && <ValidationError errors={errors} name={name}/>}
        </>
    );
};

ReactFlagsSelect.propTypes = {
    name: PropTypes.string.isRequired,
};

ReactFlagsSelect.defaultProps = {
    rules: {},
};

export default ReactFlagsSelect;
