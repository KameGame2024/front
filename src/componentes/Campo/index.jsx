import React from "react";
import "./Campo.css";

const Campo = (props) => {
    const placeholderModificado = `${props.placeholder}...`;

    const manejarCambio = (e) => {
        props.actualizarValor(e.target.value);
    };

    return (
        <div className={`campo campo-${props.type}`}>
            <label>{props.titulo}</label>
            <input
                placeholder={placeholderModificado}
                required={props.required}
                value={props.valor}
                onChange={manejarCambio}
                type={props.type}
            />
            {props.mensajeError && (
                <p className="mensaje-error">{props.mensajeError}</p>
            )}
        </div>
    );
};

export default Campo;
