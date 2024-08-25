import React from 'react';
import { NavLink } from 'react-router-dom';
import './CategoriaAdmin.css';

function CategoriasAdmin() {
    const categorias = [
        { src: '/img/EditarTienda.png', alt: 'EditarTienda', path: '/editar-tienda' },
        { src: '/img/EditarUsuariosMobile.png', alt: 'EditarUsuarios', path: '/editar-usuarios' },
    ];

    return (
        <div className="categorias">
            {categorias.map((categoria, index) => (
                <NavLink key={index} to={categoria.path} className="categoria-item">
                    <img src={categoria.src} alt={categoria.alt} />
                </NavLink>
            ))}
        </div>
    );
}

export default CategoriasAdmin;