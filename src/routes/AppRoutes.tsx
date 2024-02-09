import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Info from '../pages/info/Info';
import Main from '../pages/main/components/Main';
import Login from "../components/Authorization/Login";
import SignUp from "../components/Authorization/SignUp";
const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/main" element={<Main/>}/>
            <Route path="/info" element={<Info/>}/>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<SignUp />} />
        </Routes>
    );
};

export default AppRoutes;