import React, { useState } from "react";
import { Container, Row, Col } from 'reactstrap';
import VehicleTypeSelectorStep from "../../components/Form/Vehicles/VehicleTypeSelectorStep";
import DynamicLoadVehicleForm from "../../components/Form/DynamicLoadVehicleForm";

const Page = () => {
    const [ vehicleType, setVehicleType ] = useState(null);
    const handleSelectType = (type) => {
        setVehicleType(type);
    };
    return(
        <Container fluid className="annonce1-wrapper-container">
            <h2 className="big-mt text-center">Ajouter votre annonce</h2>
            { !vehicleType ? <VehicleTypeSelectorStep handleSelectType={handleSelectType}/> :
                <DynamicLoadVehicleForm vehicleTye={vehicleType}/>
            }
        </Container>
    )
};

Page.getInitialProps = function() {
    return {
        // requiredAuth : true,
    };
};

export default Page;

