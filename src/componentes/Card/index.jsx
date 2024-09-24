// src/componentes/Card.jsx
import React, { useContext } from 'react';
import { GlobalContext } from '@src/context/GlobalContext';
import { Link } from 'react-router-dom';
import './Card.css';

const Card = ({ imagen, nombre, descripcion, ataque, defensa, precio, id, cantidad, tipoDetalle }) => { // Usa la función del contexto

    return (
        <div className={`card`} >
            <img src={imagen} alt={nombre} className="card-img" />
            <div className="card-content">
                <h2 className="marca">YU-GI-OH</h2>
                <h3 className="card-title">{nombre}</h3>
                <p className="card-stats">ATK: {ataque}</p>
                <p className="card-stats">DEF: {defensa}</p>
                <p className="card-price">Precio: ${precio}</p>
                <p className="card-quantity">Disponibles: {cantidad}</p>
                {tipoDetalle === 'admin' && (
                    <Link to={`/detalle-admin/carta/${id}`} className="card-button">
                        Ver
                    </Link> 
                )}
                {tipoDetalle === 'user' && (
                    <Link to={`/detalle-coleccion/carta/${id}`} className="card-button">
                        Ver
                    </Link>
                )}
                {tipoDetalle === 'compra' && (
                    <Link to={`/detalle/carta/${id}`} className="card-button">
                        Ver
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Card;
