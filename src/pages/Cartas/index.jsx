import React, { useState } from 'react';
import Filtro from '@src//componentes/Filtro';
import Card from '@src//componentes/Card';
import './Cartas.css'; // Añadimos el archivo CSS

const cartas = [
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
];

function Cartas() {
    const [filtros, setFiltros] = useState({
        ataqueMin: '',
        ataqueMax: '',
        defensaMin: '',
        defensaMax: '',
        precioMin: '',
        precioMax: '',
        tipos: {
            monstruo: false,
            hechizo: false,
            trampa: false
        },
        atributos: {
            fuego: false,
            agua: false,
            tierra: false,
            viento: false,
            luz: false,
            oscuridad: false
        }
    });

    const manejarCambioFiltro = (e) => {
        const { name, value, type, checked } = e.target;
        const [category, key] = name.split('.');

        if (type === 'checkbox') {
            setFiltros((prevState) => ({
                ...prevState,
                [category]: {
                    ...prevState[category],
                    [key]: checked
                }
            }));
        } else {
            setFiltros((prevState) => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const filtrarCartas = (cartas) => {
        return cartas.filter(carta => {
            const cumpleAtaque = (!filtros.ataqueMin || carta.ataque >= filtros.ataqueMin) &&
                                 (!filtros.ataqueMax || carta.ataque <= filtros.ataqueMax);
            const cumpleDefensa = (!filtros.defensaMin || carta.defensa >= filtros.defensaMin) &&
                                  (!filtros.defensaMax || carta.defensa <= filtros.defensaMax);
            const cumplePrecio = (!filtros.precioMin || carta.precio >= filtros.precioMin) &&
                                 (!filtros.precioMax || carta.precio <= filtros.precioMax);
            const cumpleTipo = !Object.values(filtros.tipos).includes(true) || Object.keys(filtros.tipos).some(tipo => filtros.tipos[tipo] && carta.tipo.toLowerCase() === tipo);
            const cumpleAtributo = !Object.values(filtros.atributos).includes(true) || Object.keys(filtros.atributos).some(atributo => filtros.atributos[atributo] && carta.atributo.toLowerCase() === atributo);

            return cumpleAtaque && cumpleDefensa && cumplePrecio && cumpleTipo && cumpleAtributo;
        });
    };

    const cartasFiltradas = filtrarCartas(cartas);

    return (
        <div className='fondo'>
            <h1>CARTAS</h1>
            <div className="filtrar-cartas">
                <div className="filtro-container">
                    <Filtro categoria="cartas" filtros={filtros} manejarCambioFiltro={manejarCambioFiltro} />
                </div>
                <div className="cartas-container">
                    {cartasFiltradas.map((carta) => (
                        <Card
                            key={carta.id}
                            imagen={carta.imagen}
                            nombre={carta.nombre}
                            descripcion={carta.descripcion}
                            ataque={carta.ataque}
                            defensa={carta.defensa}
                            precio={carta.precio}
                            tipo={carta.tipo}
                            atributo={carta.atributo}
                            id={carta.id}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Cartas;
