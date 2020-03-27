import React, { useState } from "react";
import { Container } from 'reactstrap';
import VehicleTypeSelectorStep from "../../components/Form/Vehicles/VehicleTypeSelectorStep";
import DynamicLoadVehicleForm from "../../components/Form/DynamicLoadVehicleForm";
// import CarForm from '../../components/Form/Vehicles/car';
// import BikeForm from '../../components/Form/Vehicles/moto';

const Page = () => {
    const [ vehicleType, setVehicleType ] = useState(null);

    const handleSelectType = (type) => {
        setVehicleType(type);
    };

    // const SwitchForm = () => {
    //     switch (vehicleType) {
    //         case 'car' :
    //             return <CarForm/>;
    //         case 'moto':
    //             return <BikeForm/>
    //     }
    // };

    return(
        <Container fluid className="annonce1-wrapper-container">
            { !vehicleType ? <VehicleTypeSelectorStep handleSelectType={handleSelectType}/> :
                <DynamicLoadVehicleForm vehicleType={vehicleType}/> }
        </Container>
    )
};

// Page.getInitialProps = function() {
//     return {
//         requiredAuth : true,
//     };
// };

export default Page;

