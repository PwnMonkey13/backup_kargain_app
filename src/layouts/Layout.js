import React, {useEffect, useContext} from 'react'
import {initGA, logPageView} from '../libs/analytics'
import {Container} from 'reactstrap'
import styled from 'styled-components'
import NavbarClient from '../components/NavbarClient'
import Footer from '../components/Footer'
import {ModalDialogContext} from "../components/Context/ModalDialogContext";

// import LogRocket from 'logrocket';
// LogRocket.init('p6ipds/kargain');

const Layout = ({navmenu, fluid = true, children, ...rest}) => {

    useEffect(() => {
        if (!window.GA_INITIALIZED) {
            initGA();
            window.GA_INITIALIZED = true
        }
        logPageView();
    }, []);

    return (
        <>
            <NavbarClient/>
            <MainBody>
                {React.cloneElement(children,  rest)}
            </MainBody>
            <Footer/>
        </>
    )
};

const MainBody = ({children}) => (
    <main className="main mt-4">
        {children}
    </main>
);

export default Layout;
