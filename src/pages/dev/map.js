import React from 'react'
import { CssBaseline } from '@material-ui/core'
import GoogleMapStatic from '../../components/GoogleMapStatic'
import useAddress from '../../hooks/useAddress';

export default () => {
  const [,,geolocation] = useAddress()
    const {latitude, longitude} = geolocation

    return(
        <div>
            <CssBaseline/>
                <GoogleMapStatic width={600}
                                 height={300}
                                 markers={[
                                     [latitude,longitude].join(' ')
                                 ]}
                />
        </div>
    )
}
