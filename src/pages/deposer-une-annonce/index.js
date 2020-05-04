import React, { useContext, useEffect, useState } from 'react'
import { Container } from 'reactstrap'
import { useRouter, withRouter } from 'next/router'
import Header from '../../components/Header'
import { FormContext } from '../../context/FormContext'
import VehicleTypeSelectorStep from '../../components/Vehicles/VehicleTypeSelectorStep'

const path = require('path')

const Page = () => {
    const router = useRouter();
    const [vehicleType, setVehicleType] = useState(null)
    const { dispatchFormClear } = useContext(FormContext)

    useEffect(() => {
        dispatchFormClear()
    }, [])

    const handleSelectType = (type) => { setVehicleType(type) }

    if (vehicleType) router.push(path.resolve(router.route, vehicleType.toLowerCase()))

    return (
        <Container fluid className="annonce1-wrapper-container">
            <Header as="h1">Vendez votre véhicule</Header>
            <VehicleTypeSelectorStep handleSelectType={handleSelectType}/>
        </Container>
    )
}

export default withRouter(Page)
