import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { validToken } from './tokenUtils';
interface AuthContextType {
    isValidToken: boolean;
    setIsAuthenticated?: React.Dispatch<React.SetStateAction<boolean>>;
}
interface AuthProviderProps {
    children: ReactNode;
}
export const AuthContext = createContext<AuthContextType>({ isValidToken: false });
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isValidToken, setIsValidToken] = useState<boolean>(false);

    useEffect(() => {
        const validateToken = async () => {
            const isValid = await validToken();
            setIsValidToken(isValid);
        };

        validateToken();
    }, []);

    return <AuthContext.Provider value={{ isValidToken }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
