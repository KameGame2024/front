import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Campo from '@src/componentes/Campo';
import './CrearCuenta.css';

// Esquema de validación usando Yup
const schema = yup.object().shape({
    email: yup.string().email('El correo electrónico no es válido').required('El correo electrónico es requerido'),
    password: yup.string().min(8, 'La contraseña debe tener al menos 8 caracteres').required('La contraseña es requerida'),
    terms: yup.bool().oneOf([true], 'Debes aceptar los términos y condiciones'),
});

function CrearCuenta() {
    // Configuramos react-hook-form con validación
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const [termsAccepted, setTermsAccepted] = useState(false);

    // Función que se llama al enviar el formulario
    const onSubmit = (data) => {
        console.log(data);
        // Aquí puedes manejar el envío de datos, como hacer una solicitud POST
    };

    return (
        <div className="container">
            <div className="left-section">
                <Link to="/">
                    <img src="/img/LogoBlanco.png" alt="Logo" className="logo_cuenta" />
                </Link>
                <img src="/img/CrearCuenta.png" alt="Crear Cuenta" className="center-image" />
            </div>

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
                                onChange={(e) => setTermsAccepted(e.target.checked)}
                            />
                            <label>
                                Estoy de acuerdo con los <Link to="/terminos">términos de servicio</Link> de Kame Game
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
        </div>
    );
}

export default CrearCuenta;
