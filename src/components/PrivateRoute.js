import React from 'react'
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoute = () => {
    let GetDataLogin = localStorage.getItem("token");
    let token = false;
    if (GetDataLogin !== null) {
        token = true;
    }
    return token ? <Outlet /> : <Navigate to="/homepage" />;
};

export default PrivateRoute;
