// src/componentes/Baraja.jsx
import React, { useState, useEffect } from 'react';
import Card from '@src/componentes/Card';
import './Baraja.css';
import { urlGetBarajaUsuario } from '../../utils/constants';

function Baraja() {
    const [cartasBaraja, setCartasBaraja] = useState([]);

    const user = 6; // TODO: obtener el id del usuario

    const fetchCartasBaraja = async () => {
        try {

            // TODO: con el AUTH token, se puede obtener el id del usuario
            const response = await fetch(urlGetBarajaUsuario(user));
            const data = await response.json();
            setCartasBaraja(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    useEffect(() => {
        fetchCartasBaraja();
    }, []);

    return (
        <div className="mi-baraja-container">
            <h2>MI BARAJA</h2>
            {cartasBaraja.length > 0 ? (
                <div className="cartas-grid">
                    {cartasBaraja.map((carta) => (
                        <Card
                            key={carta.id}
                            imagen={carta.imagen}
                            nombre={carta.nombre}
                            descripcion={carta.descripcion}
                            ataque={carta.ataque}
                            defensa={carta.defensa}
                            precio={carta.precio}
                            id={carta.id}
                            tipoDetalle='user'
                            cantidad={carta.cantidad}
                        />
                    ))}
                </div>
            ) : (
                <p>No has seleccionado ninguna carta aún.</p>
            )}
        </div>
    );
}

export default Baraja;
