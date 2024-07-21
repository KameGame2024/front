import React from "react";
import styles from "./NotFound.module.css"; // Importa los estilos desde el módulo CSS

function NotFound() {
  return (
    <section className={styles.container}>
      <img src="/img/notFound.png" alt="Not Found" className={styles.image} />
      <p className={styles.text_error}>Página no encontrada</p>
    </section>
  );
}

export default NotFound;
