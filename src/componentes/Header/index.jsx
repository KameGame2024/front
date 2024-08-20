import React, { useContext } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FaHome, FaPlus, FaTag } from 'react-icons/fa';
import BarraBusqueda from '../BarraBusqueda';
import Menu from '../Menu';
import './Header.css';
import { GlobalContext } from '@src/context/GlobalContext';

function Header() {
    const location = useLocation();
    const { actualizarBusqueda } = useContext(GlobalContext);
    const showSearchBar = location.pathname === '/cartas' || location.pathname === '/paquetes';

    const handleSearch = (query) => {
        actualizarBusqueda(query);
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
            </header>
            <Menu />
        </div>
    );
}

export default Header;
