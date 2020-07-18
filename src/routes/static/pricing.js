import React, { useEffect, useState } from 'react';
import { Container } from 'reactstrap';
import { useAuth } from '../../context/AuthProvider';
import Offers from '../../components/Stripe/Offers';
import { useRouter } from 'next/router';

const Index = () => {
    const router = useRouter()
    const { isAuthReady, isAuthenticated, authenticatedUser, setForceLoginModal } = useAuth();
    const [selectedOffer, setSelectedOffer] = useState({});
    const [isSelectedOffer, setIsSelectedOffer] = useState(false);

    if (Object.keys(selectedOffer).length !== 0 && !isAuthenticated) {
        setForceLoginModal(true);
    }

    useEffect(()=>{
        if(isSelectedOffer){
            if(isAuthenticated) router.push(`${authenticatedUser.getProfileEditLink}`)
            else setForceLoginModal(true)
        }
    },[isAuthReady, isAuthenticated, isSelectedOffer])

    return (
        <Container>
            <div className="c-page-section-pricing__inner">
                <h2>Pricing</h2>
                <Offers/>
            </div>
        </Container>
    );
};

export default Index;
