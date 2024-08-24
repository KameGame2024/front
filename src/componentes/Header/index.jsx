import React, { useState, useContext } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa'; // Importando FaTimes para el botón de cierre
import BarraBusqueda from '../BarraBusqueda';
import Menu from '../Menu';
import './Header.css';
import { GlobalContext } from '@src/context/GlobalContext';
import AuthContext from '../../context/AuthContext';

function Header() {
    const location = useLocation();
    const { actualizarBusqueda } = useContext(GlobalContext);
    const showSearchBar = location.pathname === '/cartas' || location.pathname === '/paquetes';
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const { isAuthenticated, logout } = useContext(AuthContext);

    const handleSearch = (query) => {
        actualizarBusqueda(query);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div>
            <header className="header">
                <NavLink to="/" className="nav-link">
                    <img src="/img/Logo.png" alt="Logo" />
                </NavLink>
                {showSearchBar && <BarraBusqueda onSearch={handleSearch} />}
                <div className="button-group">
                    {isAuthenticated && (
                        <NavLink to="/" className="nav-link" onClick={logout}>
                        <img src="/img/icons/logout.png" alt="Perfil" />
                    </NavLink>
                    )}
                    {!isAuthenticated && (
                        <NavLink to="/iniciar-sesion" className="nav-link">
                        <img src="/img/icons/user.png" alt="Perfil" />
                        </NavLink>
                    )}
                    <NavLink to="/carrito" className="nav-link">
                        <img src="/img/icons/shopping-bag.png" alt="Carrito" />
                    </NavLink>
                    {isMenuOpen ? (
                        <FaTimes className="menu-icon" onClick={toggleMenu} />
                    ) : (
                        <FaBars className="menu-icon" onClick={toggleMenu} />
                    )}
                </div>
                
            </header>
            <Menu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
            {isMenuOpen && <div className="menu-overlay" onClick={toggleMenu}></div>}
        </div>
    );
}

export default Header;
