import React, { createContext, useState, useEffect } from 'react';

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
    const [cartas, setCartas] = useState([]);
    const [cartasAdmin, setCartasAdmin] = useState([]);
    const [cartasSeleccionadas, setCartasSeleccionadas] = useState([]);
    const [paquetes, setPaquetes] = useState([]);
    const [usuarios, setUsuario] = useState([]);
    const [productosEnCarrito, setProductosEnCarrito] = useState([]);
    const [busqueda, setBusqueda] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [cartasResponse, paquetesResponse, usuariosResponse] = await Promise.all([
                    fetch('https://my-json-server.typicode.com/hinarasm12/ApiCard/cartas'),
                    fetch('https://my-json-server.typicode.com/hinarasm12/ApiPack/paquetes'),
                    fetch('https://my-json-server.typicode.com/hinarasm12/ApiUsers/usuarios'),
                ]);

                const cartasData = await cartasResponse.json();
                const paquetesData = await paquetesResponse.json();
                const usuariosData = await usuariosResponse.json();

                setCartasAdmin(cartasData);
                setPaquetes(paquetesData);
                setUsuario(usuariosData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const agregarCarta = (nuevaCarta) => {
        setCartas(prevCartas => {
            const cartaExistente = prevCartas.find(c => c.id === nuevaCarta.id);
            if (cartaExistente) {
                return prevCartas.map(c =>
                    c.id === nuevaCarta.id ? { ...c, ...nuevaCarta } : c
                );
            }
            return [...prevCartas, nuevaCarta];
        });
    };

    const eliminarCarta = (id) => {
        setCartas(prevCartas => prevCartas.filter(carta => carta.id !== id));
    };

    const agregarPaquete = (nuevoPaquete) => {
        setPaquetes(prevPaquetes => {
            const paqueteExistente = prevPaquetes.find(p => p.id === nuevoPaquete.id);
            if (paqueteExistente) {
                return prevPaquetes.map(p =>
                    p.id === nuevoPaquete.id ? { ...p, ...nuevoPaquete } : p
                );
            }
            return [...prevPaquetes, nuevoPaquete];
        });
    };

    const eliminarPaquete = (id) => {
        setPaquetes(prevPaquetes => prevPaquetes.filter(paquete => paquete.id !== id));
    };

    const agregarUsuario = (nuevoUsuario) => {
        setUsuario(prevUsuarios => {
            const usuarioExistente = prevUsuarios.find(u => u.email === nuevoUsuario.email);
            if (usuarioExistente) {
                return prevUsuarios.map(u =>
                    u.email === nuevoUsuario.email ? { ...u, ...nuevoUsuario } : u
                );
            }
            return [...prevUsuarios, nuevoUsuario];
        });
    };

    const eliminarUsuario = (email) => {
        setUsuario(prevUsuarios => prevUsuarios.filter(usuario => usuario.email !== email));
    };

    const agregarProductoAlCarrito = (producto) => {
        setProductosEnCarrito(prevProductos => {
            const productoExistente = prevProductos.find(p => p.id === producto.id);
            if (productoExistente) {
                return prevProductos.map(p =>
                    p.id === producto.id ? { ...p, cantidad: p.cantidad + producto.cantidad } : p
                );
            }
            return [...prevProductos, producto];
        });
    };

    const incrementarCantidad = (id) => {
        setProductosEnCarrito(prevProductos => prevProductos.map(producto =>
            producto.id === id ? { ...producto, cantidad: producto.cantidad + 1 } : producto
        ));
    };

    const decrementarCantidad = (id) => {
        setProductosEnCarrito(prevProductos => prevProductos.map(producto =>
            producto.id === id && producto.cantidad > 1 ? { ...producto, cantidad: producto.cantidad - 1 } : producto
        ));
    };

    const eliminarProducto = (id) => {
        setProductosEnCarrito(prevProductos => prevProductos.filter(producto => producto.id !== id));
    };

    const vaciarCarrito = () => {
        setProductosEnCarrito([]);
    };

    const seleccionarCarta = (carta) => {
        setCartasSeleccionadas(prevCartas => {
            const cartaExistente = prevCartas.find(c => c.id === carta.id);
            if (cartaExistente) {
                return prevCartas.filter(c => c.id !== carta.id); // Deselecciona la carta si ya está en la lista
            }
            return [...prevCartas, carta]; // Agrega la carta a la lista
        });
    };

    const habilitarCarta = (carta) => {
        setCartas(prevCartas => {
            const cartaExistente = prevCartas.find(c => c.id === carta.id);
            if (cartaExistente) {
                return prevCartas.filter(c => c.id !== carta.id); // Deselecciona la carta si ya está en la lista
            }
            return [...prevCartas, carta]; // Agrega la carta a la lista
        });
    };

    const actualizarBusqueda = (query) => {
        setBusqueda(query);
    };

    return (
        <GlobalContext.Provider value={{
            cartas,
            cartasAdmin,
            cartasSeleccionadas,
            paquetes,
            usuarios,
            productosEnCarrito,
            agregarCarta,
            eliminarCarta,
            agregarPaquete,
            eliminarPaquete,
            agregarUsuario,
            eliminarUsuario,
            agregarProductoAlCarrito,
            incrementarCantidad,
            decrementarCantidad,
            eliminarProducto,
            vaciarCarrito,
            seleccionarCarta,
            habilitarCarta,
            busqueda,
            actualizarBusqueda
        }}>
            {children}
        </GlobalContext.Provider>
    );
};

export { GlobalContext, GlobalProvider };
