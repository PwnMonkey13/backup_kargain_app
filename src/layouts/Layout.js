import React, {useEffect, useContext} from 'react'
import {initGA, logPageView} from '../libs/analytics'
import {Container} from 'reactstrap'
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
        <div className="main_layout">
            {navmenu !== false && <NavbarClient/>}
            <MainBody fluid={fluid}>
                {React.cloneElement(children,  rest)}
            </MainBody>
            <Footer/>
        </div>
    )
};

const MainBody = ({fluid, children}) => {
    return (
        <Container fluid={fluid} style={{marginTop: '5rem'}}>
            {children}
        </Container>
    )
};

export default Layout;
