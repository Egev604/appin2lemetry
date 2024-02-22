import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { validTokens } from './ValidTokens';
interface AuthContextType {
    isValidToken: boolean;
}
interface AuthProviderProps {
    children: ReactNode;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isValidToken, setIsValidToken] = useState<boolean>(false);

    useEffect(() => {
        const validateToken = async () => {
            const isValid = await validTokens();
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
