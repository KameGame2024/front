// AuthContext.js
import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();

    const login = (user) => {
        setIsAuthenticated(true);
        setUserRole(user.rol);
        setUserId(user.id);
        if (user.rol === 'admin') {
            navigate('/admin'); // Redirige a la página de admin
        } else {
            navigate('/'); // Redirige a la página de usuario normal
        }
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUserRole(null);
        navigate('/iniciar-sesion');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, userRole, userId, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
