// src/paginas/Detalle.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Detalle.css';

const detalles = {
    carta: [
        {
            "id": "1",
            "imagen": "https://images.ygoprodeck.com/images/cards/91231901.jpg",
            "nombre": "Dragón de Fuego",
            "descripcion": "Un dragón feroz con poderosos ataques de fuego.",
            "ataque": 2500,
            "defensa": 2000,
            "precio": 1200,
            "tipo": "Monstruo",
            "atributo": "Fuego"
        },
        {
            "id": "2",
            "imagen": "https://images.ygoprodeck.com/images/cards/73262676.jpg",
            "nombre": "Hechizo de Curación",
            "descripcion": "Un hechizo que restaura la vida de las cartas en el campo.",
            "ataque": 0,
            "defensa": 0,
            "precio": 800,
            "tipo": "Hechizo",
            "atributo": "Luz"
        },
        {
            "id": "3",
            "imagen": "https://images.ygoprodeck.com/images/cards/98319530.jpg",
            "nombre": "Trampa de Reflejo",
            "descripcion": "Una trampa que refleja el ataque del enemigo.",
            "ataque": 0,
            "defensa": 0,
            "precio": 600,
            "tipo": "Trampa",
            "atributo": "Agua"
        },
        {
            "id": "4",
            "imagen": "https://images.ygoprodeck.com/images/cards/37478723.jpg",
            "nombre": "Guerrero del Viento",
            "descripcion": "Un guerrero ágil con ataques rápidos y precisos.",
            "ataque": 1800,
            "defensa": 1500,
            "precio": 1000,
            "tipo": "Monstruo",
            "atributo": "Viento"
        },
        {
            "id": "5",
            "imagen": "https://images.ygoprodeck.com/images/cards/64867422.jpg",
            "nombre": "Escudo de Luz",
            "descripcion": "Un escudo mágico que aumenta la defensa de las cartas aliadas.",
            "ataque": 0,
            "defensa": 3000,
            "precio": 1500,
            "tipo": "Hechizo",
            "atributo": "Luz"
        },
        {
            "id": "6",
            "imagen": "https://images.ygoprodeck.com/images/cards/90861137.jpg",
            "nombre": "Cadenas de Oscuridad",
            "descripcion": "Una trampa que inmoviliza a los enemigos y reduce su ataque.",
            "ataque": 0,
            "defensa": 0,
            "precio": 700,
            "tipo": "Trampa",
            "atributo": "Oscuridad"
        },
        {
            "id": "7",
            "imagen": "https://images.ygoprodeck.com/images/cards/86988864.jpg",
            "nombre": "Golem de Tierra",
            "descripcion": "Un golem sólido con alta defensa y resistencia.",
            "ataque": 1200,
            "defensa": 2500,
            "precio": 1100,
            "tipo": "Monstruo",
            "atributo": "Tierra"
        },
        {
            "id": "8",
            "imagen": "https://images.ygoprodeck.com/images/cards/11714098.jpg",
            "nombre": "Tormenta de Arena",
            "descripcion": "Un hechizo que desorienta a los enemigos y reduce su precisión.",
            "ataque": 0,
            "defensa": 0,
            "precio": 900,
            "tipo": "Hechizo",
            "atributo": "Tierra"
        }
    ],
    paquete: [
        {
            "id": "1",
            "nombre": "Paquete 1",
            "set": "Maze of Milenia",
            "precio": 5000,
            "cantidad": 9,
            "descripcion": "Un paquete lleno de cartas poderosas de la serie Maze of Milenia.",
            "imagen": "/img/paquete.png"
        },
        {
            "id": "2",
            "nombre": "Paquete 2",
            "set": "Origins",
            "precio": 6000,
            "cantidad": 9,
            "descripcion": "Paquete de cartas clásicas que han definido el juego.",
            "imagen": "/img/paquete.png"
        },
        {
            "id": "3",
            "nombre": "Paquete 3",
            "set": "Genesis",
            "precio": 7000,
            "cantidad": 9,
            "descripcion": "Paquete de cartas que marca el inicio de una nueva era.",
            "imagen": "/img/paquete.png"
        }
    ]
};


function Detalle({ agregarAlCarrito }) {
    const { tipo, id } = useParams();
    const [detalle, setDetalle] = useState(null);
    const [cantidad, setCantidad] = useState(1);

    useEffect(() => {
        if (tipo && id) {
            const encontrado = detalles[tipo]?.find(item => item.id === id);
            setDetalle(encontrado);
        }
    }, [tipo, id]);

    const incrementarCantidad = () => setCantidad(prev => prev + 1);
    const decrementarCantidad = () => setCantidad(prev => (prev > 1 ? prev - 1 : 1));

    const manejarAgregarAlCarrito = () => {
        if (detalle) {
            alert('Producto agregado con éxito al carrito');
        }
    };

    if (!detalle) return <p>Cargando...</p>;

    return (
        <div className={`detalle-${tipo}`}>
            <img src={detalle.imagen} alt={detalle.nombre} className="detalle-imagen" />
            <div className="detalle-info">
                <h1 className="detalle-titulo">{detalle.nombre}</h1>
                <h2 className="descripcion_t">Descripción</h2>
                <p>{detalle.descripcion}</p>
                {tipo === 'carta' && (
                    <>
                        <p><strong>Ataque:</strong> {detalle.ataque}</p>
                        <p><strong>Defensa:</strong> {detalle.defensa}</p>
                        <p><strong>Tipo:</strong> {detalle.tipo}</p>
                        <p><strong>Atributo:</strong> {detalle.atributo}</p>
                    </>
                )}
                {tipo === 'paquete' && (
                    <>
                        <p><strong>Set:</strong> {detalle.set}</p>
                        <p><strong>Cantidad:</strong> {detalle.cantidad}</p>
                    </>
                )}
                <h1 className="detalle-precio"><strong>$ {detalle.precio}</strong></h1>
                <div className="detalle-cantidad">
                    <button className="detalle_masmenos" onClick={decrementarCantidad}>-</button>
                    <span className="detalle_cant" > {cantidad}</span>
                    <button className="detalle_masmenos" onClick={incrementarCantidad}>+</button>
                    <button className="detalle-agregar" onClick={manejarAgregarAlCarrito}>Agregar al carrito</button>
                </div>
            </div>
        </div>
    );
}

export default Detalle;