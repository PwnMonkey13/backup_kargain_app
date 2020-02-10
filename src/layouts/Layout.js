import React, { useEffect } from 'react'
import { initGA, logPageView } from '../libs/analytics'
import { Container } from 'reactstrap'
import NavbarClient from '../components/NavbarClient'
import Footer from '../components/Footer'

// import LogRocket from 'logrocket';
// LogRocket.init('p6ipds/kargain');
// cookies.set('redirect_url', window.location.pathname, { path: '/' })

const Layout = (props) => {

    useEffect(() =>{
        if (!window.GA_INITIALIZED) {
            initGA();
            window.GA_INITIALIZED = true
        }
        logPageView();
    }, []);

    return (
        <div className="main_layout">
            { props.navmenu !== false && <NavbarClient {...props} /> }
            <MainBody fluid={props.fluid}>
                {props.children}
            </MainBody>
            <Footer/>
        </div>
    )
};

const MainBody = ({fluid, ...props}) => {
    return (
        <Container fluid={fluid} style={{marginTop: '5rem'}}>
            {props.children}
        </Container>
    )
};

export default Layout;
