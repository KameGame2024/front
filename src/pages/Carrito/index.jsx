// src/paginas/Carrito.jsx
import React, { useState } from 'react';
import Producto from '@src/componentes/Producto';
import Resumen from '@src/componentes/Resumen';
import './Carrito.css';

// Datos de ejemplo para los productos en el carrito
const productosEnCarrito = [
    { id: 1, nombre: 'Dragón de Fuego', precio: 1200, tipo: 'Carta', cantidad: 1, imagen: 'https://images.ygoprodeck.com/images/cards/11714098.jpg' },
    { id: 2, nombre: 'Paquete Genesis', precio: 5000, tipo: 'Paquete', cantidad: 1, imagen: '/img/paquete.png' }
];

const Carrito = () => {
    const [productos, setProductos] = useState(productosEnCarrito);

    const incrementarCantidad = (id) => {
        setProductos(prevProductos => prevProductos.map(producto =>
            producto.id === id ? { ...producto, cantidad: producto.cantidad + 1 } : producto
        ));
    };

    const decrementarCantidad = (id) => {
        setProductos(prevProductos => prevProductos.map(producto =>
            producto.id === id && producto.cantidad > 1 ? { ...producto, cantidad: producto.cantidad - 1 } : producto
        ));
    };

    const eliminarProducto = (id) => {
        setProductos(prevProductos => prevProductos.filter(producto => producto.id !== id));
    };

    const totalItems = productos.reduce((acc, producto) => acc + producto.cantidad, 0);
    const costoTotal = productos.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    const costoEnvio = 500; // Ejemplo de costo de envío fijo
    const subtotal = costoTotal + costoEnvio;

    const pagar = () => {
        alert('Pago realizado con éxito');
    };

    return (
        <div className='tit'>
            <h1>CARRITO DE COMPRAS</h1>
            <div className="carrito">
                <div className="productos-container">
                    {productos.map(producto => (
                        <Producto
                            key={producto.id}
                            producto={producto}
                            incrementarCantidad={incrementarCantidad}
                            decrementarCantidad={decrementarCantidad}
                            eliminarProducto={eliminarProducto}
                        />
                    ))}
                </div>
                <Resumen
                    totalItems={totalItems}
                    costoTotal={costoTotal}
                    costoEnvio={costoEnvio}
                    subtotal={subtotal}
                    pagar={pagar}
                />
            </div>
        </div>
    );
};

export default Carrito;
