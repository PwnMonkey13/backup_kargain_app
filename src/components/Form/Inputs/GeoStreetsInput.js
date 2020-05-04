import React, { memo, useState } from 'react';
import NiceSelect, { components } from 'react-select';
import { Controller } from 'react-hook-form';
import PlacesServices from '../../../services/PlacesService';
import ValidationError from '../Validations/ValidationError';
import { Search } from 'react-feather';

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

const GeoCitiesInput = memo(({ name, control, rules, errors, ...props }) => {
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
            'citycode',
            'city',
            'context',
        ];

        let params = { q: query };
        if (props.enableGeoloc && props.lat && props.long) {
            params = {
                ...params,
                lat: props.lat,
                lng: props.long,
            };
        }

        const suggestions = await PlacesServices.fetchGeoGouvStreets(params);
        setState(state => ({
            ...state,
            selectOptions: suggestions.map(suggestion => {
                const { geometry: { coordinates }, properties } = suggestion;
                const { label } = properties;
                const value = format.reduce((carry, key) => {
                    if (properties[key]) {
                        return {
                            ...carry,
                            [key]: properties[key],
                        };
                    } else {
                        return carry;
                    }
                }, { label });

                return {
                    label,
                    value: {
                        ...value,
                        lng: coordinates[0],
                        lat: coordinates[1],
                    },
                };
            })
        }));
    };

    return (
        <>
            <div className="select-field">
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
                        placeholder="Ville ou CP"
                        options={state.selectOptions}
                        onInputChange={onInputSelectChange}
                    />}
                />
            </div>
            {
                errors && <ValidationError errors={errors} name={name}/>
            }
        </>
    )
})

GeoCitiesInput.defaultProps = {
    enableGeoloc: true
}
export default GeoCitiesInput
