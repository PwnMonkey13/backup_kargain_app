import React, { memo, useContext, useState } from 'react';
import NiceSelect, { components } from 'react-select';
import { Controller } from 'react-hook-form';
import PlacesServices from '../../../services/PlacesService';
import ValidationError from '../Validations/ValidationError';
import { Search } from 'react-feather';
import { ModalDialogContext } from '../../../context/ModalDialogContext';

const DropdownIndicator = props => {
    return (
        components.DropdownIndicator && (
            <components.DropdownIndicator {...props}>
                <Search/>
            </components.DropdownIndicator>
        )
    );
};

const Menu = props => props.options.length ? <components.Menu {...props}>{props.children}</components.Menu> : null;

const GeoAddressSearchInput = memo(({ name, control, rules, errors, inputProps, ...props }) => {
    const { dispatchModalError } = useContext(ModalDialogContext)
    const [state, setState] = useState({
        suggestions: [],
        selectOptions: [],
    });

    const onSelectChange = ([selected]) => {
        return selected;
    };

    const onInputSelectChange = (query) => {
        if (query.length > 2) {
            FetchGouvApi(query);
        }
    };

    const FetchGouvApi = async (query) => {
        const format = [
            'housenumber',
            'street',
            'name',
            'postcode',
            'city',
        ];

        let params = { q: query };
        if (props.enableGeoloc && props.lat && props.long) {
            params = {
                ...params,
                lat: props.lat,
                lng: props.long,
            };
        }

        try{
            const suggestions = await PlacesServices.fetchGeoGouvStreets(params);
            setState(state => ({
                ...state,
                selectOptions: suggestions.map(suggestion => {
                    const { geometry: { coordinates }, properties } = suggestion;
                    const { label } = properties;
                    const addressParts = format.reduce((carry, key) => {
                        if (properties[key]) {
                            return {
                                ...carry,
                                [key]: properties[key],
                            };
                        }
                        return carry;
                    }, {});

                    return {
                        label,
                        value: {
                            ...addressParts,
                            fullAddress : label,
                            coordinates
                        },
                    };
                })
            }));
        } catch (err) {
            dispatchModalError({err})
        }
    };

    return (
        <>
            <div className="select-field my-2">
                <Controller
                    instanceId={name}
                    name={name}
                    control={control}
                    rules={rules}
                    onChange={onSelectChange}
                    as={<NiceSelect
                        name={name}
                        isClearable={true}
                        isSearchable={true}
                        components={{
                            DropdownIndicator,
                            Menu,
                        }}
                        options={state.selectOptions}
                        onInputChange={onInputSelectChange}
                        {...inputProps}
                    />}
                />
            </div>
            {
                errors && <ValidationError errors={errors} name={name}/>
            }
        </>
    )
})

GeoAddressSearchInput.defaultProps = {
    enableGeoloc: true,
    placeholder : "Address"

}
export default GeoAddressSearchInput
