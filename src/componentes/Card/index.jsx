// src/componentes/Card.jsx
import React, { useContext } from 'react';
import { GlobalContext } from '@src/context/GlobalContext';
import { Link } from 'react-router-dom';
import './Card.css';

const Card = ({ imagen, nombre, descripcion, ataque, defensa, precio, id, seleccionada, mostrarSeleccion, mostrarBotonVer }) => {
    const { seleccionarCarta } = useContext(GlobalContext); // Usa la función del contexto

    const handleSelect = () => {
        seleccionarCarta({ imagen, nombre, descripcion, ataque, defensa, precio, id });
    };

    return (
        <div className={`card ${seleccionada ? 'seleccionada' : ''}`} onClick={mostrarSeleccion ? handleSelect : undefined}>
            <img src={imagen} alt={nombre} className="card-img" />
            <div className="card-content">
                <h2 className="marca">YU-GI-OH</h2>
                <h3 className="card-title">{nombre}</h3>
                <p className="card-stats">ATK: {ataque}</p>
                <p className="card-stats">DEF: {defensa}</p>
                <p className="card-price">Precio: ${precio}</p>
                {mostrarBotonVer && (
                    <Link to={`/detalle/carta/${id}`} className="card-button">
                        Ver
                    </Link>
                )}
                {mostrarSeleccion && (
                    <button className="card-select-btn">
                        {seleccionada ? 'Deseleccionar' : 'Seleccionar'}
                    </button>
                )}
            </div>
        </div>
    );
};

export default Card;
