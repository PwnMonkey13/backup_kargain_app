import React, { useContext, useEffect, useState } from 'react'
import { Container } from 'reactstrap'
import { useRouter, withRouter } from 'next/router'
import Header from '../../components/Header'
import { FormContext } from '../../context/FormContext'
import VehicleTypeSelectorStep from '../../components/Vehicles/VehicleTypeSelectorStep'
import AdTypeSelectorStep from '../../components/Vehicles/AdTypeSelectorStep';
import clsx from 'clsx';
import makeStyles from '@material-ui/core/styles/makeStyles';

const path = require('path')

const useStyles = makeStyles(() => ({
    controls : {
        margin : '1rem',
        padding : '1rem',
        display : 'flex',
        justifyContent : 'center'
    },
    button: {
        padding: '1rem',
        margin: '10px',
        marginTop: '40px',
        border: '1px solid'
    }
}))

const Page = () => {
    const router = useRouter();
    const classes = useStyles();
    const [adType, setAdType] = useState(null)
    const [vehicleType, setVehicleType] = useState(null)

    const handleSelectAdType = (type) => { setAdType(type) }
    const handleSelectVehicleType = (type) => { setVehicleType(type) }

    const handleSubmit = () => {
        // const route = `form-${adType.toLowerCase()}-${vehicleType.toLowerCase()}`
        const route = `${vehicleType.toLowerCase()}`
        router.push(path.resolve(router.route, route))
    }

    return (
        <Container fluid className="annonce1-wrapper-container">
            <Header as="h2">Que souhaitez vous faire ? </Header>
            <AdTypeSelectorStep handleSelectAdType={handleSelectAdType}/>

            <Header as="h2">Choisissez le type de véhicle ? </Header>
            <VehicleTypeSelectorStep handleSelectVehicleType={handleSelectVehicleType}/>

            <div className={classes.controls}>
                { adType && vehicleType && (
                    <button className={clsx("btn", classes.button)} type="button" onClick={() => handleSubmit()}>
                        Suivant
                    </button>
                )}
            </div>

        </Container>
    )
}

export default withRouter(Page)
