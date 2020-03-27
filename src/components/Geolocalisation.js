import React, {useEffect, useState} from 'react';
import {useGeolocation} from 'react-use';
import {geoCodeFromLatLng} from "../libs/geocoding";

const getAddress = async (geolocation) => {
    return await geoCodeFromLatLng(geolocation.latitude, geolocation.longitude);
};

const Geolocalisation = () => {
    const geolocation = useGeolocation({
        enableHighAccuracy : true,
        timeout : 10000
    });

    const [address, setAddress ] = useState(null);

    useEffect(() => {
        const getData = async () => {
            if (geolocation.latitude && geolocation.longitude) {
                const address = await getAddress(geolocation);
                setAddress(address);
            }
        };
        getData();
    },[geolocation]);

    console.log(address);

    return !geolocation.error
        ? (
            <ul>
                <li>Address :          {address && address}</li>
                <li>Latitude:          {geolocation.latitude}</li>
                <li>Longitude:         {geolocation.longitude}</li>
                <li>Location accuracy: {geolocation.accuracy}</li>
                <li>Altitude:          {geolocation.altitude}</li>
                <li>Altitude accuracy: {geolocation.altitudeAccuracy}</li>
                <li>Heading:           {geolocation.heading}</li>
                <li>Speed:             {geolocation.speed}</li>
                <li>Timestamp:         {geolocation.timestamp}</li>
            </ul>
        )
        : (
            <p>No geolocation, sorry.</p>
        )
};

export default Geolocalisation;
