// src/componentes/CrearCuenta.jsx
import React from 'react';
import { Link } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Campo from '@src//componentes/Campo';
import './CrearCuenta.css';

// Definimos el esquema de validación usando Yup
const schema = yup.object().shape({
    email: yup.string().email('El correo electrónico no es válido').required('El correo electrónico es requerido'),
    password: yup.string().min(6, 'La contraseña debe tener al menos 6 caracteres').required('La contraseña es requerida'),
});

function CrearCuenta() {
    // Configuramos react-hook-form con validación
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    // Función que se llama al enviar el formulario
    const onSubmit = (data) => {
        console.log(data);
        // Aquí puedes manejar el envío de datos, como hacer una solicitud POST
    };

    return (
        <div>
            <Link to="/">
                    <img src="/img/LogoBlanco.png" alt="Logo" className="logo" />
            </Link>

        <div className="crear-cuenta">
            <h2>Crear Cuenta</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Campo
                    titulo="Correo Electrónico"
                    placeholder="Ingrese su correo"
                    type="email"
                    valor=""
                    required
                    actualizarValor={(value) => {
                        register('email').onChange({ target: { value } });
                    }}
                    mensajeError={errors.email?.message}
                />

                <Campo
                    titulo="Contraseña"
                    placeholder="Ingrese su contraseña"
                    type="password"
                    valor=""
                    required
                    actualizarValor={(value) => {
                        register('password').onChange({ target: { value } });
                    }}
                    mensajeError={errors.password?.message}
                />
                
                <button className='botonn' type="submit">Crear Cuenta</button>
            </form>
        </div>
        </div>
    );
}

export default CrearCuenta;
