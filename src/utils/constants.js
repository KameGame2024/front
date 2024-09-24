const urlGetCartas = 'http://localhost:3000/cartas/';
const urlGetPaquetes = 'http://localhost:3000/paquetes/';
const urlGetUsuarios = 'http://localhost:3000/usuarios/';
const urlGetBarajaUsuario = (id) => `${urlGetUsuarios}/${id}/cartas_baraja`;
const urlGetInventario = 'http://localhost:3000/inventario_tiendas/';
const urlGetCartasEnInventario =  `${urlGetCartas}inventario/`;
const urlGetPaquetesEnInventario = `${urlGetPaquetes}inventario/`;
const urlGetCartaInventario = (id) => `${urlGetInventario}carta/${id}`;
const urlGetPaqueteInventario = (id) => `${urlGetInventario}paquete/${id}`;
const urlGetCartasUsuario = (id) => `${urlGetUsuarios}${id}/cartas`;
const urlGetColecciones = 'http://localhost:3000/inventario_usuario/';
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
    urlGetColeccionUsuario
};

const urlUpdateCarta = (id) => `http://localhost:3000/cartas/${id}`;
const urlUpdateUsuario = (id) => `http://localhost:3000/usuarios/${id}`;
const urlUpdateBarajaUsuario = (id) => `http://localhost:3000/cartas_baraja/${id}`;
const urlUpdateColeccionUsuario = (id) => `http://localhost:3000/inventario_usuario/${id}`;

export {
    urlUpdateCarta,
    urlUpdateUsuario,
    urlUpdateBarajaUsuario,
    urlUpdateColeccionUsuario
};

const urlDeleteUsuario = (id) => `http://localhost:3000/usuarios/${id}`;

export {
    urlDeleteUsuario
};

const urlPostUsuario = 'http://localhost:3000/usuarios/';
const urlPostCarta = 'http://localhost:3000/cartas/';
const urlPostBarajaUsuario = (id) => `${urlPostUsuario}${id}/cartas_baraja`;
const urlPostColeccionUsuario = (id) => `${urlPostUsuario}${id}/coleccion`;
const urlPostInventario = 'http://localhost:3000/inventario_tiendas/';
const urlPostBaraja = 'http://localhost:3000/barajas/';
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


