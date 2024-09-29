import React, { useState, useContext } from 'react';
import { Link } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Campo from '@src/componentes/Campo';
import './IniciarSesion.css';
import AuthContext from "@src/context/AuthContext";

import { urlLogin } from '../../utils/constants';
import { jwtDecode } from 'jwt-decode';

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
    const { login } = useContext(AuthContext);

    const fetchReister = async (data) => {

        try {
            const response = await fetch(urlLogin, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (response === 201) {
                const data = await response.json();
                localStorage.setItem('token', data.token);
                const decodeToken = jwtDecode(data.token);
                return decodeToken;
            } else if (response == 400) {
                setLoginError("Correo electrónico o contraseña incorrectos.");
            }
            else {
                console.error('Error al registrar la cuenta:', response.statusText);
            }
        } catch (error) {
            console.error('Error al registrar la cuenta:', error);
        }
    }

    const onSubmit = (data) => {

        const userData = {
            email: data.email,
            contrasena: data.password
        };
        const user = fetchReister(userData);

        if (user) {
            console.log("Usuario autenticado correctamente:", user.email);
            setLoginError("");
            login(user); // Llama a la función login con el rol del usuario
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
            <Link to="/">
                <img src="/img/Logo.png" alt="Logo" className="logo-iniciosesion-negro" />
            </Link>
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
