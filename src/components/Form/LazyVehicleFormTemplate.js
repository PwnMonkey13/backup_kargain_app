import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import PropTypes from "prop-types";
// import DelayedFallback from "../DelayedFallback";
import Loader from "../Loader";

const deferImport = promise =>
    new Promise(resolve => setTimeout(() => resolve(promise), 2000));

const LazyVehicleFormTemplate = ({vehicleTye}) => {
    const DynamicComponent = dynamic(import(`./Vehicles/${vehicleTye}`));
    return <DynamicComponent/>;
};

LazyVehicleFormTemplate.propTypes = {
    vehicleTye : PropTypes.string.isRequired,
};

export default LazyVehicleFormTemplate;
