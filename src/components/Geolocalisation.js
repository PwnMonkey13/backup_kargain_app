import React from 'react';
import useGeolocalisation from '../hooks/useGeolocalisation';

const Geolocalisation = () => {
    const {latitude, longitude, error} = useGeolocalisation(true, {enableHighAccuracy: true});
    return (
        <>
            <code>
                latitude: {latitude}<br/>
                longitude: {longitude}<br/>
                error: {error}
            </code>
        </>
    );
};

export default Geolocalisation;
