// src/componentes/AgregarProducto.jsx
import React, { useContext } from 'react';
import { GlobalContext } from '@src/context/GlobalContext';

const AgregarProducto = ({ producto }) => {
    const { agregarProductoAlCarrito } = useContext(GlobalContext);

    return (
        <button onClick={() => agregarProductoAlCarrito(producto)}>
            Agregar al Carrito
        </button>
    );
};

export default AgregarProducto;
