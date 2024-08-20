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
                    <div className="filtro-seccion">
                        <h3>Tipo</h3>
                        {tiposCartas.map(tipo => (
                            <div key={tipo} className="filtro-checkbox">
                                <input
                                    type="checkbox"
                                    id={tipo}
                                    name={`tipos.${tipo}`}
                                    checked={filtros.tipos[tipo] || false}
                                    onChange={manejarCambioFiltro}
                                />
                                <label htmlFor={tipo}>{tipo.charAt(0).toUpperCase() + tipo.slice(1)}</label>
                            </div>
                        ))}
                    </div>
                    <hr className="separator-line" />
                    <div className="filtro-seccion">
                        <h3>Atributo</h3>
                        {atributosCartas.map(atributo => (
                            <div key={atributo} className="filtro-checkbox">
                                <input
                                    type="checkbox"
                                    id={atributo}
                                    name={`atributos.${atributo}`}
                                    checked={filtros.atributos[atributo] || false}
                                    onChange={manejarCambioFiltro}
                                />
                                <label htmlFor={atributo}>{atributo.charAt(0).toUpperCase() + atributo.slice(1)}</label>
                            </div>
                        ))}
                    </div>
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
                    <div className="filtro-seccion">
                        <h3>Set</h3>
                        {['maze', 'origins', 'genesis'].map(set => (
                            <div key={set} className="filtro-checkbox">
                                <input
                                    type="checkbox"
                                    id={set}
                                    name={`sets.${set}`}
                                    checked={filtros.sets[set] || false}
                                    onChange={manejarCambioFiltro}
                                />
                                <label htmlFor={set}>{set.charAt(0).toUpperCase() + set.slice(1)}</label>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default Filtro;
