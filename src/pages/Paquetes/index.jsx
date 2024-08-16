// src/paginas/FiltrarPaquetes.jsx
import React, { useState } from 'react';
import Filtro from '@src/componentes/Filtro';
import Paquete from '@src/componentes/Paquete'; // Asegúrate de tener este componente
import './Paquetes.css'; // Añadimos el archivo CSS

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
    const [filtros, setFiltros] = useState({
        precioMin: '',
        precioMax: '',
        sets: {
            maze: false,
            origins: false,
            genesis: false
        }
    });

    const manejarCambioFiltro = (e) => {
        const { name, value, type, checked } = e.target;
        const [category, key] = name.split('.');

        if (type === 'checkbox') {
            setFiltros((prevState) => ({
                ...prevState,
                [category]: {
                    ...prevState[category],
                    [key]: checked
                }
            }));
        } else {
            setFiltros((prevState) => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const filtrarPaquetes = (paquetes) => {
        return paquetes.filter(paquete => {
            const cumplePrecio = (!filtros.precioMin || paquete.precio >= filtros.precioMin) &&
                                 (!filtros.precioMax || paquete.precio <= filtros.precioMax);
            const cumpleSet = !Object.values(filtros.sets).includes(true) || Object.keys(filtros.sets).some(set => filtros.sets[set] && paquete.set.toLowerCase().includes(set));

            return cumplePrecio && cumpleSet;
        });
    };

    const paquetesFiltrados = filtrarPaquetes(paquetes);

    return (
        <div className='fondo'>
            <h1>PAQUETES</h1>
            <div className="filtrar-paquetes">
                <div className="filtro-container">
                    <Filtro categoria="paquetes" filtros={filtros} manejarCambioFiltro={manejarCambioFiltro} />
                </div>
                <div className="paquetes-container">
                    {paquetesFiltrados.map((paquete) => (
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
