// src/componentes/BarraBusqueda.jsx
import React from 'react';
import { FaSearch } from 'react-icons/fa';
import './BarraBusqueda.css';

function BarraBusqueda() {
    return (
        <div className="search-bar">
            <input type="text" placeholder="Buscar..." />
            <button type="button">
                <FaSearch />
            </button>
        </div>
    );
}

export default BarraBusqueda;
