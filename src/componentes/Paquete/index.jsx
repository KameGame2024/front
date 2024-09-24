// src/componentes/Paquete.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Paquete.css'; // Añadimos el archivo CSS

function Paquete({ nombre, precio, cantidad, imagen, id, tipoDetalle }) {
    return (
        <div className="paquete" key={id}>
            <img src={imagen} alt={nombre} className="paquete-imagen" />
            <div className="pack-content">
                <h2 className="marca">YU-GI-OH</h2>
                <h2 className="paquete-nombre">{nombre}</h2>
                <p className="paquete-descripcion">Pack</p>
                <p className="paquete-descripcion">Cartas: {cantidad}</p>
                <p className="paquete-precio">Precio: ${precio}</p>
                {tipoDetalle === 'admin' && (
                    <Link to={`/detalle-admin/paquete/${id}`} className="card-button">
                        Ver
                    </Link>
                )}
                {tipoDetalle === 'compra' && (
                    <Link to={`/detalle/paquete/${id}`} className="card-button">
                        Ver
                    </Link>
                )}
            </div>
        </div>
    );
}

export default Paquete;
