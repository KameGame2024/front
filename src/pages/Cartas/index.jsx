// src/componentes/Cartas.js
import React, { useState, useContext } from 'react';
import { GlobalContext } from '@src/context/GlobalContext'; // Ajusta la ruta si es necesario
import Filtro from '@src/componentes/Filtro';
import Card from '@src/componentes/Card';
import './Cartas.css'; // Añadimos el archivo CSS

function Cartas() {
    const { cartas, busqueda } = useContext(GlobalContext);

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
                            tipo={carta.tipo}
                            mostrarBotonVer={true} 
                            atributo={carta.atributo}
                            id={carta.id}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Cartas;
