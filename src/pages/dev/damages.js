import React from 'react'
import DamageSelectorTabs from '../../components/Damages/DamageSelectorTabs';

export default () => {

    const getDamages = (damages) => {
        console.log(damages);
    }

    return (
        <DamageSelectorTabs
            maxDamages={10}
            onChange={getDamages}
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
