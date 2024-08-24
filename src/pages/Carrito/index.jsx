import React, { useContext, useState } from 'react';
import Producto from '@src/componentes/Producto';
import Resumen from '@src/componentes/Resumen';
import { GlobalContext } from '@src/context/GlobalContext';
import './Carrito.css';
import { NavLink} from 'react-router-dom';


const Carrito = () => {
    const { productosEnCarrito, incrementarCantidad, decrementarCantidad, eliminarProducto, vaciarCarrito, usuarioLogueado } = useContext(GlobalContext);
    const [mostrarModal, setMostrarModal] = useState(false);

    const totalItems = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    const costoTotal = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    const costoEnvio = 500; // Ejemplo de costo de envío fijo
    const subtotal = costoTotal + costoEnvio;

    const pagar = () => {
        if (usuarioLogueado) {
            alert('Pago realizado con éxito');
            vaciarCarrito();
        } else {
            setMostrarModal(true); // Mostrar el modal si no está logueado
        }
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

            {mostrarModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <p>No puedes comprar porque aún no te has logueado o no posees una cuenta.</p>
                        <NavLink to="/iniciar-sesion">
                            <button className="aceptar-boton">Iniciar Sesión</button>
                        </NavLink>
                        <button className="cancelar-boton" onClick={() => setMostrarModal(false)}>Cancelar</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Carrito;
