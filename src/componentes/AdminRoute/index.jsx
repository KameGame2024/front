// src/components/PrivateRoute.jsx
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '@src/context/AuthContext';

const AdminRoute = ({ children }) => {
    const { userRole } = useContext(AuthContext);
    return (userRole === 'admin') ? children : <Navigate to="/*" />;
    
};

export default AdminRoute;