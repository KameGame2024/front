import React, { useState, useContext } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import BarraBusqueda from '../BarraBusqueda';
import Menu from '../Menu';
import './Header.css';
import { GlobalContext } from '@src/context/GlobalContext';
import AuthContext from '../../context/AuthContext';

function Header() {
    const location = useLocation();
    const { actualizarBusqueda } = useContext(GlobalContext);
    const { isAuthenticated, logout, userRole } = useContext(AuthContext); // Cambiado a userRole
    const showSearchBar = location.pathname === '/cartas' || location.pathname === '/paquetes';
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleSearch = (query) => {
        actualizarBusqueda(query);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Verificar si el usuario es administrador usando userRole
    const isAdmin = isAuthenticated && userRole === 'admin';

    return (
        <div>
            <header className="header">
                {!isAdmin && (
                    <NavLink to="/" className="nav-link">
                        <img src="/img/Logo.png" alt="Logo" />
                    </NavLink>)
                }
                {isAdmin && (
                    <NavLink to="/Admin" className="nav-link">
                        <img src="/img/Logo.png" alt="Logo" />
                    </NavLink>)
                }
                {!isAdmin && showSearchBar && <BarraBusqueda onSearch={handleSearch} />} {/* Mostrar la barra de búsqueda solo si no es administrador */}
                
                <div className="button-group">
                    {isAuthenticated && (
                        <NavLink to="/" className="nav-link" onClick={logout}>
                            <img src="/img/icons/logout.png" alt="Cerrar sesión" />
                        </NavLink>
                    )}
                    {!isAuthenticated && (
                        <NavLink to="/iniciar-sesion" className="nav-link">
                            <img src="/img/icons/user.png" alt="Perfil" />
                        </NavLink>
                    )}
                    {!isAdmin && (
                        <>
                            <NavLink to="/carrito" className="nav-link">
                                <img src="/img/icons/shopping-bag.png" alt="Carrito" />
                            </NavLink>
                            {isMenuOpen ? (
                                <FaTimes className="menu-icon" onClick={toggleMenu} />
                            ) : (
                                <FaBars className="menu-icon" onClick={toggleMenu} />
                            )}
                        </>
                    )}
                </div>
            </header>

            {!isAdmin && (
                <>
                    <Menu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
                    {isMenuOpen && <div className="menu-overlay" onClick={toggleMenu}></div>}
                </>
            )}
        </div>
    );
}

export default Header;
