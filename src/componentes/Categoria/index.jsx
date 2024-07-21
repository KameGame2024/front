// src/componentes/Categorias.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Categoria.css';

function Categorias() {
    const categorias = [
        { src: '/img/ComprarCartas.png', alt: 'Cartas', path: '/cartas' },
        { src: '/img/ComprarPaquetes.png', alt: 'Paquetes', path: '/paquetes' },
        { src: '/img/CentroCombate.png', alt: 'Centro de Combate', path: '/centro-de-combate' },
        { src: '/img/MiColeccion.png', alt: 'Mi Colección', path: '/mi-coleccion' },
        { src: '/img/MiBaraja.png', alt: 'Mi Baraja', path: '/mi-baraja' },
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

export default Categorias;
