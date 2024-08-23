import React, { useState, useContext } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FaBars } from 'react-icons/fa'; // Importing the menu icon
import BarraBusqueda from '../BarraBusqueda';
import Menu from '../Menu';
import './Header.css';
import { GlobalContext } from '@src/context/GlobalContext';

function Header() {
    const location = useLocation();
    const { actualizarBusqueda } = useContext(GlobalContext);
    const showSearchBar = location.pathname === '/cartas' || location.pathname === '/paquetes';
    const [isMenuOpen, setIsMenuOpen] = useState(false); // Initialize with false

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
                    <NavLink to="/crear-cuenta" className="nav-link">
                        <img src="/img/icons/user.png" alt="Perfil" />
                    </NavLink>
                    <NavLink to="/carrito" className="nav-link">
                        <img src="/img/icons/shopping-bag.png" alt="Carrito" />
                    </NavLink>
                </div>
                <FaBars className="menu-icon" onClick={toggleMenu} />
            </header>
            {/* Show the Menu component when the icon is clicked */}
            <Menu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
            {/* Background overlay when the menu is open on mobile */}
            {isMenuOpen && <div className="menu-overlay" onClick={toggleMenu}></div>}
        </div>
    );
}

export default Header;
