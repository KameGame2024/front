import React, { useState } from 'react';
import './Campo.css';

const Campo = React.forwardRef(({ titulo, placeholder, type, required, mensajeError, ...props }, ref) => {
    const [mostrarContrasena, setMostrarContrasena] = useState(false);

    const placeholderModificado = `${placeholder}...`;

    const toggleMostrarContrasena = () => {
        setMostrarContrasena(!mostrarContrasena);
    };

    return (
        <div className={`campo campo-${type}`}>
            <label>{titulo}</label>
            <div className="campo-input-wrapper">
                <input
                    placeholder={placeholderModificado}
                    required={required}
                    type={type === "password" && mostrarContrasena ? "text" : type}
                    ref={ref} // Usa el ref para manejar el registro del campo
                    {...props} // Extiende otras propiedades necesarias
                />
                {type === "password" && (
                    <span className="eye-icon" onClick={toggleMostrarContrasena}>
                        {mostrarContrasena ? "🙈" : "👁️"}
                    </span>
                )}
            </div>
            {mensajeError && (
                <p className="mensaje-error">{mensajeError}</p>
            )}
        </div>
    );
});

export default Campo;
