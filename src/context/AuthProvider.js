import React, { createContext, useContext, useEffect, useState } from 'react';
import Router from 'next/router';
import AuthService from '../services/AuthService';
import UserModel from '../models/user.model';

const AuthContext = createContext({
    isLoading: false,
    authenticatedUser: null,
    isAuthenticated: false,
    isAuthenticatedUserAdmin: false,
});

export const AuthProvider = ({ children }) => {
    const [isAuthReady, setIsAuthReady] = useState(true);
    const [isLoading, setLoading] = useState(false);
    const [forceLoginModal, setForceLoginModal] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authenticatedUser, setAuthenticatedUser] = useState(new UserModel());
    const [isAuthenticatedUserAdmin, setIsAuthenticatedUserAdmin] = useState(false);

    const updateAuthenticatedRawUser = (rawUser) => {
        setAuthenticatedUser(new UserModel(rawUser));
    };

    useEffect(() => {
        initializeAuth();
    }, []);

    Router.events.on('routeChangeStart', () => {
        initializeAuth();
    });

    const initializeAuth = async () => {
        setIsAuthReady(false);
        try {
            const user = await AuthService.authorize();
            const User = new UserModel(user);
            setIsAuthenticated(!!user);
            setAuthenticatedUser(User);
            setIsAuthenticatedUserAdmin(User.isAdmin);
            setIsAuthReady(true);
        } catch (err) {
            setIsAuthReady(true);
        }
    };

    const LogoutAction = async () => {
        try {
            await AuthService.logout();
            updateAuthenticatedRawUser(null);
            setIsAuthenticated(false);
        } catch (err) {
            updateAuthenticatedRawUser(null);
            setIsAuthenticated(false);
        }
    };
    return (
        <AuthContext.Provider value={{
            isAuthReady,
            isAuthenticated,
            isAuthenticatedUserAdmin,
            authenticatedUser,
            forceLoginModal,
            setForceLoginModal,
            setIsAuthenticated,
            updateAuthenticatedRawUser,
            logout: LogoutAction,
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
