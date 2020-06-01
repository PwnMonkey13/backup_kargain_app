import React, { memo } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import Slider from '@material-ui/core/Slider';
import Tooltip from '@material-ui/core/Tooltip';
import ValidationError from '../Validations/ValidationError';

const RangeSlider = ({ name, rules, control, errors, ...props }) => {
    const InputClasses = clsx('input-field', props.fullwidth && 'w-100', props.classNames);

    return (
        <>
            <div className={InputClasses} style={{
                width: '80%',
                margin: '0 auto',
            }}>
                <Controller
                    name={name}
                    control={control}
                    defaultValue={props.defaultValue}
                    onChange={([, value]) => value}
                    as={<Slider
                        step={props.step}
                        min={props.min}
                        max={props.max}
                        valueLabelDisplay="on"
                        ValueLabelComponent={(innerProps) => <ValueLabelComponent
                            suffix={props.suffix} {...innerProps}
                        />}
                    />}
                />
            </div>
            {errors && <ValidationError errors={errors} name={name}/>}
        </>
    );
};

RangeSlider.propTypes = {
    name: PropTypes.string.isRequired,
    min: PropTypes.number,
    step: PropTypes.number,
    max: PropTypes.number,
};

RangeSlider.defaultProps = {
    rules: {},
    min: 1,
    max: 100,
    step: 10,
};

const ValueLabelComponent = memo((props) => {
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
});

export default RangeSlider;
