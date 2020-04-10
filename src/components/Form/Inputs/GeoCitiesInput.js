import React, {memo, useState, useRef} from 'react';
import NiceSelect, { components } from 'react-select';
import {Controller} from "react-hook-form";
import PlacesServices from "../../../services/PlacesService";
import ValidationError from "../Validations/ValidationError";
import SearchSVG from '../../SVG/SearchSVG';

const DropdownIndicator = props => {
    return (
        components.DropdownIndicator && (
            <components.DropdownIndicator {...props}>
                <SearchSVG/>
            </components.DropdownIndicator>
        )
    );
};

const Menu = props => props.options.length ? <components.Menu {...props}>{props.children}</components.Menu> : null;

const GeoCitiesInput = memo(({name, control, rules, errors, ...props}) => {
    const [state, setState] = useState({
        suggestions: [],
        selectOptions: [],
    });

    const onSelectChange = ([selected]) => {
        return selected;
    };

    const onInputSelectChange = (query) => {
        if (query.length > 2) {
            if(props.typeAPI === "geo"){
                FetchGouvApi(query);
            } else{
                FetchVipocoApi(query)
            }
        }
    };

    const FetchGouvApi = async (query) => {
        const format = [
            "housenumber",
            "street",
            "name",
            "postcode",
            "citycode",
            "city",
            "context"
        ];

        let params = {q: query};
        if(props.enableGeoloc && props.lat && props.long){
            params = {...params, lat : props.lat, lng : props.long}
        }

        const suggestions = await PlacesServices.fetchGeoGouvCities(params);
        setState(state => ({
            ...state,
            selectOptions: suggestions.map(suggestion => {
                const properties = suggestion.properties;
                const { label } = properties;
                const value = format.reduce((carry, key) => {
                    if (properties[key]) return {...carry, [key]: properties[key]};
                    else return carry;
                },{label});

                return {
                    label,
                    value
                }
            })
        }));
    };

    const FetchVipocoApi = async (query) => {
        const suggestions = await PlacesServices.fetchVipocoCities(query);

        //TODO Format parser
        setState(state => ({
            ...state,
            selectOptions: suggestions.map(suggestion => {
                return {
                    label: suggestion.city,
                    value: suggestion
                }
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
                    as={ <NiceSelect
                        name={name}
                        isClearable={true}
                        isSearchable={true}
                        components={{DropdownIndicator, Menu}}
                        placeholder="Ville ou CP"
                        options={state.selectOptions}
                        onInputChange={onInputSelectChange}
                    /> }
                />
            </div>
            {
                errors && <ValidationError errors={errors} name={name}/>
            }
        </>
    )
});

export default GeoCitiesInput;
