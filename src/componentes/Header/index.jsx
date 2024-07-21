// src/componentes/Header.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaPlus, FaTag } from 'react-icons/fa';
import BarraBusqueda from '../BarraBusqueda';
import Menu from '../Menu';
import './Header.css';

function Header() {
    return (
        <div>
            <header className="header">
                <NavLink to="/" className="nav-link">
                    <img src="/img/Logo.png" alt="Logo" />
                </NavLink>
                <BarraBusqueda />
                <div className="button-group">
                    <NavLink to="/crear-cuenta" className="nav-link">
                        <img src="/img/icons/user.png" alt="Perfil" />
                    </NavLink>
                    <NavLink to="/carrito" className="nav-link">
                        <img src="/img/icons/shopping-bag.png" alt="Carrito" />
                    </NavLink>
                </div>
                
            </header>
            <Menu />
        </div>
    );
}

export default Header;
