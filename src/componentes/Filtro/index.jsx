import React from 'react';
import './Filtro.css';

function Filtro({ categoria, filtros, manejarCambioFiltro }) {
    return (
        <div className="filtro">
            <h2>Filtros</h2>
            {categoria === 'cartas' && (
                <>
                    <div className="filtro-seccion">
                        <h3>Ataque</h3>
                        <div className='maxmin'>
                            <input
                                type="number"
                                name="ataqueMin"
                                placeholder="Mínimo"
                                value={filtros.ataqueMin}
                                onChange={manejarCambioFiltro}
                            />
                            <p>-</p>
                            <input
                                type="number"
                                name="ataqueMax"
                                placeholder="Máximo"
                                value={filtros.ataqueMax}
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
                                value={filtros.defensaMin}
                                onChange={manejarCambioFiltro}
                            />
                            <p>-</p>
                            <input
                                type="number"
                                name="defensaMax"
                                placeholder="Máximo"
                                value={filtros.defensaMax}
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
                                value={filtros.precioMin}
                                onChange={manejarCambioFiltro}
                            />
                            <p>-</p>
                            <input
                                type="number"
                                name="precioMax"
                                placeholder="Máximo"
                                value={filtros.precioMax}
                                onChange={manejarCambioFiltro}
                            />
                        </div>
                    </div>
                    <hr className="separator-line" />
                    <div className="filtro-seccion">
                        <h3>Tipo</h3>
                        {Object.keys(filtros.tipos).map(tipo => (
                            <div key={tipo} className="filtro-checkbox">
                                <input
                                    type="checkbox"
                                    id={tipo}
                                    name={`tipos.${tipo}`}
                                    checked={filtros.tipos[tipo]}
                                    onChange={manejarCambioFiltro}
                                />
                                <label htmlFor={tipo}>{tipo.charAt(0).toUpperCase() + tipo.slice(1)}</label>
                            </div>
                        ))}
                    </div>
                    <hr className="separator-line" />
                    <div className="filtro-seccion">
                        <h3>Atributo</h3>
                        {Object.keys(filtros.atributos).map(atributo => (
                            <div key={atributo} className="filtro-checkbox">
                                <input
                                    type="checkbox"
                                    id={atributo}
                                    name={`atributos.${atributo}`}
                                    checked={filtros.atributos[atributo]}
                                    onChange={manejarCambioFiltro}
                                />
                                <label htmlFor={atributo}>{atributo.charAt(0).toUpperCase() + atributo.slice(1)}</label>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default Filtro;
