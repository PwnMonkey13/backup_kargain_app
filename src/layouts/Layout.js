import React, { useEffect } from 'react'
import { initGA, logPageView } from '../libs/analytics'
import Footer from '../components/Footer'
import ScrollUpButton from 'react-scroll-up-button'
import NavbarClient from '../components/NavbarClient'

// import LogRocket from 'logrocket';
// LogRocket.init('p6ipds/kargain');

const Layout = ({ navmenu, fluid = true, children, ...rest }) => {
    useEffect(() => {
        if (!window.GA_INITIALIZED) {
            initGA()
            window.GA_INITIALIZED = true
        }
        logPageView()
    }, [])

    return (
        <>
            <NavbarClient/>
            <MainBody>
                {children}
            </MainBody>
            <Footer/>
            <ScrollUpButton
                ShowAtPosition={150}
                EasingType='easeOutCubic'
                AnimationDuration={500}
                ContainerClassName="scroll_to_top"
                style={{
                    height: '30px',
                    width: '30px',
                    border: '3px solid gainsboro'
                }}>
            </ScrollUpButton>
        </>
    )
}

const MainBody = ({ children }) => (
    <main className="main" style={{ minHeight: '75vh' }}>
        {children}
    </main>
)

export default Layout
