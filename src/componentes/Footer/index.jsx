import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
    return (
        <footer className='footer'>
            <h1>Somos Kame Game</h1>
            <div className="text">
                <p>Hemos aceptado el desafío de ser la mejor tienda de cartas online, disponemos de una gran colección de

                    cartas y paquetes que podrás adquirir al mejor precio.</p>

                <p>
                    ¿Ansioso de probar tus cartas? con las cartas que adquieras podrás armar tu mazo y probarlas con

                    nuestro bot especial de combate. Anímate y comienza tu colección!</p>
            </div>
            <Link to="/">
                    <img src="/img/LogoBlanco.png" alt="Logo" className="logo" />
            </Link>
            <div className='redes'>
                <a href='https://www.facebook.com/anna.ospinabedoya'>
                    <img src="/img/icons/Facebook.png" alt='Facebook' />
                </a>
                <a href='https://www.instagram.com/annaseanna/'>
                    <img src="/img/icons/Instagram.png" alt='Instagram' />
                </a>
            </div>
            <hr className="separator" />
            <div className='autor'>
                <strong>2024 Kame Game - All Rights Reserved</strong>
            </div>
        </footer>
    );
}

export default Footer;
