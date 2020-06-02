import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ValidationError from '../Validations/ValidationError';
import RadioGroup from '@material-ui/core/RadioGroup';

const RadioGroupMUI = ({ name, options, rules, control, errors, ...props }) => {
    return (
        <>
            <div className={clsx('input-field', props.fullwidth && 'w-100')}>
                <Controller
                    name="status"
                    onChange={props.onChange}
                    control={control}
                    as={<RadioGroup row>
                        {options.map((option, i) => (
                            <FormControlLabel
                                key={i}
                                value={option.value}
                                control={<Radio color={color}/>}
                                label={option.label}
                            />
                        ))}
                    </RadioGroup>
                    }
                />
            </div>
            {errors && <ValidationError errors={errors} name={name}/>}
        </>
    );
};

RadioGroupMUI.propTypes = {
    control: PropTypes.any.isRequired,
    values: PropTypes.arrayOf(PropTypes.string),
};

RadioGroupMUI.defaultProps = {
    values: [],
};

export default RadioGroupControlledInput;
