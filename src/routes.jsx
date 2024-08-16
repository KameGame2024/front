
import PaginaBase from "./pages/PaginaBase";
import Inicio from "./pages/Inicio";
import NotFound from "./pages/NotFound";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CrearCuenta from "./pages/CrearCuenta";
import Cartas from "./pages/Cartas";
import Paquetes from "./pages/Paquetes";
import Carrito from "./pages/Carrito";
import Detalle from "./pages/Detalle";
import IniciarSesion from "./pages/IniciarSesion";
import RecuperarContrasena from "./pages/RecuperarContrasena";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PaginaBase />}>
          <Route index element={<Inicio />}></Route>
          <Route path="cartas" element={<Cartas />}></Route>
          <Route path="paquetes" element={<Paquetes />}></Route>
          <Route path="carrito" element={<Carrito />}></Route>
          <Route path="/detalle/:tipo/:id" element={<Detalle />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Route>
        <Route path="crear-cuenta" element={<CrearCuenta />}></Route>
        <Route path="iniciar-sesion" element={<IniciarSesion />}></Route>
        <Route path="recuperar-contrasena" element={<RecuperarContrasena />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;