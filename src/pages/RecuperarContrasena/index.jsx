import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Campo from '@src/componentes/Campo';
import './RecuperarContrasena.css';
import { GlobalContext } from '@src/context/GlobalContext';

// Esquema de validación usando Yup
const schema = yup.object().shape({
    email: yup.string()
        .email('El correo electrónico no es válido')
        .required('El correo electrónico es requerido'),
});

function RecuperarContrasena() {
    const { usuarios } = useContext(GlobalContext);
    const { register, handleSubmit, formState: { errors }, setError } = useForm({
        resolver: yupResolver(schema),
    });

    const [mostrarPrompt, setMostrarPrompt] = useState(false); // Estado para controlar la visibilidad del prompt

    const onSubmit = (data) => {
        const user = usuarios.find((user) => user.email === data.email);

        if (user) {
            setMostrarPrompt(true); // Mostrar el prompt cuando se envíe correctamente
        } else {
            setError("email", {
                type: "manual",
                message: "Correo electrónico incorrecto.",
            });
        }
    };

    return (
        <div className="recuperar-contrasena-container">
            <div className="left-section">
                <Link to="/">
                    <img src="/img/LogoBlanco.png" alt="Logo" className="logo-recuperar-contrasena" />
                </Link>
                <img src="/img/RecuperarContrasena.png" alt="Recuperar Contraseña" className="center-image" />
            </div>
            <Link to="/">
                <img src="/img/Logo.png" alt="LogoNegrito" className="logo-recuperar-contrasena-negro" />
            </Link>
            <div className="right-section">
                <div className="recuperar-contrasena">
                    <h2>Recuperar Contraseña</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Campo
                            titulo="Correo Electrónico"
                            placeholder="Ingrese su correo electrónico"
                            type="email"
                            required
                            {...register('email')}
                            mensajeError={errors.email?.message}
                        />
                        <p>Introduce tu correo electrónico para recibir un enlace de recuperación.</p>

                        <button className='botonn' type="submit">Enviar enlace de recuperación</button>

                        <div className="login-link">
                            <Link to="/iniciar-sesion">Regresar a Iniciar Sesión</Link>
                        </div>
                    </form>
                </div>
            </div>

            {mostrarPrompt && (
                <div className="prompt-overlay">
                    <div className="prompt-contenido">
                        <p>El correo de verificación ha sido enviado a tu correo electrónico.</p>
                        <button className="aceptar-boton" onClick={() => setMostrarPrompt(false)}>Aceptar</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default RecuperarContrasena;
