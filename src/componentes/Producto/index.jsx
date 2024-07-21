// src/componentes/Producto.jsx
import React from 'react';
import './Producto.css';

const Producto = ({ producto, incrementarCantidad, decrementarCantidad, eliminarProducto }) => {
    return (
        <div className="producto">
            <div className='cont'>
                <h2>Producto {producto.id}</h2>
                <img src={producto.imagen} alt={producto.nombre} className="producto-img" />
            </div>
            <div className="producto-info">
                <p>{producto.tipo}</p>
                <p>{producto.nombre}</p>
                <p>Precio: ${producto.precio}</p>
            </div>
            <div className="producto-cantidad">
                <button onClick={() => decrementarCantidad(producto.id)}>-</button>
                <span>{producto.cantidad}</span>
                <button onClick={() => incrementarCantidad(producto.id)}>+</button>
            </div>
            <button className="producto-eliminar" onClick={() => eliminarProducto(producto.id)}>Eliminar</button>
        </div>
    );
};

export default Producto;
