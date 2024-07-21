import Header from '@src/componentes/Header';
import Footer from '@src/componentes/Footer';
import { Outlet } from 'react-router-dom';
import './PaginaBase.css';


function PaginaBase(){
    return(
        <main className="main-container">
            <Header/>
                <Outlet/>
            <Footer/>
        </main>
    )
}

export default PaginaBase