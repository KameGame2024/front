import React, { useState, useContext, useEffect } from 'react';
import { GlobalContext } from '@src/context/GlobalContext';
import Filtro from '@src/componentes/Filtro';
import Card from '@src/componentes/Card';
import PaginationBar from '../../componentes/paginationBar';
import { FaChevronDown } from 'react-icons/fa'; // Import the down arrow icon
import './Cartas.css';

import { urlGetCartasEnInventario } from '../../utils/constants';

function Cartas() {
    const [cartas, setCartas] = useState([]);
    const [paginaActual, setPaginaActual] = useState(1);
    const [paginasTotales, setPaginasTotales] = useState(0);
    const [filtros, setFiltros] = useState({
        ataqueMin: '',
        ataqueMax: '',
        defensaMin: '',
        defensaMax: '',
        precioMin: '',
        precioMax: '',
        tipos: {
            monstruo: false,
            hechizo: false,
            trampa: false
        },
        atributos: {
            fuego: false,
            agua: false,
            tierra: false,
            viento: false,
            luz: false,
            oscuridad: false
        }
    });

    const { busqueda } = useContext(GlobalContext);
    const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

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

    // Función que construye la URL con los filtros
    const construirUrlConFiltros = (page) => {
        let url = `${urlGetCartasEnInventario}?page=${page}&limit=12`;

        // Añadir filtros si existen
        if (filtros.ataqueMin) url += `&ataqueMin=${filtros.ataqueMin}`;
        if (filtros.ataqueMax) url += `&ataqueMax=${filtros.ataqueMax}`;
        if (filtros.defensaMin) url += `&defensaMin=${filtros.defensaMin}`;
        if (filtros.defensaMax) url += `&defensaMax=${filtros.defensaMax}`;
        if (filtros.precioMin) url += `&precioMin=${filtros.precioMin}`;
        if (filtros.precioMax) url += `&precioMax=${filtros.precioMax}`;

        const tiposSeleccionados = Object.keys(filtros.tipos).filter(tipo => filtros.tipos[tipo]);
        if (tiposSeleccionados.length) url += `&tipo=${tiposSeleccionados.join(',')}`;

        const atributosSeleccionados = Object.keys(filtros.atributos).filter(atributo => filtros.atributos[atributo]);
        if (atributosSeleccionados.length) url += `&atributo=${atributosSeleccionados.join(',')}`;

        return url;
    };

    const fetchCartasData = async (page) => {
        try {
            const urlWithFilters = construirUrlConFiltros(page);
            const response = await fetch(urlWithFilters);
            const data = await response.json();
            setCartas(data.data);
            setPaginasTotales(data.pages);

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        // Fetch cards when the component mounts
        fetchCartasData(paginaActual);
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

    // Función para manejar el clic en el botón "Aplicar filtros"
    const aplicarFiltros = () => {
        fetchCartasData(1); // Reinicia la página a la primera cuando se aplican los filtros
    };

    const filtrarCartas = (cartas) => {
        return cartas.filter(carta => {
            const cumpleBusqueda = carta.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                carta.descripcion.toLowerCase().includes(busqueda.toLowerCase());

            return cumpleBusqueda;
        });
    };

    const cartasFiltradas = filtrarCartas(cartas);

    return (
        <div className='fondo'>
            <h1>CARTAS</h1>
            {/* Mobile filter button */}
            <div className="mobile-filter-button" onClick={() => setIsModalOpen(true)}>
                <FaChevronDown /> Filtrar
            </div>

            <div className="filtrar-cartas">
                {/* Filters container (visible only on larger screens) */}
                <div className={`filtro-container ${isModalOpen ? 'modal-open' : ''}`}>
                    <Filtro categoria="cartas" filtros={filtros} manejarCambioFiltro={manejarCambioFiltro} />
                    {/* Botón para aplicar filtros */}
                    <button className="btn-aplicar-filtros" onClick={aplicarFiltros}>Aplicar Filtros</button>
                </div>
                
                {/* Cards container */}
                <div className="cartas-container">
                    {cartasFiltradas.length > 0 ? (
                        cartasFiltradas.map((carta) => (
                            <Card
                                key={carta.id}
                                imagen={carta.imagen}
                                nombre={carta.nombre}
                                descripcion={carta.descripcion}
                                ataque={carta.ataque}
                                defensa={carta.defensa}
                                precio={carta.precio}
                                tipo={carta.tipo}
                                atributo={carta.atributo}
                                id={carta.id}
                                cantidad={carta.cantidad}
                                tipoDetalle="compra"
                            />
                        ))
                    ) : (
                        <p className="no-cartas">No hay cartas disponibles en este momento</p>
                    )}
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

            {/* Filter modal for mobile */}
            {isModalOpen && (
                <div className="filtro-modal">
                    <div className="modal-content">
                        <Filtro categoria="cartas" filtros={filtros} manejarCambioFiltro={manejarCambioFiltro} />
                        <button className="close-modal" onClick={() => setIsModalOpen(false)}>Cerrar</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Cartas;