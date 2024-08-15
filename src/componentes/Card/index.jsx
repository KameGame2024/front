import React from 'react';
import { Link } from 'react-router-dom';
import './Card.css';

const Card = ({ imagen, nombre, descripcion, ataque, defensa, precio, id }) => {
    return (
        <div className="card">
            <img src={imagen} alt={nombre} className="card-img" />
            <div className="card-content">
                <h2 className="marca">YU-GI-OH</h2>
                <h3 className="card-title">{nombre}</h3>
                <p className="card-stats">ATK: {ataque}</p>
                <p className="card-stats">DEF: {defensa}</p>
                <p className="card-price">Precio: ${precio}</p>
                <Link to={`/${id}`} className="card-button">
                    Ver
                </Link>
            </div>
        </div>
    );
};

export default Card;
