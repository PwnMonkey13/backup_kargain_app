import React, { useEffect, useState } from 'react';
import { useGeolocation } from 'react-use';
import { geoCodeFromLatLng } from '../libs/geocoding';

const useAddress = () => {
    const [addressRaw, setRawAddress] = useState({})
    const [coordinatesLongLat, setCoordinatesLongLat ] = useState(null)
    const geolocation = useGeolocation({
        enableHighAccuracy: true,
        timeout: 10000
    })

    const addressParts = getAddressParts()
    const addressString = getStringAddress(addressParts)

    useEffect(() => {
        (async () => {

            if(geolocation.latitude && geolocation.longitude){
                const address = await geoCodeFromLatLng(geolocation.latitude, geolocation.longitude)
                setCoordinatesLongLat([geolocation.longitude, geolocation.latitude])
                setRawAddress(address)
            }
        })()
    }, [geolocation])

    function getAddressParts(){
        if (!addressRaw) return null
        if (!addressRaw.address_components) return null
        const { address_components } = addressRaw

        const format = [
            'street_number',
            'route',
            'postal_code',
            'locality',
            'administrative_area_level_2',
            'administrative_area_level_1',
            'country'
        ]

        return format.reduce((carry, val) => {
            const result = address_components.find(item => item.types.includes(val))
            if (result && result.long_name) return { ...carry, [val]: result.long_name }
            else return carry
        }, {})
    }

    function getStringAddress(parts, formatParam = null){
        if (!addressParts) return null
        const defaultFormat = [
            'street_number',
            'route',
            'postal_code',
            'locality',
            'country'
        ]
        const format = formatParam && Array.isArray(formatParam) ? formatParam : defaultFormat
        return format.map(key => parts[key]).join(' ')
    }

    return [
        addressParts,
        addressString,
        coordinatesLongLat
    ]
}

export default useAddress
