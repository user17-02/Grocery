import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
    const userInfo = localStorage.getItem('userInfo')
        ? JSON.parse(localStorage.getItem('userInfo'))
        : null;

    return userInfo ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
