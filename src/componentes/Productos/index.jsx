// src/paginas/Productos.jsx
import React, { useContext, useState, useEffect } from 'react';
import { GlobalContext } from '@src/context/GlobalContext';
import AgregarProducto from '@src/componentes/AgregarProducto';
import BarraBusqueda from '@src/componentes/BarraBusqueda';
import './Productos.css';

const Productos = () => {
    const { cartas, paquetes } = useContext(GlobalContext);
    const [cartasFiltradas, setCartasFiltradas] = useState(cartas);
    const [paquetesFiltrados, setPaquetesFiltrados] = useState(paquetes);

    const buscarCartas = (query) => {
        setCartasFiltradas(cartas.filter(carta => 
            carta.nombre.toLowerCase().includes(query.toLowerCase())
        ));
    };

    const buscarPaquetes = (query) => {
        setPaquetesFiltrados(paquetes.filter(paquete => 
            paquete.nombre.toLowerCase().includes(query.toLowerCase())
        ));
    };

    useEffect(() => {
        setCartasFiltradas(cartas);
        setPaquetesFiltrados(paquetes);
    }, [cartas, paquetes]);

    return (
        <div className="productos-container">
            <BarraBusqueda buscarCartas={buscarCartas} buscarPaquetes={buscarPaquetes} />
            <h1>Productos</h1>
            <div className="productos-lista">
                {cartasFiltradas.map(carta => (
                    <div key={carta.id} className="producto-item">
                        <img src={carta.imagen} alt={carta.nombre} />
                        <h2>{carta.nombre}</h2>
                        <p>Precio: ${carta.precio}</p>
                        <AgregarProducto producto={carta} />
                    </div>
                ))}
                {paquetesFiltrados.map(paquete => (
                    <div key={paquete.id} className="producto-item">
                        <img src={paquete.imagen} alt={paquete.nombre} />
                        <h2>{paquete.nombre}</h2>
                        <p>Precio: ${paquete.precio}</p>
                        <AgregarProducto producto={paquete} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Productos;
