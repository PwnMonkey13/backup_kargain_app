import React, { createContext, useContext, useEffect, useState } from 'react';
import AuthService from '../services/AuthService';
import UserModel from '../models/user.model';

const AuthContext = createContext({
    isLoading: false,
    authenticatedUser: null,
    isAuthenticated: false,
    isAuthenticatedUserAdmin: false,
});

export const AuthProvider = ({ children }) => {
    const [stateReady, setStateReady] = useState(true);
    const [isLoading, setLoading] = useState(false);
    const [forceLoginModal, setForceLoginModal] = useState(false)
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authenticatedUser, setAuthenticatedUser] = useState(new UserModel());
    const [isAuthenticatedUserAdmin, setIsAuthenticatedUserAdmin] = useState(false);

    const updateRawUser = (rawUser) => {
        setAuthenticatedUser(new UserModel(rawUser))
    }

    useEffect(() => {
        const initializeAuth = async () => {
            setLoading(true);
            setStateReady(false);
            try {
                const user = await AuthService.authorize();
                const User = new UserModel(user);
                setIsAuthenticated(!!user);
                setAuthenticatedUser(User);
                setIsAuthenticatedUserAdmin(User.isAdmin);
                setLoading(false);
                setStateReady(true);
            } catch (err) {
                setLoading(false);
                setStateReady(true);
            }
        };
        initializeAuth();
    }, []);

    return (
        <AuthContext.Provider value={{
            stateReady,
            isLoading,
            isAuthenticated,
            isAuthenticatedUserAdmin,
            authenticatedUser,
            forceLoginModal,
            setForceLoginModal,
            updateRawUser,
            setIsAuthenticated,
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth () {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
