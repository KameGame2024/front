import React, { useState, useEffect } from 'react';
import Filtro from '@src/componentes/Filtro';
import Card from '@src/componentes/Card';

import { urlGetCartas } from '../../utils/constants';
import PaginationBar from '../../componentes/paginationBar';

const CartasAdmin = () => {
    const [cartas, setCartas] = useState([]);
    const [paginaActual, setPaginaActual] = useState(1);
    const [paginasTotales, setPaginasTotales] = useState(0);

    // Función que construye la URL con los filtros
    const construirUrlConFiltros = (page) => {
        let url = `${urlGetCartas}?page=${page}&limit=12`;

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

    // Función para manejar el clic en el botón "Aplicar filtros"
    const aplicarFiltros = () => {
        fetchCartasData(1); // Reinicia la página a la primera cuando se aplican los filtros
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

    const filtrarColeccion = (cartas) => {
        return cartas.filter(carta => {
            const cumpleAtaque = (!filtros.ataqueMin || carta.ataque >= filtros.ataqueMin) &&
                                 (!filtros.ataqueMax || carta.ataque <= filtros.ataqueMax);
            const cumpleDefensa = (!filtros.defensaMin || carta.defensa >= filtros.defensaMin) &&
                                  (!filtros.defensaMax || carta.defensa <= filtros.defensaMax);
            const cumplePrecio = (!filtros.precioMin || carta.precio >= filtros.precioMin) &&
                                 (!filtros.precioMax || carta.precio <= filtros.precioMax);
            const cumpleTipo = !Object.values(filtros.tipos).includes(true) || Object.keys(filtros.tipos).some(tipo => filtros.tipos[tipo] && carta.tipo.toLowerCase() === tipo);
            const cumpleAtributo = !Object.values(filtros.atributos).includes(true) || Object.keys(filtros.atributos).some(atributo => filtros.atributos[atributo] && carta.atributo.toLowerCase() === atributo);

            return cumpleAtaque && cumpleDefensa && cumplePrecio && cumpleTipo && cumpleAtributo;
        });
    };

    const cartasFiltradas = filtrarColeccion(cartas);

    return (
        <div>
            <div className='fondo'>
            <h1>Panel Admin Cartas</h1>
            <p>Aquí puedes seleccionar las cartas que quieras habilitar</p>
            <div className="filtrar-cartas">
                <div className="filtro-container">
                    <Filtro categoria="cartas" filtros={filtros} manejarCambioFiltro={manejarCambioFiltro} />
                    <button className="btn-aplicar-filtros" onClick={aplicarFiltros}>Aplicar Filtros</button>
                </div>
                <div className="cartas-container">
                    {cartasFiltradas.map((carta) => (
                        <Card
                            key={carta.id}
                            imagen={carta.imagen}
                            nombre={carta.nombre}
                            descripcion={carta.descripcion}
                            ataque={carta.ataque}
                            defensa={carta.defensa}
                            precio={carta.precio}
                            id={carta.id}
                            cantidad={carta.cantidad}
                            tipoDetalle="admin"
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
        </div>
        </div>
    );
};

export default CartasAdmin;