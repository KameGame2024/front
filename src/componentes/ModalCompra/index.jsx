import React from 'react'
import Card from '../Card'
import './ModalCompra.css'

function ModalCompra({ cartas, handleClose }) {
    return (
    <div className="modal-overlay-compra">
        <div className="modal-content-compra">
            <h2>COMPRA REALIZADA</h2>
            <p>Gracias por tu compra.</p>
            <h3>Resumen de la compra:</h3>
            <div className="cartas-container">
                    {cartas.map((carta) => (
                        <Card
                            key={carta.cartaInfo.id}
                            imagen={carta.cartaInfo.imagen}
                            nombre={carta.cartaInfo.nombre}
                            descripcion={carta.cartaInfo.descripcion}
                            ataque={carta.cartaInfo.ataque}
                            defensa={carta.cartaInfo.defensa}
                            precio={carta.cartaInfo.precio}
                            id={carta.cartaInfo.id}
                            tipoDetalle='modal'
                            cantidad={carta.cantidad}
                        />
                    ))}
            </div>
            <button className="aceptar-boton" onClick={handleClose}>Aceptar</button>
        </div>
    </div>
)
}

export default ModalCompra