import React, { useState } from "react";
import { Container } from 'reactstrap';
import {useRouter} from "next/router";
import VehicleTypeSelectorStep from "../../../components/Vehicles/VehicleTypeSelectorStep";

const path = require('path');

const Page = () => {
    const router = useRouter();
    const [ vehicleType, setVehicleType ] = useState(null);

    const handleSelectType = (type) => {
        setVehicleType(type);
    };

    if(vehicleType) router.push(path.resolve(router.route, 'car'));

    return( !vehicleType ? (
        <Container fluid className="annonce1-wrapper-container">
            <VehicleTypeSelectorStep handleSelectType={handleSelectType}/>
        </Container>
    ) : null);
};

export default Page;

