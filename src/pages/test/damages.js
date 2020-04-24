import React from 'react'
import DamageSelector from '../../components/Vehicles/DamageSelector'

export default () => {
    return (
        <DamageSelector
            maxDamages={10}
            enableDebug
            tabs={[
                {
                    title: 'Extérieur',
                    key : 'exterior',
                    alt: 'Vue extérieure du véhicule',
                    img: '/images/annotations-views/outside.png'
                },
                {
                    title: 'Intérieur',
                    key : 'interior',
                    alt: 'Vue intérieure du véhicule',
                    img: '/images/annotations-views/inside.png'
                }
            ]}/>
    )
}
