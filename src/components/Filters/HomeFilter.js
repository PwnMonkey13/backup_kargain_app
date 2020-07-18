import React, { useState } from 'react'
import useTranslation from 'next-translate/useTranslation'
import Typography from '@material-ui/core/Typography'
import VehicleTypeSelectorStepLight from '../Products/VehicleTypeSelectorStepLight'
import AdvancedFilters from './Advanced/AdvancedFilters'

const HomeFilters = ({updateFilters}) => {
    const { t } = useTranslation();
    const [vehicleType, setVehicleType] = useState("car")
    const handleSelectVehicleType = (type) => { setVehicleType(type); };

    return(
        <>
            <Typography component="h4" variant="h4" gutterBottom className="text-center">{t('vehicles:choose-vehicle-type')}</Typography>
            <VehicleTypeSelectorStepLight handleSelectVehicleType={handleSelectVehicleType}/>
            <AdvancedFilters
                disableToggleFilters={true}
                vehicleType={vehicleType}
                updateFilters={updateFilters}
                defaultFilters={{
                    vehicleType : vehicleType,
                    adType : "sale"
                }}
            />
        </>
    )
}

export default HomeFilters
