import React, { useEffect } from 'react'
import { initGA, logPageView } from '../libs/analytics'
import LogRocket from 'logrocket';
import { Container } from 'reactstrap'
import NavbarClient from '../components/NavbarClient'
import Footer from '../components/Footer'

// LogRocket.init('p6ipds/kargain');
//import Cookies from 'universal-cookie'
// const cookies = new Cookies();
// cookies.set('redirect_url', window.location.pathname, { path: '/' })

const Layout = ({t, navmenu, ...props}) => {

    useEffect(() =>{
        if (!window.GA_INITIALIZED) {
            initGA();
            window.GA_INITIALIZED = true
        }
        logPageView();
    }, []);

    return (
        <div className="main_layout">
            { navmenu !== false && <NavbarClient/> }
            <MainBody>
                {props.children}
            </MainBody>
            <Footer/>
        </div>
    )
};

const MainBody = (props) => {
    return (
        <Container style={{marginTop: '5em', minHeight: '80vh'}}>
            {props.children}
        </Container>
    )
};

export default Layout;
