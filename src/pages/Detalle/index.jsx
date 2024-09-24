// src/pages/Detalle/Detalle.jsx
import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { GlobalContext } from '../../context/GlobalContext';
import './Detalle.css';
import { NavLink } from 'react-router-dom';

import { urlGetCartaInventario, urlGetPaqueteInventario } from '../../utils/constants';

function Detalle() {
    const { tipo, id } = useParams();
    const { agregarProductoAlCarrito } = useContext(GlobalContext);
    const [detalle, setDetalle] = useState(null);
    const [cantidad, setCantidad] = useState(1);
    const [mostrarModalAgregado, setMostrarModalAgregado] = useState(false);

    const fetchCarta = async (id_carta) => {
        try {
            const urlCarta = urlGetCartaInventario(id_carta);
            const response = await fetch(urlCarta);
            const data = await response.json();
            setDetalle(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const fetchPaquete = async (id_paquete) => {
        try {
            const urlPaquete = urlGetPaqueteInventario(id_paquete);
            const response = await fetch(urlPaquete);
            const data = await response.json();
            setDetalle(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        if (tipo && id) {
            if(tipo === 'carta'){
                fetchCarta(id)
            } else {
                fetchPaquete(id)
            }
        }
    }, []);

    const incrementarCantidad = () => {
        if(tipo === 'carta'){
            setCantidad(prev => (prev < detalle.cantidad ? prev + 1 : prev));
        } else {
            setCantidad(prev => prev + 1);
        }
    };
    const decrementarCantidad = () => setCantidad(prev => (prev > 1 ? prev - 1 : 1));

    const manejarAgregarAlCarrito = () => {
        if (detalle) {
            agregarProductoAlCarrito({ ...detalle, cantidad, tipo, "maxCantidad": tipo === 'carta' ? detalle.cantidad : 50 });
            setMostrarModalAgregado(true);
            setTimeout(() => {
                setMostrarModalAgregado(false);
            }, 3000);
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
                        <p><strong>Disponibles:</strong> {detalle.cantidad}</p>
                    </>
                )}
                {tipo === 'paquete' && (
                    <>
                        <p><strong>Set:</strong> {detalle.set}</p>
                        <p><strong>Cartas:</strong> {detalle.cantidad}</p>
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
            {mostrarModalAgregado && (
                <div className="prompt-overlay">
                    <div className="prompt-contenido">
                        <p>Producto Agregado al carrito.</p>
                        <NavLink className="aceptar-boton" onClick={() => setMostrarModalAgregado(false)}>Aceptar</NavLink>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Detalle;
