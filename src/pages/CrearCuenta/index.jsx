import React, { useContext, useState } from 'react';
import { Link } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Campo from '@src/componentes/Campo';
import './CrearCuenta.css';
import { GlobalContext } from '@src/context/GlobalContext';
import TerminosYCondiciones from '@src/componentes/TerminosyCondiciones/TerminosyCondiciones.jsx'; // Importamos el modal
// Esquema de validación usando Yup


import { NavLink } from 'react-router-dom';

const schema = yup.object().shape({
    email: yup.string()
        .email('El correo electrónico no es válido')
        .required('El correo electrónico es requerido'),
    password: yup.string()
        .min(8, 'La contraseña debe tener al menos 8 caracteres')
        .matches(/[a-z]/, 'La contraseña debe contener al menos una minúscula')
        .matches(/[A-Z]/, 'La contraseña debe contener al menos una mayúscula')
        .matches(/[0-9]/, 'La contraseña debe contener al menos un número')
        .required('La contraseña es requerida'),
    terms: yup.bool().oneOf([true], 'Debes aceptar los términos y condiciones'),
});

function CrearCuenta() {
    const { usuarios, agregarUsuario } = useContext(GlobalContext);
    const { register, handleSubmit, formState: { errors }, setError, reset } = useForm({
        resolver: yupResolver(schema),
    });

    const [termsAccepted, setTermsAccepted] = useState(false);
    const [showTermsModal, setShowTermsModal] = useState(false); // Estado para controlar la visibilidad del modal

    const [mostrarRegistroPrompt, setMostrarRegistroPrompt] = useState(false); // Estado para controlar la visibilidad del prompt

    const emailExists = (email) => {
        return usuarios.some(user => user.email === email);
    };

    const onSubmit = (data) => {
        if (emailExists(data.email)) {
            setError('email', { type: 'manual', message: 'El correo electrónico ya está registrado' });
            return;
        }

        agregarUsuario({ email: data.email, password: data.password });

        // Limpiar el formulario
        reset();

        // Mostrar mensaje de éxito
        setMostrarRegistroPrompt(true);
    };

    const handleTermsAccepted = () => {
        setTermsAccepted(true); // Actualizar el estado cuando se acepten los términos
        setShowTermsModal(false); // Cerrar el modal
    };

    return (
        <div className="container">
            <div className="left-section">
                <Link to="/">
                    <img src="/img/LogoBlanco.png" alt="Logo" className="logo_cuenta" />
                </Link>
                <img src="/img/CrearCuenta.png" alt="Crear Cuenta" className="center-image" />
            </div>
            <Link to="/">
                <img src="/img/Logo.png" alt="LogoNegrito" className="logo-cuenta-negro" />
            </Link>
            <div className="right-section">
                <div className="crear-cuenta">
                    <h2>Crear Cuenta</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Campo
                            titulo="Correo Electrónico"
                            placeholder="Ingrese su correo"
                            type="email"
                            required
                            {...register('email')}
                            mensajeError={errors.email?.message}
                        />

                        <div className="confirmation-message">
                            Enviaremos un correo de confirmación luego de inscribirse
                        </div>

                        <Campo
                            titulo="Contraseña"
                            placeholder="Ingrese su contraseña"
                            type="password"
                            required
                            {...register('password')}
                            mensajeError={errors.password?.message}
                        />

                        <div className="confirmation-message">
                            Al menos: 8 caracteres, 1 minúscula, 1 número, 1 mayúscula
                        </div>

                        <div className="terms">
                            <input
                                type="checkbox"
                                {...register('terms')}
                                checked={termsAccepted} // Sincroniza con el estado
                                onChange={(e) => setTermsAccepted(e.target.checked)}
                            />
                            <label>
                                Estoy de acuerdo con los <span onClick={() => setShowTermsModal(true)} className="terms-link">términos de servicio</span> de Kame Game
                            </label>
                        </div>
                        {errors.terms && <p className="error-message">{errors.terms.message}</p>}

                        <button className='botonn' type="submit" disabled={!termsAccepted}>Crear Cuenta</button>
                    </form>

                    <div className="hcaptcha">
                        This site is protected by hCaptcha and its Privacy Policy and Terms of Service apply.
                    </div>

                    <div className="login-link">
                        ¿Ya tienes una cuenta? <Link to="/iniciar-sesion">Iniciar sesión</Link>
                    </div>
                </div>
            </div>

            {/* Modal de Términos y Condiciones */}
            {showTermsModal && (
                <TerminosYCondiciones
                    onClose={() => setShowTermsModal(false)}
                    onAccept={handleTermsAccepted}
                />
            )}

            {mostrarRegistroPrompt && (
                <div className="prompt-overlay">
                    <div className="prompt-contenido">
                        <p>Tu cuenta ha sido creada, inicia sesión.</p>
                        <NavLink to="/iniciar-sesion" className="aceptar-boton" onClick={() => setMostrarRegistroPrompt(false)}>Iniciar Sesion</NavLink>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CrearCuenta;
