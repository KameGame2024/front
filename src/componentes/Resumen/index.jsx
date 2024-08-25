// src/componentes/Resumen.jsx
import React from 'react';
import './Resumen.css';

const Resumen = ({ totalItems, costoTotal, costoEnvio, subtotal, pagar }) => {
    return (
        <div className="resumen">
            <h3>Resumen del Carrito</h3>
            <div className='textico'>
            <p>Cantidad de items: {totalItems}</p>
            <p>Costo total: ${costoTotal}</p>
            <p>Impuesto: ${costoEnvio}</p>
            <p>Subtotal: ${subtotal}</p>
            </div>
            <button onClick={pagar}>Pagar</button>
        </div>
    );
};

export default Resumen;
