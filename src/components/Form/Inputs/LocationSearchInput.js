import React, { useState, useEffect } from 'react'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

// these options will bias the autocomplete predictions toward Sydney, Australia with a radius of 2000 meters,
// and limit the results to addresses only
const searchOptions = {
    // location: new window.google.maps.LatLng(-34, 151),
    radius: 2000,
    types: ['address']
    // types: ['locality', 'country']
}

const LocationSearchInput = () => {
    const [state, setState] = useState({ address: '' })

    const handleChange = address => {
        setState({ address })
    }

    const handleSelect = address => {
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => console.log('Success', latLng))
            .catch(error => console.error('Error', error))
    }

    return (
        <PlacesAutocomplete
            value={state.address}
            onChange={handleChange}
            onSelect={handleSelect}
            // shouldFetchSuggestions={state.address.length > 3}
            searchOptions={searchOptions}
        >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div>
                    <input
                        {...getInputProps({
                            placeholder: 'Search Places ...',
                            className: 'location-search-input'
                        })}
                    />
                    <div className="autocomplete-dropdown-container">
                        {loading && <div>Loading...</div>}
                        {suggestions.map(suggestion => {
                            const className = suggestion.active
                                ? 'suggestion-item--active'
                                : 'suggestion-item'
                            // inline style for demonstration purpose
                            const style = suggestion.active
                                ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                : { backgroundColor: '#ffffff', cursor: 'pointer' }
                            return (
                                <div
                                    {...getSuggestionItemProps(suggestion, {
                                        className,
                                        style
                                    })}
                                >
                                    <span>{suggestion.description}</span>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}
        </PlacesAutocomplete>
    )
}

export default LocationSearchInput
