import React, {useEffect} from 'react';
import PropTypes from "prop-types";
import classNames from "classnames";
import Slider from '@material-ui/core/Slider';
import Tooltip from '@material-ui/core/Tooltip';
import ValidationError from "../Validations/ValidationError";

const RangeSlider = ({name, rules, control, errors, ...props}) => {
    const [value, setValue] = React.useState([props.min, props.max]);

    const InputClasses = classNames(
        "input-field",
        {'w-100' : props.fullwidth},
        props.classNames,
    );

    const handleChange = (event, val) => {
        setValue(val);
        if(val && val.length > 0){
            control.setValue(name, { min : val[0], max : val[1] });
        }
    };

    useEffect(()=>{
        control.register({ name }, rules )
    },[]);

    return (
        <>
            <div className={InputClasses} style={{ width: '80%', margin : '0 auto' }}>
                <Slider
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="on"
                    ValueLabelComponent={(innerProps) => <ValueLabelComponent suffix={props.suffix} {...innerProps}/>}
                    step={props.step}
                    min={props.min}
                    max={props.max}
                    {...props.innerProps}
                />
            </div>
            {errors && <ValidationError errors={errors} name={name}/>}
        </>
    );
};

RangeSlider.propTypes = {
    name: PropTypes.string.isRequired,
    min: PropTypes.number,
    max: PropTypes.number
};

RangeSlider.defaultProps = {
    rules: {},
    min: 1,
    max: 100,
    step: 10
};

const ValueLabelComponent = (props) => {
    const { children, open, value } = props;
    const title = props.suffix ? `${value} ${props.suffix}` : value;

    return (
        <Tooltip
            open={open}
            enterTouchDelay={0}
            placement="top"
            title={title}>
            {children}
        </Tooltip>
    );
};

export default RangeSlider;
