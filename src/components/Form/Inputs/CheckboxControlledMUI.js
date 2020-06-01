import React, { memo } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ValidationError from '../Validations/ValidationError';

const CheckboxControlledMUI = ({ name, value, color, rules, control, errors, ...props }) => {

    return (
        <>
            <div className={clsx('input-field', props.fullwidth && 'w-100')}>
                <Controller
                    as={<FormControlLabel
                        label={props.label}
                        control={<Checkbox
                            color={color}
                            value={value}
                        />
                        }
                    />}
                    name={name}
                    control={control}
                    rules={rules}
                />
            </div>
            {errors && <ValidationError errors={errors} name={name}/>}
        </>
    );
};

CheckboxControlledMUI.propTypes = {
    control: PropTypes.any.isRequired,
};

CheckboxControlledMUI.defaultProps = {
    color : "primary"
}

export default CheckboxControlledMUI;
