import React, { memo } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';
import { Controller } from 'react-hook-form';
import InputAdornment from '@material-ui/core/InputAdornment';
import ValidationError from '../Validations/ValidationError';

const NumberInputMUI = memo(({ name, rules, control, errors, ...props }) => {
    return (
        <>
            <div className={clsx('input', 'input-field', props.fullwidth && 'w-100', props.className)}>
                <Controller
                    name={name}
                    control={control}
                    rules={rules}
                    as={<Input
                        id="standard-adornment-amount"
                        startAdornment={<InputAdornment position="start">€</InputAdornment>}
                    />}
                />
            </div>
            {errors && <ValidationError errors={errors} name={name}/>}
        </>
    );
});

NumberInputMUI.propTypes = {
    name: PropTypes.string.isRequired,
};

NumberInputMUI.defaultProps = {
    integer: true,
    positive: false,
    rules: {},
};

export default NumberInputMUI;
