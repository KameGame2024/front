import React from 'react';
import { NavLink } from 'react-router-dom';
import './Menu.css';

function Menu({ isMenuOpen, setIsMenuOpen }) {
    // Close the menu when an item is clicked
    const handleCloseMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <nav className={`menu ${isMenuOpen ? 'menu-open' : ''}`}>
            <NavLink to="/cartas" className="menu-item" onClick={handleCloseMenu}>CARTAS</NavLink>
            <NavLink to="/paquetes" className="menu-item" onClick={handleCloseMenu}>PAQUETES</NavLink>
            <NavLink to="/centro-de-combate" className="menu-item" onClick={handleCloseMenu}>CENTRO DE COMBATE</NavLink>
            <NavLink to="/mi-coleccion" className="menu-item" onClick={handleCloseMenu}>MI COLECCION</NavLink>
            <NavLink to="/mi-baraja" className="menu-item" onClick={handleCloseMenu}>MI BARAJA</NavLink>
        </nav>
    );
}

export default Menu;
