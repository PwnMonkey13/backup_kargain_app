import React, {   useState } from 'react';
import {  Container } from 'reactstrap'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Typography from '@material-ui/core/Typography'
import useTranslation from 'next-translate/useTranslation'
import AdvancedFilters from './Advanced/AdvancedFilters';
import Tabs from '../Tabs/Tabs'

const useStyles = makeStyles(() => ({
    img: {
        maxWidth: '80px',
        objectFit: 'contain'
    }
}))

const vehicleTypes = [
    {
        value: 'car',
        label: 'Voiture',
        img: 'tab-car.png',
        imgSelected: 'tab-car-blue.png'
    },
    {
        value: 'moto',
        label: 'Moto',
        img: 'tab-moto.png',
        imgSelected: 'tab-moto-blue.png'
    },
    {
        value: 'utility',
        label: 'Utilitaire',
        img: 'tab-gruz.png',
        imgSelected: 'tab-gruz-blue.png'

    },
    {
        value: 'camper',
        label: 'Camping car',
        img: 'tab-camper.png',
        imgSelected: 'tab-camper-blue.png'
    }
]

const SearchFiltersAdvanced = ({query, updateFilters}) => {
    const [type, setType] = useState(vehicleTypes[0].value)
    const classes = useStyles()
    const {t} = useTranslation()

    return (
        <Container>
            <Typography component="h3" variant="h3" gutterBottom className="text-center">{t('vehicles:vehicle-type')} </Typography>
            {vehicleTypes && vehicleTypes.length && (
                <Tabs
                    defaultActive={0}
                    handleClickTab={(index) => setType(vehicleTypes[index].value)}>
                    {vehicleTypes && vehicleTypes.map((tab, index) => {
                        return (
                            <Tabs.Item
                                key={index}
                                id={`vehicle_type${index}`}
                                className="vehicle_tab"
                                img={<img
                                    src={type === tab.value ? `/images/${tab.imgSelected}` : `/images/${tab.img}`}
                                    alt={tab.label}
                                    title={tab.label}
                                    className={classes.img}
                                />}
                            >
                                <AdvancedFilters
                                    disableToggleFilters={true}
                                    query={query}
                                    vehicleType={type}
                                    updateFilters={updateFilters}
                                    defaultFilters={{
                                        vehicleType : type,
                                        adType : "sale"
                                    }}
                                />
                            </Tabs.Item>
                        )
                    })}
                </Tabs>
            )}
        </Container>
    )
}

export default React.memo(SearchFiltersAdvanced)
