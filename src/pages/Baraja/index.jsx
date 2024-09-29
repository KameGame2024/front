// src/componentes/Baraja.jsx
import React, { useState, useEffect, useContext } from 'react';
import Card from '@src/componentes/Card';
import './Baraja.css';
import { urlGetBarajaUsuario } from '../../utils/constants';
import { AuthContext } from '@src/context/AuthContext';

function Baraja() {
    const [cartasBaraja, setCartasBaraja] = useState([]);
    const [cantidadCartas, setCantidadCartas] = useState(0);
    const [barajaValidMsg, setBarajaValidMsg] = useState("");

    const { user_id } = useContext(AuthContext);

    const fetchCartasBaraja = async () => {
        try {

            const response = await fetch(urlGetBarajaUsuario(user_id));
            const data = await response.json();
            setCartasBaraja(data);

            // Verificar si la baraja es válida
            

            data.forEach((carta) => {
                setCantidadCartas(prev => prev + carta.cantidad);
            }
            );
            
            if (cantidadCartas === 18) {
                setBarajaValidMsg("Genial! Tu baraja está lista para la batalla.");
            } else if (cantidadCartas > 18) {
                setBarajaValidMsg("¡Atención! Tu baraja tiene más de 18 cartas.");
            }
            else {
                setBarajaValidMsg("¡Atención! Tu baraja tiene menos de 18 cartas.");
            }

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
            <p>Cartas en tu baraja: {cantidadCartas}</p>
            <p>{barajaValidMsg}</p>
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
