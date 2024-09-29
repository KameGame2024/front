// Leer la variable de entorno REACT_APP_API_URL
const url = import.meta.env.VITE_APP_API_URL;

const urlGetCartas = `${url}/cartas/`;
const urlGetPaquetes = `${url}/paquetes/`;
const urlGetUsuarios = `${url}/usuarios/`;  
const urlGetBarajaUsuario = (id) => `${urlGetUsuarios}${id}/cartas_baraja`;
const urlGetBarajas = `${url}/barajas/`;
const urlGetCartaBarajaUsuario = (id_usuario, id_carta) => `${urlGetBarajas}${id_usuario}/cartas_baraja/${id_carta}`;
const urlGetInventario = `${url}/inventario_tiendas/`;
const urlGetCartasEnInventario =  `${urlGetCartas}inventario/`;
const urlGetPaquetesEnInventario = `${urlGetPaquetes}inventario/`;
const urlGetCartaInventario = (id) => `${urlGetInventario}carta/${id}`;
const urlGetPaqueteInventario = (id) => `${urlGetInventario}paquete/${id}`;
const urlGetCartasUsuario = (id) => `${urlGetUsuarios}${id}/cartas`;
const urlGetColecciones = `${url}/inventario_usuario/`;
const urlGetColeccionUsuario = (id) => `${urlGetColecciones}${id}/coleccion`;

export {
    urlGetCartas,
    urlGetPaquetes,
    urlGetUsuarios,
    urlGetBarajaUsuario,
    urlGetInventario,
    urlGetCartasEnInventario,
    urlGetPaquetesEnInventario,
    urlGetCartaInventario,
    urlGetPaqueteInventario,
    urlGetCartasUsuario,
    urlGetColecciones,
    urlGetColeccionUsuario,
    urlGetCartaBarajaUsuario
};

const urlUpdateCarta = (id) => `${url}/cartas/${id}`;
const urlUpdateUsuario = (id) => `${url}/usuarios/${id}`;
const urlUpdateBarajaUsuario = (id) => `${url}/cartas_baraja/${id}`;
const urlUpdateColeccionUsuario = (id) => `${url}/inventario_usuario/${id}`;

export {
    urlUpdateCarta,
    urlUpdateUsuario,
    urlUpdateBarajaUsuario,
    urlUpdateColeccionUsuario
};

const urlDeleteUsuario = (id) => `${url}/usuarios/${id}`;

export {
    urlDeleteUsuario
};

const urlPostUsuario = `${url}/usuarios/`;
const urlPostCarta = `${url}/cartas/`;
const urlPostBarajaUsuario = (id) => `${urlPostUsuario}${id}/cartas_baraja`;
const urlPostColeccionUsuario = (id) => `${urlPostUsuario}${id}/coleccion`;
const urlPostInventario = `${url}/inventario_tiendas/`;
const urlPostBaraja = `${url}/barajas/`;
const urlAddCartaInventario = `${urlPostInventario}carta/add`;
const urlAddPaqueteInventario = `${urlPostInventario}paquete/add`;
const urlCompra = `${urlPostInventario}compra/`;

export {
    urlPostUsuario,
    urlPostCarta,
    urlPostBarajaUsuario,
    urlPostColeccionUsuario,
    urlPostInventario,
    urlPostBaraja,
    urlAddCartaInventario,
    urlAddPaqueteInventario,
    urlCompra
};


