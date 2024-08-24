import React, { useContext } from 'react';
import Producto from '@src/componentes/Producto';
import Resumen from '@src/componentes/Resumen';
import { GlobalContext } from '@src/context/GlobalContext';
import './Carrito.css';

const Carrito = () => {
    const { productosEnCarrito, incrementarCantidad, decrementarCantidad, eliminarProducto, vaciarCarrito } = useContext(GlobalContext);

    const totalItems = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    const costoTotal = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    const costoEnvio = 500; // Ejemplo de costo de envío fijo
    const subtotal = costoTotal + costoEnvio;

    const pagar = () => {
        // Lógica para el pago
        alert('Pago realizado con éxito');
        // Vaciar el carrito después del pago
        vaciarCarrito();
    };

    return (
        <div className='tit'>
            <h1>CARRITO DE COMPRAS</h1>
            <div className="carrito">
                <div className="productos-container">
                    {productosEnCarrito.length > 0 ? (
                        productosEnCarrito.map(producto => (
                            <Producto
                                key={producto.id}
                                producto={producto}
                                incrementarCantidad={incrementarCantidad}
                                decrementarCantidad={decrementarCantidad}
                                eliminarProducto={eliminarProducto}
                            />
                        ))
                    ) : (
                        <p className="carrito-vacio">No hay productos en el carrito.</p>
                    )}
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
