// src/componentes/Coleccion.js
import React, { useEffect, useState } from 'react';
import Filtro from '@src/componentes/Filtro';
import Card from '@src/componentes/Card';
import './Coleccion.css'; // Añade un archivo CSS específico para la colección

import { urlGetCartasUsuario } from '../../utils/constants';
import PaginationBar from '../../componentes/paginationBar';

function Coleccion() {

    const [cartas, setCartas] = useState([]);
    const [paginaActual, setPaginaActual] = useState(1);
    const [paginasTotales, setPaginasTotales] = useState(0);

    const fetchCartasData = async (page) => {

        const user = 6; // TODO: obtener el id del usuario
        try {
            // TODO: con el AUTH token, se puede obtener el id del usuario
            const urlWithPage = `${urlGetCartasUsuario(user)}?page=${page}&limit=12`;
            const response = await fetch(urlWithPage);
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
        <div className='fondo'>
            <h1>MI COLECCIÓN</h1>
            <div className="filtrar-cartas">
                <div className="filtro-container">
                    <Filtro categoria="cartas" filtros={filtros} manejarCambioFiltro={manejarCambioFiltro} />
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
                            tipoDetalle='user'
                            cantidad={carta.cantidad}
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
    );
}

export default Coleccion;
