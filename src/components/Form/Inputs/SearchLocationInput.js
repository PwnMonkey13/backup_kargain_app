import React, {  useEffect, useRef, forwardRef } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import ValidationError from '../Validations/ValidationError';

let autoComplete;

// eslint-disable-next-line react/display-name
const Internal = forwardRef((props, ref) => {
    const { value } = props;
    return (
        <input ref={ref} {...props} value={value?.fullAddress}/>
    );
});

const SearchLocationInput = ({ name, control, rules, errors, country, types, ...props }) => {
    const autoCompleteRef = useRef(null);

    useEffect(() => {
        control.register(name, rules);
    }, []);

    useEffect(() => {
        let options = {
            types: ['address'], //(cities), (regions), address
            componentRestrictions: {}
        };

        if (country) options.componentRestrictions.country = country.toLowerCase();

        if (!window?.google?.maps?.places?.Autocomplete) {
            console.error('ERR PLACES AUTOCOMPLETE');
        } else {
            autoComplete = new window.google.maps.places.Autocomplete(
                autoCompleteRef.current,
                options
            );

            autoComplete.addListener('place_changed', () => {
                const addressObject = autoComplete.getPlace();
                let address_components = addressObject?.address_components;
                const formatted_address = addressObject?.formatted_address;

                if (Array.isArray(address_components)) {

                    //if missing housenumber
                    if(address_components.length !== 6){
                        address_components.unshift({})
                    }

                    const [houseNumberObj, streetObj, cityObj, districtObj, regionObj, countryObj, postalCodeObj] = address_components;
                    const values = {
                        housenumber: houseNumberObj?.long_name,
                        street: streetObj?.long_name,
                        city: cityObj?.long_name,
                        postalCode: postalCodeObj?.long_name,
                        country: countryObj?.long_name,
                        fullAddress: formatted_address
                    };
                    control.setValue(name, values);
                }
            });
        }
    }, [country]);

    return (
        <>
            <div className={clsx('input-field', props.fullwidth && 'w-100', 'my-2')}>
                <Controller
                    name={name}
                    control={control}
                    rules={rules}
                    as={<Internal ref={autoCompleteRef}/>}
                />
            </div>
            {errors && <ValidationError errors={errors} name={name}/>}
        </>
    );
};

SearchLocationInput.propTypes = {
    country: PropTypes.string,
    name: PropTypes.string,
    disabled: PropTypes.bool,
    types: PropTypes.arrayOf(PropTypes.string)
};

SearchLocationInput.defaultProps = {
    rules: {},
    country: 'fr',
    types: ['address']
};

export default SearchLocationInput;
