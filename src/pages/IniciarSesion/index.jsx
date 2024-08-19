import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Campo from '@src/componentes/Campo';
import './IniciarSesion.css';
import usuarios from './usuarios.json'; // Importa el JSON de usuarios

// Esquema de validación usando Yup
const schema = yup.object().shape({
    email: yup.string()
        .email('El correo electrónico no es válido')
        .required('El correo electrónico es requerido'),
    password: yup.string()
        .min(8, 'La contraseña debe tener al menos 8 caracteres')
        .matches(/[a-z]/, 'La contraseña debe contener al menos una letra minúscula')
        .matches(/[A-Z]/, 'La contraseña debe contener al menos una letra mayúscula')
        .matches(/[0-9]/, 'La contraseña debe contener al menos un número')
        .required('La contraseña es requerida'),
});

function IniciarSesion() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });
    const [loginError, setLoginError] = useState("");

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
                            {...register('email')}
                            mensajeError={errors.email?.message}
                        />

                        <Campo
                            titulo="Contraseña"
                            placeholder="Ingrese su contraseña"
                            type="password"
                            required
                            {...register('password')}
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
