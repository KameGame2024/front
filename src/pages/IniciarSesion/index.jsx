import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Campo from '@src/componentes/Campo';
import './IniciarSesion.css';
import usuarios from './usuarios.json'; // Importa el JSON de usuarios

function IniciarSesion() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loginError, setLoginError] = useState("");

    // Validación personalizada para la contraseña
    const validatePassword = (password) => {
        const passwordCriteria = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
        return passwordCriteria.test(password) || "La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número.";
    };

    // Validación personalizada para el correo electrónico
    const validateEmail = (email) => {
        const emailCriteria = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailCriteria.test(email) || "El correo electrónico no es válido.";
    };

    // Función que se llama al enviar el formulario
    const onSubmit = (data) => {
        const user = usuarios.find(
            (user) => user.email === data.email && user.password === data.password
        );

        if (user) {
            console.log("Usuario autenticado correctamente:", user);
            setLoginError("");
            // Aquí puedes redirigir al usuario o hacer alguna acción adicional
        } else {
            setLoginError("Correo electrónico o contraseña incorrectos.");
        }
    };

    return (
        <div className="container">
            <div className="left-section">
                <Link to="/">
                    <img src="/img/LogoBlanco.png" alt="Logo" className="logo-iniciosesion" />
                </Link>
                <img src="/img/IniciarSesion.png" alt="Iniciar Sesión" className="center-image" />
            </div>

            <div className="right-section">
                <div className="iniciar-sesion">
                    <h2>Iniciar Sesión</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Campo
                            titulo="Correo Electrónico"
                            placeholder="Ingrese su correo"
                            type="email"
                            required
                            {...register('email', { validate: validateEmail })}
                            mensajeError={errors.email?.message}
                        />

                        <Campo
                            titulo="Contraseña"
                            placeholder="Ingrese su contraseña"
                            type="password"
                            required
                            {...register('password', { validate: validatePassword })}
                            mensajeError={errors.password?.message}
                        />

                        {loginError && <div className="error">{loginError}</div>}

                        <div className="forgot-password">
                            <Link to="/recuperar-contrasena">¿Olvidaste tu contraseña?</Link>
                        </div>

                        <button className='botonn' type="submit">Iniciar Sesión</button>

                        <div className="hcaptcha">
                            This site is protected by hCaptcha and its Privacy Policy and Terms of Service apply.
                        </div>
                    </form>
                    <div className="register-link">
                        ¿Aún no tienes una cuenta? <Link to="/crear-cuenta">Crear cuenta</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default IniciarSesion;