const urlGetCartas = 'http://localhost:3000/cartas/';
const urlGetPaquetes = 'http://localhost:3000/paquetes/';
const urlGetUsuarios = 'http://localhost:3000/usuarios/';
const urlGetBarajaUsuario = (id) => `${urlGetUsuarios}/${id}/cartas_baraja`;
const urlGetInventario = 'http://localhost:3000/inventario_tiendas/';
const urlGetCartasUsuario = (id) => `${urlGetUsuarios}/${id}/cartas`;
const urlGetColecciones = 'http://localhost:3000/inventario_usuario/';
const urlGetColeccionUsuario = (id) => `${urlGetColecciones}/${id}/coleccion`;

export {
    urlGetCartas,
    urlGetPaquetes,
    urlGetUsuarios,
    urlGetBarajaUsuario,
    urlGetInventario,
    urlGetCartasUsuario,
    urlGetColecciones,
    urlGetColeccionUsuario
};

const urlUpdateCarta = (id) => `http://localhost:3000/cartas/${id}`;
const urlUpdateUsuario = (id) => `http://localhost:3000/usuarios/${id}`;
const urlUpdateBarajaUsuario = (id) => `${urlUpdateUsuario(id)}/cartas_baraja`;
const urlUpdateColeccionUsuario = (id) => `${urlUpdateUsuario(id)}/coleccion`;

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

export {
    urlPostUsuario,
    urlPostCarta,
    urlPostBarajaUsuario,
    urlPostColeccionUsuario,
    urlPostInventario,
    urlPostBaraja
};


