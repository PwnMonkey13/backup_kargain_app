import CarFilters from './CarFilters';
import MotoFilters from './MotoFilters';

export default function getFiltersVehicleComponent(type){
    switch(type){
        case 'car' :
        default:
            return CarFilters;
        case 'moto':
        case 'scooter':
            return MotoFilters
    }
};
