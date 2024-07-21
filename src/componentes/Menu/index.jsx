// src/componentes/Menu.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Menu.css';

function Menu() {
    return (
        <nav className="menu">
            <NavLink to="/cartas" className="menu-item">CARTAS</NavLink>
            <NavLink to="/paquetes" className="menu-item">PAQUETES</NavLink>
            <NavLink to="/centro-de-combate" className="menu-item">CENTRO DE COMBATE</NavLink>
            <NavLink to="/mi-coleccion" className="menu-item">MI COLECCION</NavLink>
            <NavLink to="/mi-baraja" className="menu-item">MI BARAJA</NavLink>
        </nav>
    );
}

export default Menu;
