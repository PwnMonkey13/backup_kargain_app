import React, {   useState } from 'react';
import {  Container } from 'reactstrap'
import useTranslation from 'next-translate/useTranslation'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Typography from '@material-ui/core/Typography'
import LightFilters from './LightFilters';
import Tabs from '../../Tabs/Tabs'

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

const SearchFiltersLight = ({query, updateFilters }) => {
    const classes = useStyles()
    const {t} = useTranslation()
    const [type, setType] = useState(vehicleTypes[0].value)

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
                                className="vehicle_tab"
                                id={`vehicle_type${index}`}
                                img={<img
                                    src={type === tab.value ? `/images/${tab.imgSelected}` : `/images/${tab.img}`}
                                    alt={tab.label}
                                    title={tab.label}
                                    className={classes.img}
                                />}
                            >
                                <LightFilters
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

export default React.memo(SearchFiltersLight)
