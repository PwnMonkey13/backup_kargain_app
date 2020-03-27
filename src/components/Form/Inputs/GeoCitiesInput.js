import React, {memo, useState, useRef} from 'react';
import NiceSelect, { components } from 'react-select';
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
    const inputRef = useRef(null);
    const [state, setState] = useState({
        suggestions: [],
        selectOptions: [],
        selectedValue : ''
    });

    // const SingleValue = ({ children, ...props}) => {
    //     console.log("renderSingleValue");
    //     return (
    //         <components.SingleValue {...props} className="custom_input">
    //             <input
    //                 type="text"
    //                 ref={e => {
    //                     register(e);
    //                     inputRef.current = e;
    //                 }}
    //                 value={props.data.label}
    //                 onChange={onChangeSelectedInput}
    //                 onKeyDown={e => {
    //                    if (e.target.value.length > 0) {
    //                        e.stopPropagation();
    //                    } else if (e.key === "Enter") {
    //                        e.stopPropagation();
    //                        props.setValue(null);
    //                    }
    //                }}
    //         />
    //     </components.SingleValue>)
    // };
    //
    // const onChangeSelectedInput = (e) => {
    //     e.stopPropagation();
    //     // onInputSelectChange(e.target.value);
    //     // setState(state => ({
    //     //     ...state,
    //     //     selectedValue: e.target.value
    //     // }));
    // };

    const onInputSelectChange = (query) => {
        if (query.length > 2) {
            if(props.typeAPI === "geo"){
                FetchGouvApi(query);
            } else{
                FetchVipocoApi(query)
            }
        }
    };

    const onSelectChange = (option, action) => {
        if(option){
            control.setValue(name, option);
            setState(state => ({
                ...state,
                selectedValue: option.label
            }));
        }
    };

    const FetchGouvApi = async (query) => {
        let params = {q: query};
        if(props.enableGeoloc && props.lat && props.long){
            params = {...params, lat : props.lat, lng : props.long}
        }

        const suggestions = await PlacesServices.fetchAddresses(params);
        setState(state => ({
            ...state,
            selectOptions: suggestions.map(suggestion => {
                return {label: suggestion.properties.label, value: suggestion.properties.label}
            })
        }));
    };

    const FetchVipocoApi = async (query) => {
        const suggestions = await PlacesServices.fetchVipocoCities(query);
        setState(state => ({
            ...state,
            selectOptions: suggestions.map(suggestion => {
                return {label: suggestion.city, value: suggestion.city}
            })
        }));
    };

    return (
        <>
            <div className="select-field">
                <NiceSelect
                    name={name}
                    isClearable={true}
                    isSearchable={true}
                    components={{DropdownIndicator, Menu}}
                    placeholder="Chercher une adresse…"
                    options={state.selectOptions}
                    onInputChange={onInputSelectChange}
                    onChange={onSelectChange}
                />
            </div>
            {
                errors && <ValidationError errors={errors} name={name}/>
            }
        </>
    )
});

export default GeoCitiesInput;
