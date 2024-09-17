import React, { useContext, useState } from 'react';
import Producto from '@src/componentes/Producto';
import Resumen from '@src/componentes/Resumen';
import { GlobalContext } from '@src/context/GlobalContext';
import AuthContext from '@src/context/AuthContext'; // Importa AuthContext
import './Carrito.css';
import { NavLink, useNavigate } from 'react-router-dom';

const Carrito = () => {
    const { productosEnCarrito, incrementarCantidad, decrementarCantidad, eliminarProducto, vaciarCarrito } = useContext(GlobalContext);
    const { isAuthenticated } = useContext(AuthContext); // Obtén isAuthenticated de AuthContext
    const [mostrarModal, setMostrarModal] = useState(false);
    const [mostrarModalCarritoVacio, setMostrarModalCarritoVacio] = useState(false);
    const [mostrarModalCompra, setMostrarModalCompra] = useState(false);
    const [mensajeError, setMensajeError] = useState('');
    const navigate = useNavigate();

    const totalItems = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    const costoTotal = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    const costoEnvio = 500; // Ejemplo de costo de envío fijo
    const subtotal = costoTotal + costoEnvio;

    const pagar = () => {
        if (productosEnCarrito.length === 0) {
            setMensajeError('No hay productos en el carrito.');
            setMostrarModalCarritoVacio(true);
            return;
        }

        if (isAuthenticated) { // Usar isAuthenticated en lugar de usuarioLogueado
            setMostrarModalCompra(true);
            setTimeout(() => {
                setMostrarModalCompra(false);
            }, 3000);
            vaciarCarrito();
        } else {
            setMensajeError('No puedes comprar porque aún no te has logueado o no posees una cuenta.');
            setMostrarModal(true);
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
                        <p>{mensajeError}</p>
                        {!isAuthenticated && (
                            <NavLink to="/iniciar-sesion">
                                <button className="aceptar-boton">Iniciar Sesión</button>
                            </NavLink>
                        )}
                        <button className="cancelar-boton" onClick={() => setMostrarModal(false)}>Cancelar</button>
                    </div>
                </div>
            )}

            {mostrarModalCarritoVacio && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <p>No hay productos en el carrito.</p>
                        <button className="aceptar-boton" onClick={() => navigate('/')}>Agregar Productos</button>
                        <button className="cancelar-boton" onClick={() => setMostrarModalCarritoVacio(false)}>Cancelar</button>
                    </div>
                </div>
            )}

            {mostrarModalCompra && (
                <div className="prompt-overlay">
                    <div className="prompt-contenido">
                        <p>Compra realizada con éxito.</p>
                        <NavLink className="aceptar-boton" onClick={() => setMostrarModalCompra(false)}>Aceptar</NavLink>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Carrito;
