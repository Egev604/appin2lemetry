import React, { createContext, ReactNode, useEffect, useState } from 'react';

import { validToken } from './tokenUtils';
interface AuthContextType {
    isValidToken: boolean;
    setIsValidToken: React.Dispatch<React.SetStateAction<boolean>>;
}
interface AuthProviderProps {
    children: ReactNode;
}
export const AuthContext = createContext<AuthContextType>({
    isValidToken: false,
    setIsValidToken: () => {},
});
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isValidToken, setIsValidToken] = useState<boolean>(false);

    useEffect(() => {
        const validateToken = async () => {
            const isValid = await validToken();
            setIsValidToken(isValid);
        };
        validateToken();
    }, []);
    const value = { isValidToken, setIsValidToken };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
