import React, { useContext, useEffect } from 'react';
import { useAuth } from '../../context/AuthProvider';
import AuthService from '../../services/AuthService';
import withAuth from '../../hoc/withAuth';
import { ModalDialogContext } from '../../context/ModalDialogContext';

export default withAuth(() => {
    const { dispatchModalError } = useContext(ModalDialogContext)
    const { setAuthenticatedUser, setIsAuthenticated } = useAuth();

    useEffect(() => {
        const logout = async () => {

            try {
                await AuthService.logout();
                setAuthenticatedUser(null);
                setIsAuthenticated(false);
            } catch (err) {
                dispatchModalError({ err })
            }
        };

        setTimeout(() => {
            logout();
        }, 1000);
    }, []);

    return (
        <div className="text-center pt-5 pb-5">
            <p className="lead">
                Login out...
            </p>
        </div>
    );
});
