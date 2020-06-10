import React from 'react';
import Footer from '../components/Footer';
import ScrollUpButton from 'react-scroll-up-button';
import NavbarClient from '../components/NavbarClient';
import useTranslation from 'next-translate/useTranslation';

const Layout = ({ children }) => {
    const { t, lang } = useTranslation();
    console.log('lang in layout');
    console.log(lang);

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
                    border: '3px solid gainsboro',
                }}>
            </ScrollUpButton>
        </>
    );
};

const MainBody = ({ children }) => (
    <main className="main" style={{ minHeight: '75vh' }}>
        {children}
    </main>
);

export default Layout;
