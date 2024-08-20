// src/componentes/Baraja.jsx
import React, { useContext } from 'react';
import Card from '@src/componentes/Card';
import { GlobalContext } from '@src/context/GlobalContext';
import './Baraja.css';

function Baraja() {
    const { cartasSeleccionadas } = useContext(GlobalContext);

    return (
        <div className="mi-baraja-container">
            <h2>Mi Baraja</h2>
            {cartasSeleccionadas.length > 0 ? (
                <div className="cartas-grid">
                    {cartasSeleccionadas.map((carta) => (
                        <Card
                            key={carta.id}
                            imagen={carta.imagen}
                            nombre={carta.nombre}
                            descripcion={carta.descripcion}
                            ataque={carta.ataque}
                            defensa={carta.defensa}
                            precio={carta.precio}
                            id={carta.id}
                            seleccionada={true}
                            mostrarSeleccion={false}
                            mostrarBotonVer={false} // No mostrar el botón "Ver"
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
