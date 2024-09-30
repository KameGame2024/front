import React, { useState, useContext, useEffect } from 'react';
import { GlobalContext } from '@src/context/GlobalContext';
import Filtro from '@src/componentes/Filtro';
import Paquete from '@src/componentes/Paquete';
import { FaChevronDown } from 'react-icons/fa'; 
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

    // Función para construir la query string con los filtros aplicados
    const construirQueryString = (filtros, pagina) => {
        const params = new URLSearchParams();
        params.append('page', pagina);
        params.append('limit', 12); // Asumimos un límite de 12 paquetes por página

        // Aplicar filtros
        if (filtros.precioMin) params.append('precioMin', filtros.precioMin);
        if (filtros.precioMax) params.append('precioMax', filtros.precioMax);

        const setSeleccionado = Object.keys(filtros.sets).find(set => filtros.sets[set]);
        if (setSeleccionado) params.append('set', setSeleccionado);

        if (busqueda) params.append('nombre', busqueda);

        return params.toString();
    };

    const fetchPaquetesData = async (page) => {
        try {
            const queryString = construirQueryString(filtros, page);
            const urlWithQuery = `${urlGetPaquetes}?${queryString}`;

            const response = await fetch(urlWithQuery);
            const data = await response.json();
            setPaquetes(data.data);
            setPaginasTotales(data.pages);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchPaquetesData(paginaActual);
    }, [paginaActual, filtros, busqueda]);

    const handlePrevPage = () => {
        if (paginaActual > 1) {
            setPaginaActual(paginaActual - 1);
        }
    };

    const handleNextPage = () => {
        if (paginaActual < paginasTotales) {
            setPaginaActual(paginaActual + 1);
        }
    };

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

    const aplicarFiltros = () => {
        setIsModalOpen(false); // Cerrar el modal al aplicar filtros
        setPaginaActual(1); // Reiniciar a la primera página cuando se apliquen los filtros
        fetchPaquetesData(1); // Hacer una nueva llamada con los filtros aplicados
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
                
                <div className="paquetes-container">
                    {paquetesFiltrados.map((paquete) => (
                        <Paquete
                            key={paquete.id}
                            nombre={paquete.nombre}
                            cantidad={paquete.cantidad}
                            set={paquete.set}
                            precio={paquete.precio}
                            descripcion={paquete.descripcion}
                            imagen={paquete.url_imagen}
                            id={paquete.id}
                            tipoDetalle='compra'
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
                        <button className="aplicar-filtros-btn" onClick={aplicarFiltros}>Aplicar Filtros</button>
                        <button className="close-modal" onClick={() => setIsModalOpen(false)}>Cerrar</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Paquetes;