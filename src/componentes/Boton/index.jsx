import "./Boton.css"

function Boton({children }) {
    return (
        <button className="botones">
            {children}
        </button>
    );
}

export default Boton;