// src/componentes/Paquetes.js
import React, { useState, useContext, useEffect } from 'react';
import { GlobalContext } from '@src/context/GlobalContext';
import Filtro from '@src/componentes/Filtro';
import Paquete from '@src/componentes/Paquete';
import { FaChevronDown } from 'react-icons/fa'; // Import the down arrow icon
import './Paquetes.css';

import { urlGetPaquetes } from '../../utils/constants';
import PaginationBar from '../../componentes/paginationBar';

function Paquetes() {
    const { busqueda } = useContext(GlobalContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filtros, setFiltros] = useState({
        precioMin: '',
        precioMax: '',
        sets: {
            maze: false,
            origins: false,
            genesis: false
        }
    });
    const [paquetes, setPaquetes] = useState([]);
    const [paginaActual, setPaginaActual] = useState(1);
    const [paginasTotales, setPaginasTotales] = useState(0);


    const fetchPaquetesData = async (page) => {
        try {
            const urlWithPage = `${urlGetPaquetes}?page=${page}&limit=12`;
            const response = await fetch(urlWithPage);
            const data = await response.json();
            setPaquetes(data.data);
            setPaginasTotales(data.pages);
        }
        catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        // Fetch packages when the component mounts

        fetchPaquetesData(paginaActual);
    }, [paginaActual]);

    const handlePrevPage = () => {
        if (paginaActual > 1) {
            setPaginaActual(paginaActual - 1);
        }
    }

    const handleNextPage = () => {
        if (paginaActual < paginasTotales) {
            setPaginaActual(paginaActual + 1);
        }
    }

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
            <div className="mobile-filter-button" onClick={() => setIsModalOpen(true)}>
                <FaChevronDown /> Filtrar
            </div>
            <div className="filtrar-paquetes">
                <div className={`filtro-container ${isModalOpen ? 'modal-open' : ''}`}>
                    <Filtro categoria="paquetes" filtros={filtros} manejarCambioFiltro={manejarCambioFiltro} />
                </div>
                
                {/* Paquetes container */}
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

            <div>
                <PaginationBar
                    paginasTotales={paginasTotales}
                    paginaActual={paginaActual}
                    handlePaginate={setPaginaActual}
                    handlePrevPage={handlePrevPage}
                    handleNextPage={handleNextPage}
                />
            </div>

            {isModalOpen && (
                <div className="filtro-modal">
                    <div className="modal-content">
                        <Filtro categoria="paquetes" filtros={filtros} manejarCambioFiltro={manejarCambioFiltro} />
                        <button className="close-modal" onClick={() => setIsModalOpen(false)}>Cerrar</button>
                        
                    </div>
                </div>
            )}
        </div>
    );
}

export default Paquetes;
