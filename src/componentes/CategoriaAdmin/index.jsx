import React from 'react';
import { NavLink } from 'react-router-dom';
import './CategoriaAdmin.css';

import { TbCards } from "react-icons/tb";
import { FaUsersCog } from "react-icons/fa";
import { RiRedPacketLine } from "react-icons/ri";

function CategoriasAdmin() {
    const categorias = [
        { icon: <FaUsersCog className='admin_option_icon'/>, alt: 'Editar Usuarios', path: '/editar-usuarios' },
        { icon: <TbCards className='admin_option_icon'/>, alt: 'Editar Cartas', path: '/cartas-admin' },
        { icon: <RiRedPacketLine className='admin_option_icon'/>, alt: 'Editar Paquetes', path: '/paquetes-admin' },
    ];

    return (
        <div className="categorias">
            {categorias.map((categoria, index) => (
                <NavLink key={index} to={categoria.path} className="categoria-item admin_option">
                    {categoria.icon}
                    <p className='admin_option_texto'>{categoria.alt}</p>
                </NavLink>
            ))}
        </div>
    );
}

export default CategoriasAdmin;