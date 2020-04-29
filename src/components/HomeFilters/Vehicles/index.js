import dynamic from "next/dynamic";
import CarFilters from './CarFilters'

export default function getFiltersVehicleComponent (type) {
    switch (type) {
        case 'car' :
        default:
            return CarFilters
        case 'camper' :
            return dynamic(import("./CamperFilters"));
        case 'utility' :
            return dynamic(import("./UtilityFilters"));
        case 'moto':
        case 'scooter':
            return dynamic(import("./MotoFilters"));
        }
};
