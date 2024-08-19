import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Campo from '@src/componentes/Campo';
import './RecuperarContrasena.css';
import usuarios from '@src/data/usuarios.json'; // Importa el JSON de usuarios

// Esquema de validación usando Yup
const schema = yup.object().shape({
    email: yup.string()
        .email('El correo electrónico no es válido')
        .required('El correo electrónico es requerido'),
});

function RecuperarContrasena() {
    // Configuramos react-hook-form con validación
    const { register, handleSubmit, formState: { errors }, setError } = useForm({
        resolver: yupResolver(schema),
    });

    // Función que se llama al enviar el formulario
    const onSubmit = (data) => {
        const user = usuarios.find((user) => user.email === data.email);

        if (user) {
            console.log("Se ha enviado el correo con la recuperación de contraseña a: ", user.email);
            // Aquí puedes redirigir al usuario o hacer alguna acción adicional
        } else {
            // Si el correo no existe, mostramos un error en el campo "email"
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
        </div>
    );
}

export default RecuperarContrasena;
