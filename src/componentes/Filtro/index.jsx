// src/componentes/Filtro.jsx
import React, { useContext } from 'react';
import { GlobalContext } from '@src/context/GlobalContext';
import './Filtro.css';

function Filtro({ categoria, filtros, manejarCambioFiltro }) {
    const { cartas, paquetes } = useContext(GlobalContext);

    // Obtener los tipos y atributos únicos para cartas
    const tiposCartas = [...new Set(cartas.map(carta => carta.tipo.toLowerCase()))];
    const atributosCartas = [...new Set(cartas.map(carta => carta.atributo.toLowerCase()))];

    return (
        <div className="filtro">
            <h2>Filtros</h2>
            {categoria === 'cartas' && (
                <>
                    {/* Filtros para cartas */}
                    <div className="filtro-seccion">
                        <h3>Ataque</h3>
                        <div className='maxmin'>
                            <input
                                type="number"
                                name="ataqueMin"
                                placeholder="Mínimo"
                                value={filtros.ataqueMin || ''}
                                onChange={manejarCambioFiltro}
                            />
                            <p>-</p>
                            <input
                                type="number"
                                name="ataqueMax"
                                placeholder="Máximo"
                                value={filtros.ataqueMax || ''}
                                onChange={manejarCambioFiltro}
                            />
                        </div>
                    </div>
                    <hr className="separator-line" />
                    <div className="filtro-seccion">
                        <h3>Defensa</h3>
                        <div className='maxmin'>
                            <input
                                type="number"
                                name="defensaMin"
                                placeholder="Mínimo"
                                value={filtros.defensaMin || ''}
                                onChange={manejarCambioFiltro}
                            />
                            <p>-</p>
                            <input
                                type="number"
                                name="defensaMax"
                                placeholder="Máximo"
                                value={filtros.defensaMax || ''}
                                onChange={manejarCambioFiltro}
                            />
                        </div>
                    </div>
                    <hr className="separator-line" />
                    <div className="filtro-seccion">
                        <h3>Precio</h3>
                        <div className='maxmin'>
                            <input
                                type="number"
                                name="precioMin"
                                placeholder="Mínimo"
                                value={filtros.precioMin || ''}
                                onChange={manejarCambioFiltro}
                            />
                            <p>-</p>
                            <input
                                type="number"
                                name="precioMax"
                                placeholder="Máximo"
                                value={filtros.precioMax || ''}
                                onChange={manejarCambioFiltro}
                            />
                        </div>
                    </div>
                    <hr className="separator-line" />
                </>
            )}
            {categoria === 'paquetes' && (
                <>
                    {/* Filtros para paquetes */}
                    <div className="filtro-seccion">
                        <h3>Precio</h3>
                        <div className='maxmin'>
                            <input
                                type="number"
                                name="precioMin"
                                placeholder="Mínimo"
                                value={filtros.precioMin || ''}
                                onChange={manejarCambioFiltro}
                            />
                            <p>-</p>
                            <input
                                type="number"
                                name="precioMax"
                                placeholder="Máximo"
                                value={filtros.precioMax || ''}
                                onChange={manejarCambioFiltro}
                            />
                        </div>
                    </div>
                    <hr className="separator-line" />
                </>
            )}
        </div>
    );
}

export default Filtro;
