import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import Login from '../components/Authorization/Login';
import SignUp from '../components/Authorization/SignUp';
import Info from '../pages/info/Info';
import Main from '../pages/main/components/Main';
import User from '../pages/user/User';
interface AppRoutesProps {
    isValidToken: boolean;
}

const AppRoutes: React.FC<AppRoutesProps> = ({ isValidToken }) => {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(!loading);
    }, [isValidToken]);
    console.log(isValidToken);
    return (
        <Routes>
            <Route path="/" element={isValidToken ? <Main /> : <Login />} />
            <Route path="/main" element={<Main />} />
            <Route path="/info" element={<Info />} />
            <Route path="/login" element={isValidToken ? <Main /> : <Login />} />
            <Route path="/register" element={isValidToken ? <Main /> : <SignUp />} />
            <Route path="/userProfile" element={<User />} />
        </Routes>
    );
};

export default AppRoutes;
