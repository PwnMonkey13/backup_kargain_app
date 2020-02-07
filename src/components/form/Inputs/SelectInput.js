import React, { useState, useEffect } from 'react';
import classNames from "classnames";
import NiceSelect, {components} from "react-select";
import ValidationAlert from '../Validations/ValidationAlert';

const CustomClearText = () => 'clear all';
const ClearIndicator = props => {
    const {
        children = <CustomClearText />,
        getStyles,
        innerProps: { ref, ...restInnerProps },
    } = props;

    return (
        <div {...restInnerProps}
            ref={ref}
            style={getStyles('clearIndicator', props)}>
            <div style={{ padding: '0px 5px' }}>{children}</div>
        </div>
    );
};

const ClearIndicatorStyles = (base, state) => ({
    ...base,
    cursor: 'pointer',
    color: state.isFocused ? 'blue' : 'black',
});

const Option = (props) => {
    return (
        <components.Option {...props}>
            <img width="50" src="" alt=""/>
            <div>{props.value}</div>
            <div>{props.label}</div>
        </components.Option>
    );
};

function SelectInput({ setInputs, ...props }) {
    const [selected, setSelected] = useState(props.value);

    const onChange = selectedOptions => {
        setSelected(selectedOptions);
    };

    useEffect(() => {
        if(selected) setInputs(props.name, selected);
    }, [selected]);

    return (
        <div className={classNames(props.classname, 'form-field')}>
            <div className={classNames(props.classname, {'form-field-row': props.display === 'inline'})}>
                { props.label &&
                    <div className="label">
                        <h4>
                            {props.label}
                            {props.required && <span className="required_label">*</span>}
                            :
                        </h4>
                    </div>
                }

                <NiceSelect
                    components={{clearValue : ClearIndicator}}
                    isMulti={props.multi}
                    closeMenuOnSelect={!props.multi}
                    options={props.options}
                    styles={{ clearIndicator: ClearIndicatorStyles }}
                    value={selected}
                    onChange={onChange}
                    className={props.alert ? 'form-danger' : ''}
                />
            </div>
            <ValidationAlert content={props.alert} />
        </div>
    )
}

export default SelectInput;

SelectInput.defaultProps = {
    required: false,
    disabled : false,
    multi : false,
    display : 'col',
};
