import React, { createContext, useEffect, useState } from 'react';
import AuthService from '../services/AuthService';
import { useRouter } from 'next/router';

const AuthContext = createContext({
    isLoading: false,
    authenticatedUser: null,
    isAuthenticated: false,
    isAuthenticatedUserAdmin: false,
    setAuthenticatedUser : () => {},
    setIsAuthenticated: () => {},
});

export const AuthProvider = ({ children }) => {
    const router = useRouter()
    const [isLoading, setLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authenticatedUser, setAuthenticatedUser] = useState(null);
    const [isAuthenticatedUserAdmin, setIsAuthenticatedUserAdmin] = useState(false);

    useEffect(() => {
        const initializeAuth = async () => {
            setLoading(true)
            try{
                const result = await AuthService.authorizeSSR();
                const { user } = result;
                setIsAuthenticated(true);
                setAuthenticatedUser(user);
                setIsAuthenticatedUserAdmin(user.isAdmin);
                setLoading(false);
            } catch (err) {
                console.log(err);
                console.log('not logged in');
                setLoading(false);
            }
        };
        // initializeAuth();
    }, []);

    return (
        <AuthContext.Provider value={{
            isLoading,
            isAuthenticated,
            isAuthenticatedUserAdmin,
            authenticatedUser,
            setAuthenticatedUser,
            setIsAuthenticated,
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth () {
    const context = React.useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
