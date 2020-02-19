import React, { memo, useState, useEffect, useCallback } from 'react';
import classNames from "classnames"
import {Row} from "reactstrap";
import PropTypes from 'prop-types';
import ValidationAlert from '../Validations/ValidationAlert';
import useIsMounted from '../../../hooks/useIsMounted';

const CheckboxMultipleInput = ({setInputs, ...props}) => {
    const isMountRef = useIsMounted();
    const [ checkedItems, setCheckedItems ] = useState([]);

    const onChange = useCallback(e => {
        const value = e.target.value;
        const isChecked = e.target.checked;
        setCheckedItems(checkedItems => [...checkedItems, { value, isChecked}]);
    },[]);

    useEffect(() => {
        if(isMountRef && checkedItems){
            const values = checkedItems.filter(el => el.isChecked === true).map(el => el.value);
            setInputs(props.name, values);
        }
    }, [checkedItems]);

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

                <Row>
                    {props.options && props.options.map((option, index) => {
                        return (
                            <div className="d-flex col-4 col-lg-3 radio_field" key={index}>
                                <Checkbox
                                    name={props.name}
                                    checked={checkedItems[option.value] === true }
                                    onChange={onChange}
                                    {...option}
                                />
                                <label> {option.label} </label>
                            </div>
                        )
                    })}
                </Row>
            </div>
            <ValidationAlert content={props.alert} />
        </div>
    )
};

CheckboxMultipleInput.defaultProps = {
    required: false,
    disabled : false,
    display : 'col',
    value: ''
};

CheckboxMultipleInput.propTypes = {
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    display: PropTypes.string,
    value: PropTypes.any,
    options: PropTypes.array,
};

const Checkbox = memo(({ onChange, ...props }) => {

    const onCheckboxChange = (e) => {
        console.log("onCheckboxChange");
        onChange(e);
    };

    return <input
        type={props.type}
        name={props.name}
        checked={props.checked}
        onChange={onCheckboxChange}
        {...props}
    />
});

Checkbox.propTypes = {
    type: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    checked: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
};

Checkbox.defaultProps = {
    type : 'checkbox',
    checked : false
};

export default CheckboxMultipleInput;
