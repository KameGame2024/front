// src/pages/Detalle/Detalle.jsx
import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
// import { GlobalContext } from '../../context/GlobalContext';
import '../Detalle/Detalle.css';
import { NavLink } from 'react-router-dom';

import { urlGetCartaBarajaUsuario, urlPostBaraja} from '../../utils/constants';

import AuthContext from '../../context/AuthContext';

function DetalleColeccion() {

    const { id_carta } = useParams();
    // const { cartas, paquetes, agregarProductoAlCarrito } = useContext(GlobalContext);
    const [detalle, setDetalle] = useState(null);
    const [cantidad, setCantidad] = useState(0);
    const [cantidadBaraja, setCantidadBaraja] = useState(0);
    const [mostrarModalAgregado, setMostrarModalAgregado] = useState(false);
    const [mostrarModalError, setMostrarModalError] = useState(false);

    const { userId } = useContext(AuthContext);

    const fetchCartaBaraja = async (id_usuario, id_carta) => {
        try {
            const urlCarta = urlGetCartaBarajaUsuario(id_usuario, id_carta);
            const response = await fetch(urlCarta);
            const data = await response.json();
            setDetalle(data);
            setCantidadBaraja(data.cantidadBaraja);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetchCartaBaraja(userId, id_carta);
    }, []);

    const incrementarCantidad = () => setCantidad(prev => (prev < (detalle.cantidad - cantidadBaraja) ? prev + 1 : (detalle.cantidad - cantidadBaraja)));
    const decrementarCantidad = () => setCantidad(prev => (prev > (- cantidadBaraja) ? prev - 1 : (- cantidadBaraja)));

    const handleAddToBaraja = () => {
        const url = urlPostBaraja;
        let data = {};
        if (detalle.id === -1) {
            data = {
                "id_usuario": userId,
                "id_carta": id_carta,
                "cantidad": cantidadBaraja + cantidad
            };
        } else {
            data = {
                "id": detalle.id,
                "id_usuario": userId,
                "id_carta": id_carta,
                "cantidad": cantidadBaraja + cantidad
            };
        }
        
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => {
            if (response.ok) {
                setMostrarModalAgregado(true);
            } else {
                setMostrarModalError(true);
            }
            setCantidadBaraja(cantidadBaraja + cantidad);
        }).catch(error => {
            console.error('Error:', error);
            setMostrarModalError(true);
        });
    };

    if (!detalle) return <p>Cargando...</p>;

    return (
        <div className={`detalle-carta`}>
            <img src={detalle.imagen} alt={detalle.nombre} className="detalle-imagen" />
            <div className="detalle-info">
                <h1 className="detalle-titulo">{detalle.nombre}</h1>
                <h2 className="descripcion_t">Descripción</h2>
                <p>{detalle.descripcion}</p>
                <p><strong>Ataque:</strong> {detalle.ataque}</p>
                <p><strong>Defensa:</strong> {detalle.defensa}</p>
                <p><strong>Tipo:</strong> {detalle.tipo}</p>
                <p><strong>Atributo:</strong> {detalle.atributo}</p>
                <p><strong>Cantidad:</strong>{detalle.cantidad}</p>
                <p><strong>En Baraja:</strong>{cantidadBaraja}</p>
                <br />
                <br />
                <div className="detalle-cantidad">
                    <button className="detalle_masmenos" onClick={decrementarCantidad}>-</button>
                    <span className="detalle_cant">{cantidad}</span>
                    <button className="detalle_masmenos" onClick={incrementarCantidad}>+</button>
                    <button className="detalle-agregar" onClick={handleAddToBaraja}>Agregar a la baraja</button>
                </div>
            </div>
            {mostrarModalAgregado && (
                <div className="prompt-overlay">
                    <div className="prompt-contenido">
                        <p>Carta Agregada con éxito</p>
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

export default DetalleColeccion;
