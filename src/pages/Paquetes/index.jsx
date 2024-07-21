// src/paginas/FiltrarPaquetes.jsx
import React from 'react';
import Filtro from '@src/componentes/Filtro';
import Paquete from '@src/componentes/Paquete'; // Asegúrate de tener este componente
import './Paquetes.css'; // Añadimos el archivo CSS

// Datos de ejemplo para los paquetes
const paquetes = [
    {
        "id": "1",
        "nombre": "Paquete 1",
        "set": "Maze of Milenia",
        "precio": 5000,
        "cantidad": 9,
        "descripcion": "Un paquete lleno de cartas poderosas de la serie Maze of Milenia.",
        "imagen": "/img/paquete.png"
    },
    {
        "id": "2",
        "nombre": "Paquete 2",
        "set": "Origins",
        "precio": 6000,
        "cantidad": 9,
        "descripcion": "Paquete de cartas clásicas que han definido el juego.",
        "imagen": "/img/paquete.png"
    },
    {
        "id": "3",
        "nombre": "Paquete 3",
        "set": "Genesis",
        "precio": 7000,
        "cantidad": 9,
        "descripcion": "Paquete de cartas que marca el inicio de una nueva era.",
        "imagen": "/img/paquete.png"
    }
];

function Paquetes() {
    return (
        <div className='fondo'>
            <h1>PAQUETES</h1>
            <div className="filtrar-paquetes">
                <div className="filtro-container">
                    <Filtro categoria="paquetes"/>
                </div>
                <div className="paquetes-container">
                    {paquetes.map((paquete) => (
                        <Paquete
                            key={paquete.id}
                            nombre={paquete.nombre}
                            cantidad={paquete.cantidad}
                            set={paquete.set}
                            precio={paquete.precio}
                            descripcion={paquete.descripcion}
                            imagen={paquete.imagen}
                            id={paquete.id}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Paquetes;
