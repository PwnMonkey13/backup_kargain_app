import React from 'react';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';

const DynamicLoadVehicleForm = ({ vehicleType }) => {
    const DynamicComponent = dynamic(import(`./Vehicles/${vehicleType}`));
    return <DynamicComponent/>;
};

DynamicLoadVehicleForm.propTypes = {
    vehicleType: PropTypes.string.isRequired,
};

export default DynamicLoadVehicleForm;
