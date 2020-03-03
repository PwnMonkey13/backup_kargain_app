import React, { useState } from "react";
import { Container, Row, Col } from 'reactstrap';
import VehicleTypeSelectorStep from "../../components/Form/Vehicles/VehicleTypeSelectorStep";
import LazyVehicleFormTemplate from "../../components/Form/LazyVehicleFormTemplate";

const Page = () => {
    const [ vehicleType, setVehicleType ] = useState(null);
    const handleSelectType = (type) => {
        setVehicleType(type);
    };
    return(
        <main>
            <Container className="annonce1-wrapper-container">
                <h2 className="big-mt text-center">Ajouter votre annonce</h2>
                { !vehicleType ? <VehicleTypeSelectorStep handleSelectType={handleSelectType}/> :
                    <LazyVehicleFormTemplate vehicleTye={vehicleType}/>
                }
            </Container>
        </main>
    )
};

Page.getInitialProps = function() {
    return {
        requiredAuth : true,
    };
};

export default Page;

