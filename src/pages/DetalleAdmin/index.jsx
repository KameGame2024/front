// src/pages/Detalle/Detalle.jsx
import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import { GlobalContext } from '../../context/GlobalContext';
import '../Detalle/Detalle.css';
import './DetalleAdmin.css';
import { NavLink } from 'react-router-dom';

import {urlGetCartaInventario, urlGetPaqueteInventario, urlAddCartaInventario, urlAddPaqueteInventario} from '../../utils/constants';


function DetalleAdmin() {
    const { tipo, id } = useParams();
    // const { cartas, paquetes, agregarProductoAlCarrito } = useContext(GlobalContext);
    const [detalle, setDetalle] = useState(null);
    const [cantidad, setCantidad] = useState(null);
    const [mostrarModalAgregado, setMostrarModalAgregado] = useState(false);
    const [mostrarModalError, setMostrarModalError] = useState(false);

    const fetchCarta = async (id_carta) => {
        try {
            const urlCarta = urlGetCartaInventario(id_carta);
            const response = await fetch(urlCarta);
            const data = await response.json();
            setDetalle(data);
            setCantidad(data.cantidad);
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
            setCantidad(data.cantidad);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const fetchUpdateInventario = async (id_producto, cantidad) => {
        try {
            if (tipo === 'carta') {
                const response = await fetch(urlAddCartaInventario, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id_carta: id_producto, cantidad })
                });
                const data = await response.json();
                setMostrarModalAgregado(true);
                return data;
            } else {
                const response = await fetch(urlAddPaqueteInventario, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id_paquete: id_producto, cantidad })
                });
                const data = await response.json();
                setMostrarModalAgregado(true);
                return data;
            }

        } catch (error) {
            setMostrarModalError(true);
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

    const incrementarCantidad = () => setCantidad(prev => prev + 1);
    const decrementarCantidad = () => setCantidad(prev => (prev > 1 ? prev - 1 : 0));

    const handleAddInventory = () => {
        if (detalle) {
            fetchUpdateInventario(detalle.id, cantidad);
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
                    </>
                )}
                {tipo === 'paquete' && (
                    <>
                        <p><strong>Set:</strong> {detalle.set}</p>
                        <p><strong>Cantidad Cartas:</strong> {detalle.cantidad}</p>
                    </>
                )}
                <h1 className="detalle-precio"><strong>$ {detalle.precio}</strong></h1>
                <div className="detalle-cantidad">
                    <button className="detalle_masmenos" onClick={decrementarCantidad}>-</button>
                    <span className="detalle_cant">{cantidad}</span>
                    <button className="detalle_masmenos" onClick={incrementarCantidad}>+</button>
                    <button className="detalle-agregar" onClick={handleAddInventory}>Agregar a la tienda</button>
                </div>
            </div>
            {mostrarModalAgregado && (
                <div className="prompt-overlay">
                    <div className="prompt-contenido">
                        <p>Producto modificado con éxito</p>
                        <NavLink className="aceptar-boton" onClick={() => setMostrarModalAgregado(false)}>Aceptar</NavLink>
                    </div>
                </div>
            )}
            {mostrarModalError && (
                <div className="prompt-overlay">
                    <div className="prompt-contenido">
                        <p>Parece que algo salió mal.</p>
                        <NavLink className="aceptar-boton" onClick={() => setMostrarModalError(false)}>Aceptar</NavLink>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DetalleAdmin;
