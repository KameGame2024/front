// src/componentes/Filtro.jsx
import React, { useState } from 'react';
import './Filtro.css';

function Filtro({ categoria }) {
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
        },
        sets: {
            maze: false,
            origins: false,
            genesis: false
        }
    });

    const manejarCambioFiltro = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox') {
            setFiltros((prev) => ({
                ...prev,
                [name]: checked
            }));
        } else {
            setFiltros((prev) => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const quitarFiltro = (tipo) => {
        setFiltros((prev) => ({
            ...prev,
            [tipo]: ''
        }));
    };

    return (
        <div className="filtro">
            <h2>Filtros Aplicados</h2>
            <div className="filtros-aplicados">
                {Object.entries(filtros).map(([key, value]) => (
                    value && typeof value === 'string' && value !== '' && (
                        <div key={key} className="filtro-aplicado">
                            {key.replace(/([A-Z])/g, ' $1').toUpperCase()}: {value}
                            <button onClick={() => quitarFiltro(key)}>X</button>
                        </div>
                    )
                ))}
            </div>
            <hr className="separator-line" />
            {categoria === 'cartas' && (
                <>
                    <div className="filtro-seccion">
                        <h3>Ataque</h3>
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
                        <h3>Defensa</h3>
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
                        {['monstruo', 'hechizo', 'trampa'].map(tipo => (
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
                        {['fuego', 'agua', 'tierra', 'viento', 'luz', 'oscuridad'].map(atributo => (
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
            {categoria === 'paquetes' && (
                <>
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
                        <h3>Set</h3>
                        {['maze', 'origins', 'genesis'].map(set => (
                            <div key={set} className="filtro-checkbox">
                                <input
                                    type="checkbox"
                                    id={set}
                                    name={`sets.${set}`}
                                    checked={filtros.sets[set]}
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
