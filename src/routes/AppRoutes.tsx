import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Login from '../components/Authorization/Login';
import SignUp from '../components/Authorization/SignUp';
import Info from '../pages/info/Info';
import Main from '../pages/main/components/Main';
import User from '../pages/user/User';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/main" element={<Main />} />
            <Route path="/info" element={<Info />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/userProfile" element={<User />} />
        </Routes>
    );
};

export default AppRoutes;
