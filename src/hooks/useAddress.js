import {useRef, useEffect, useState} from 'react';
import {geoCodeFromLatLng} from "../libs/geocoding";
import {useGeolocation} from "react-use";

const useAddress = (format) => {
    const [ address, setAddress ] = useState({});
    //
    const geolocation = useGeolocation({
        enableHighAccuracy : true,
        timeout : 10000
    });

    const getGeolocNiceAddress = (format  = ["postal_code", "locality", "country"]) => {
        if(!address) return null;
        if(!address.address_components) return null;
        const { address_components } = address;

        return format.reduce((carry, val) => {
            const result = address_components.find(item => item.types.includes(val));
            if(result && result.long_name) return [...carry, result.long_name];
            else return carry;
        },[]).join(' ');
    };

    useEffect(() => {
        (async () => {
            if (geolocation.latitude && geolocation.longitude) {
                const address = await geoCodeFromLatLng(geolocation.latitude, geolocation.longitude);
                setAddress(address);
            }
        })();
    }, [geolocation]);

    return [ geolocation, address, getGeolocNiceAddress(format) ];
};

export default useAddress;
