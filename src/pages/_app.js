import React  from 'react'
import { UserContextProvider } from '../components/Context/UserContext'
import { ModalDialogContextProvider } from '../components/Context/ModalDialogContext'
import Loading from '../components/Loading'
import ModalExample from "../components/ModalExample";

function MyApp({ Component, pageProps }) {

    return (
        <ModalDialogContextProvider>
            <UserContextProvider>
                {/*<Loading {...state} />*/}
                <ModalExample/>
                <Component {...pageProps} />
            </UserContextProvider>
        </ModalDialogContextProvider>

    );
}

export default MyApp;

