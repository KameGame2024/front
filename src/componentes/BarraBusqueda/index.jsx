import React, { useState, useContext } from 'react';
import { FaSearch } from 'react-icons/fa';
import './BarraBusqueda.css';
import { GlobalContext } from '@src/context/GlobalContext'; // Asegúrate de que la ruta sea correcta

function BarraBusqueda() {
    const [textoBusqueda, setTextoBusqueda] = useState('');
    const { actualizarBusqueda } = useContext(GlobalContext);

    const manejarCambio = (e) => {
        setTextoBusqueda(e.target.value);
    };

    const manejarBusqueda = () => {
        actualizarBusqueda(textoBusqueda);
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Buscar..."
                value={textoBusqueda}
                onChange={manejarCambio}
                onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        manejarBusqueda();
                    }
                }}
            />
            <button type="button" onClick={manejarBusqueda}>
                <FaSearch />
            </button>
        </div>
    );
}

export default BarraBusqueda;
