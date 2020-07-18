import CarFilters from './CarFilters';
import MotoFilters from './MotoFilters';
import CamperFilters from './CamperFilters';
import UtilityFilters from './UtilityFilters';

export default function getFiltersVehicleComponent (type) {
    switch (type) {
    case 'car' :
    default:
        return CarFilters;
    case 'camper' :
        return CamperFilters;
    case 'utility' :
        return UtilityFilters;
    case 'moto':
        return MotoFilters;
    }
}
