import React from "react";
import "./NotFound.css"; // Importa los estilos desde el módulo CSS

function NotFound() {
  return (
    <section className="container_2">
      <img src="/img/NotFound.png" alt="Not Found" className="image" />
      <p className="text_error">Página no encontrada</p>
    </section>
  );
}

export default NotFound;
