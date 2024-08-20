import React, { useContext, useState } from 'react';
import Filtro from '@src/componentes/Filtro';
import Paquete from '@src/componentes/Paquete'; // Asegúrate de tener este componente
import './Paquetes.css'; // Añadimos el archivo CSS
import { GlobalContext } from '@src/context/GlobalContext';

function Paquetes() {
    const { paquetes, busqueda } = useContext(GlobalContext);
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
            const cumpleBusqueda = paquete.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
            paquete.descripcion.toLowerCase().includes(busqueda.toLowerCase());
            const cumplePrecio = (!filtros.precioMin || paquete.precio >= filtros.precioMin) &&
                                 (!filtros.precioMax || paquete.precio <= filtros.precioMax);
            const cumpleSet = !Object.values(filtros.sets).includes(true) || Object.keys(filtros.sets).some(set => filtros.sets[set] && paquete.set.toLowerCase().includes(set));

            return cumpleBusqueda && cumplePrecio && cumpleSet;
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
