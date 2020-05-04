import React from 'react'
import DamageViewerTabs from '../../components/Vehicles/DamageViewerTabs';

export default () => {
    const data = {
        "exterior": {
            "title": "Extérieur",
            "key": "exterior",
            "alt": "Vue extérieure du véhicule",
            "img": "/images/annotations-views/outside.png",
            "stages": [
                {
                    "position": {
                        "left": "77%",
                        "top": "33.724340175953074%"
                    },
                    "text": "g"
                },
                {
                    "position": {
                        "left": "59%",
                        "top": "26.97947214076246%"
                    },
                    "text": "g"
                },
                {
                    "position": {
                        "left": "80.2%",
                        "top": "16.422287390029325%"
                    },
                    "text": "z"
                }
            ]
        },
        "interior": {
            "title": "Intérieur",
            "key": "interior",
            "alt": "Vue intérieure du véhicule",
            "img": "/images/annotations-views/inside.png",
            "stages": []
        }
    }

    return (
        <DamageViewerTabs tabs={data}/>
    )
}
