import React, { createContext, useContext, useEffect, useState } from 'react';
import useTranslation from 'next-translate/useTranslation'
import AuthService from '../services/AuthService';
import UserModel from '../models/user.model';

const defaultContext = {
    isAuthReady: false,
    isLoading: false,
    authenticatedUser: new UserModel(),
    isAuthenticated: false,
    isAuthenticatedUserAdmin: false
}

const AuthContext = createContext(defaultContext);

export const AuthProvider = ({ children }) => {
    const { lang } = useTranslation()
    const [authState, setAuthState] = useState(defaultContext);

    useEffect(() => {
        initializeAuth();
    }, []);

    const updateAuthenticatedRawUser = (rawUser) => {
        setAuthState(authState => ({
            ...authState,
            authenticatedUser: new UserModel(rawUser)
        }));
    };

    const initializeAuth = async () => {
        try {
            const user = await AuthService.authorize(lang);
            const User = new UserModel(user);

            setAuthState(authState => ({
                ...authState,
                isAuthReady: true,
                isAuthenticated: !!user,
                isAuthenticatedUserAdmin: User.getIsAdmin,
                authenticatedUser: User
            }));
        } catch (err) {
            setAuthState(authState => ({
                ...authState,
                isAuthReady: true
            }));
        }
    };

    const LogoutAction = async () => {
        try {
            await AuthService.logout();
        } catch (err) {
            updateAuthenticatedRawUser(null);
        }
    };

    return (
        <AuthContext.Provider value={{
            isAuthReady: authState.isAuthReady,
            isAuthenticated: authState.isAuthenticated,
            isAuthenticatedUserAdmin: authState.isAuthenticatedUserAdmin,
            authenticatedUser: authState.authenticatedUser,
            forceLoginModal: authState.forceLoginModal,
            setForceLoginModal: (force) => {
                setAuthState(authState => ({
                    ...authState,
                    forceLoginModal: Boolean(force)
                }));
            },
            setIsAuthenticated: () => {
                setAuthState(authState => ({
                    ...authState,
                    isAuthenticated: true
                }));
            },
            updateAuthenticatedRawUser,
            logout: LogoutAction
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
