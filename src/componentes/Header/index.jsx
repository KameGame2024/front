import React, { useState, useContext } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { IoMdArrowDropdownCircle, IoMdArrowDropupCircle, IoMdLogOut  } from "react-icons/io";
import BarraBusqueda from '../BarraBusqueda';
import Menu from '../Menu';
import './Header.css';
import { GlobalContext } from '@src/context/GlobalContext';
import AuthContext from '../../context/AuthContext';

function Header() {
    const location = useLocation();
    const { actualizarBusqueda, productosEnCarrito } = useContext(GlobalContext);
    const { isAuthenticated, logout, userRole } = useContext(AuthContext); // Cambiado a userRole
    const showSearchBar = location.pathname === '/cartas' || location.pathname === '/paquetes';
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLogoutButtonVisible, setIsLogoutButtonVisible] = useState(false);

    const handleSearch = (query) => {
        actualizarBusqueda(query);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleLogoutButton = () => {
        setIsLogoutButtonVisible(!isLogoutButtonVisible);
    }

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
                        <div>
                            <NavLink className="nav-link" onClick={toggleLogoutButton}>
                                <div className='user-options-button'>
                                    {isLogoutButtonVisible && <IoMdArrowDropupCircle className='drop-btn'/>}
                                    {!isLogoutButtonVisible && <IoMdArrowDropdownCircle className='drop-btn'/>}
                                    {!isAdmin && <p className='buttons-text'>BIENVENIDO<br/>DUELISTA</p>}
                                    {isAdmin && <p className='buttons-text'>BIENVENIDO<br/>MASTER</p>}
                                </div>
                            </NavLink>
                            {isLogoutButtonVisible && (
                                <NavLink to="/" className="nav-link" onClick={logout}>
                                <div className='user-options-button logout-button'>
                                    <IoMdLogOut     className='drop-btn'/>
                                    <p className='buttons-text'>LOGOUT</p>
                                </div>
                            </NavLink>
                            )}
                        </div>
                        
                    )}
                    <div className='button-group-user'>
                        {!isAuthenticated && (
                            <NavLink to="/iniciar-sesion" className="nav-link">
                                <div className='user-options-button'>
                                    <img src="/img/icons/user.png" alt="Perfil" />
                                    <p className='buttons-text'>LOGIN</p>
                                </div>
                                
                            </NavLink>
                        )}
                        {!isAdmin && (
                            <>
                                <NavLink to="/carrito" className="nav-link">
                                <div className='user-options-button'>
                                    <div className='carrito-imagen'>
                                        <img src="/img/icons/shopping-bag.png" alt="Carrito" />
                                        <div className='carrito-info'>
                                            <p>{productosEnCarrito.length}</p>
                                        </div>
                                    </div>
                                    <p className='buttons-text'>CARRITO</p>
                                </div>
                                    
                                </NavLink>
                                {isMenuOpen ? (
                                    <FaTimes className="menu-icon" onClick={toggleMenu} />
                                ) : (
                                    <FaBars className="menu-icon" onClick={toggleMenu} />
                                )}
                            </>
                        )}
                    </div>
                    
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
