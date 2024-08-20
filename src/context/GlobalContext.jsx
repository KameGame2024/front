import React, { createContext, useState, useEffect } from 'react';

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
    const [cartas, setCartas] = useState([]);
    const [cartasSeleccionadas, setCartasSeleccionadas] = useState([]);
    const [paquetes, setPaquetes] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
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

                setCartas(cartasData);
                setPaquetes(paquetesData);
                setUsuarios(usuariosData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const agregarProductoAlCarrito = (producto) => {
        setProductosEnCarrito(prevProductos => {
            const productoExistente = prevProductos.find(p => p.id === producto.id);
            if (productoExistente) {
                // Actualiza la cantidad si el producto ya está en el carrito
                return prevProductos.map(p =>
                    p.id === producto.id ? { ...p, cantidad: p.cantidad + producto.cantidad } : p
                );
            }
            // Agrega el producto al carrito con la cantidad inicial
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

    const seleccionarCarta = (carta) => {
        setCartasSeleccionadas(prevCartas => {
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
        <GlobalContext.Provider value={{ cartas, cartasSeleccionadas, paquetes, usuarios, productosEnCarrito, agregarProductoAlCarrito, incrementarCantidad, decrementarCantidad, eliminarProducto, seleccionarCarta, busqueda, actualizarBusqueda }}>
            {children}
        </GlobalContext.Provider>
    );
};

export { GlobalContext, GlobalProvider };
