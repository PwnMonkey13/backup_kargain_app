import React  from 'react'
import { UserContextProvider } from '../components/UserContext'
import Loading from '../components/Loading'

function MyApp({ Component, pageProps }) {

    return (
        <UserContextProvider>
            {/*<Loading {...state} />*/}
            <Component {...pageProps} />
        </UserContextProvider>
    );
}

export default MyApp;

