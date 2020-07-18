import React, { useState } from 'react';
import clsx from 'clsx';
import { Container } from 'reactstrap';
import { useRouter, withRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import makeStyles from '@material-ui/core/styles/makeStyles';
import VehicleTypeSelectorStep from '../../components/Products/VehicleTypeSelectorStep';
import AdTypeSelectorStep from '../../components/Products/AdTypeSelectorStep';
import Typography from '@material-ui/core/Typography'

const path = require('path');

const useStyles = makeStyles(() => ({
    controls: {
        margin: '1rem',
        padding: '1rem',
        display: 'flex',
        justifyContent: 'center'
    },
    button: {
        padding: '1rem',
        margin: '10px',
        marginTop: '40px',
        border: '1px solid'
    }
}));

const Page = () => {
    const router = useRouter();
    const classes = useStyles();
    const { t } = useTranslation();
    const [adType, setAdType] = useState(null);
    const [vehicleType, setVehicleType] = useState(null);

    const handleSelectAdType = (type) => { setAdType(type); };
    const handleSelectVehicleType = (type) => { setVehicleType(type); };

    const handleSubmit = () => {
        // const route = `form-${adType.toLowerCase()}-${vehicleType.toLowerCase()}`
        const route = `${vehicleType.toLowerCase()}`;
        router.push(path.resolve(router.route, route));
    };

    return (
        <Container className="annonce1-wrapper-container">
            <Typography component="h3" variant="h3" gutterBottom className="text-center">{t('vehicles:choose-vehicle-type')}</Typography>
            <VehicleTypeSelectorStep handleSelectVehicleType={handleSelectVehicleType}/>

            <Typography component="h3" variant="h3" gutterBottom className="text-center">{t('vehicles:announce-type')}</Typography>
            <AdTypeSelectorStep handleSelectAdType={handleSelectAdType}/>

            <div className={classes.controls}>
                {adType && vehicleType && (
                    <button className={clsx('btn', classes.button)} type="button" onClick={() => handleSubmit()}>
                        {t('vehicles:next')}
                    </button>
                )}
            </div>
        </Container>
    );
};

export default withRouter(Page);
