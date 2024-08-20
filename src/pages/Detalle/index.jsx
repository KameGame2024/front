// src/pages/Detalle/Detalle.jsx
import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { GlobalContext } from '../../context/GlobalContext';
import './Detalle.css';

function Detalle() {
    const { tipo, id } = useParams();
    const { cartas, paquetes, agregarProductoAlCarrito } = useContext(GlobalContext);
    const [detalle, setDetalle] = useState(null);
    const [cantidad, setCantidad] = useState(1);

    useEffect(() => {
        if (tipo && id) {
            const encontrado = tipo === 'carta'
                ? cartas.find(item => item.id === id)
                : paquetes.find(item => item.id === id);
            setDetalle(encontrado);
        }
    }, [tipo, id, cartas, paquetes]);

    const incrementarCantidad = () => setCantidad(prev => prev + 1);
    const decrementarCantidad = () => setCantidad(prev => (prev > 1 ? prev - 1 : 1));

    const manejarAgregarAlCarrito = () => {
        if (detalle) {
            agregarProductoAlCarrito({ ...detalle, cantidad });
            alert('Producto agregado con éxito al carrito');
        }
    };

    if (!detalle) return <p>Cargando...</p>;

    return (
        <div className={`detalle-${tipo}`}>
            <img src={detalle.imagen} alt={detalle.nombre} className="detalle-imagen" />
            <div className="detalle-info">
                <h1 className="detalle-titulo">{detalle.nombre}</h1>
                <h2 className="descripcion_t">Descripción</h2>
                <p>{detalle.descripcion}</p>
                {tipo === 'carta' && (
                    <>
                        <p><strong>Ataque:</strong> {detalle.ataque}</p>
                        <p><strong>Defensa:</strong> {detalle.defensa}</p>
                        <p><strong>Tipo:</strong> {detalle.tipo}</p>
                        <p><strong>Atributo:</strong> {detalle.atributo}</p>
                    </>
                )}
                {tipo === 'paquete' && (
                    <>
                        <p><strong>Set:</strong> {detalle.set}</p>
                        <p><strong>Cantidad:</strong> {detalle.cantidad}</p>
                    </>
                )}
                <h1 className="detalle-precio"><strong>$ {detalle.precio}</strong></h1>
                <div className="detalle-cantidad">
                    <button className="detalle_masmenos" onClick={decrementarCantidad}>-</button>
                    <span className="detalle_cant">{cantidad}</span>
                    <button className="detalle_masmenos" onClick={incrementarCantidad}>+</button>
                    <button className="detalle-agregar" onClick={manejarAgregarAlCarrito}>Agregar al carrito</button>
                </div>
            </div>
        </div>
    );
}

export default Detalle;
