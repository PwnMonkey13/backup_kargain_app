import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthProvider';
import AuthService from '../../services/AuthService';
import { ModalDialogContext } from '../../context/ModalDialogContext';

const Logout = () => {
    const router = useRouter();
    const { dispatchModalError } = useContext(ModalDialogContext);
    const { isAuthenticated, updateRawUser, setIsAuthenticated } = useAuth();

    useEffect(() => {
        const logout = async () => {
            try {
                await AuthService.logout();
                updateRawUser(null);
                setIsAuthenticated(false);
            } catch (err) {
                updateRawUser(null);
                setIsAuthenticated(false);
                dispatchModalError({ err });
            }
        };

        setTimeout(() => {
            logout();
        }, 1000);
    }, []);

    useEffect(()=>{
        if (!isAuthenticated) router.push('/auth/callback?redirect=/auth/login');
    })

    return (
        <div className="text-center pt-5 pb-5">
            <p className="lead">
                Login out...
            </p>
        </div>
    );
};

export default Logout;
