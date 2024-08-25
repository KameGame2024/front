// src/componentes/Cartas.js
import React, { useState, useContext } from 'react';
import { GlobalContext } from '@src/context/GlobalContext';
import Filtro from '@src/componentes/Filtro';
import Card from '@src/componentes/Card';
import { FaChevronDown } from 'react-icons/fa'; // Import the down arrow icon
import './Cartas.css';

function Cartas() {
    const { cartas, busqueda } = useContext(GlobalContext);
    const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
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

    const filtrarCartas = (cartas) => {
        return cartas.filter(carta => {
            const cumpleBusqueda = carta.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
            carta.descripcion.toLowerCase().includes(busqueda.toLowerCase());
            const cumpleAtaque = (!filtros.ataqueMin || carta.ataque >= filtros.ataqueMin) &&
                                 (!filtros.ataqueMax || carta.ataque <= filtros.ataqueMax);
            const cumpleDefensa = (!filtros.defensaMin || carta.defensa >= filtros.defensaMin) &&
                                  (!filtros.defensaMax || carta.defensa <= filtros.defensaMax);
            const cumplePrecio = (!filtros.precioMin || carta.precio >= filtros.precioMin) &&
                                 (!filtros.precioMax || carta.precio <= filtros.precioMax);
            const cumpleTipo = !Object.values(filtros.tipos).includes(true) || Object.keys(filtros.tipos).some(tipo => filtros.tipos[tipo] && carta.tipo.toLowerCase() === tipo);
            const cumpleAtributo = !Object.values(filtros.atributos).includes(true) || Object.keys(filtros.atributos).some(atributo => filtros.atributos[atributo] && carta.atributo.toLowerCase() === atributo);

            return cumpleBusqueda && cumpleAtaque && cumpleDefensa && cumplePrecio && cumpleTipo && cumpleAtributo;
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
                                mostrarBotonVer={true} 
                                atributo={carta.atributo}
                                id={carta.id}
                            />
                        ))
                    ) : (
                        <p className="no-cartas">No hay cartas disponibles en este momento</p>
                    )}
                </div>
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
