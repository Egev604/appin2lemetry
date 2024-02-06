import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Info from '../pages/info/Info';
import Main from '../pages/main/components/Main';
const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Main/>}/>
            <Route path="/main" element={<Main/>}/>
            <Route path="/info" element={<Info/>}/>
        </Routes>
    );
};

export default AppRoutes;