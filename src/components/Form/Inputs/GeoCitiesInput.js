import React, { memo, useState, useRef } from 'react'
import NiceSelect, { components } from 'react-select'
import { Controller } from 'react-hook-form'
import SearchIcon from '@material-ui/icons/Search';
import PlacesServices from '../../../services/PlacesService'
import ValidationError from '../Validations/ValidationError'
import { ModalDialogContext } from '../../../context/ModalDialogContext';

const { useContext } = require('react');

const DropdownIndicator = props => {
    return (
        components.DropdownIndicator && (
            <components.DropdownIndicator {...props}>
                <SearchIcon/>
            </components.DropdownIndicator>
        )
    )
}

const Menu = props => props.options.length ? <components.Menu {...props}>{props.children}</components.Menu> : null

const GeoCitiesInput = memo(({ name, control, rules, errors, ...props }) => {
    const { dispatchModalError } = useContext(ModalDialogContext)

    const [state, setState] = useState({
        suggestions: [],
        selectOptions: []
    })

    const onSelectChange = ([selected]) => {
        return selected
    }

    const onInputSelectChange = (query) => {
        if (query.length > 2) {
            if (props.typeAPI === 'geo') {
                FetchGouvApi(query)
            } else {
                FetchVipocoApi(query)
            }
        }
    }

    const FetchGouvApi = async (query) => {
        const format = [
            'name',
            'postcode',
            'city',
        ]

        let params = { q: query }
        if (props.enableGeoloc && props.lat && props.long) {
            params = { ...params, lat: props.lat, lng: props.long }
        }

        try{
            const suggestions = await PlacesServices.fetchGeoGouvCities(params)
            setState(state => ({
                ...state,
                selectOptions: suggestions.map(suggestion => {
                    const properties = suggestion.properties
                    const { label } = properties
                    const addressParts = format.reduce((carry, key) => {
                        if (properties[key]) return { ...carry, [key]: properties[key] }
                        else return carry
                    }, {})

                    return {
                        label,
                        value: {
                            ...addressParts,
                            fullAddress : label,
                        },
                    };
                })
            }))
        }
        catch (err) {
            dispatchModalError({err})
        }
    }

    const FetchVipocoApi = async (query) => {
        try{
            const suggestions = await PlacesServices.fetchVipocoCities(query)

            // TODO Format parser
            setState(state => ({
                ...state,
                selectOptions: suggestions.map(suggestion => {
                    return {
                        label: suggestion.city,
                        value: suggestion
                    }
                })
            }))
        }
        catch (err) {
            dispatchModalError({err})
        }
    }

    return (
        <>
            <div className="select-field my-2">
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
                        components={{ DropdownIndicator, Menu }}
                        placeholder={props.placeholder}
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
})

GeoCitiesInput.defaultProps = {
    typeAPI : "geo",
    enableGeoloc : true,
    placeholder : "Ville"
}

export default GeoCitiesInput
