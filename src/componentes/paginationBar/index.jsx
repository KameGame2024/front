import React from 'react'
import './PaginationBar.css'

import { RiArrowLeftSLine } from "react-icons/ri";
import { RiArrowRightSLine } from "react-icons/ri";

function PaginationBar({ paginasTotales, handlePaginate, handlePrevPage, handleNextPage, paginaActual }) {
  
  // Los numeros de las paginas será un array de 10, siempre mostrando la primera, la actual, las cuatro anteriores y las cuatro siguientes
  const paginas = []
  for (let i = 1; i <= paginasTotales; i++) {

    if (paginasTotales > 10) {
        // Si la página actual es menor o igual a 4, mostramos las primeras 10 páginas
      if (paginaActual <= 5) {
        if (i <= 10 || i === paginasTotales) {
          paginas.push(i)
        }
      }

      //Si la página actual es mayor a la cantidad total de páginas menos 4, mostramos las últimas 10 páginas
      else if (paginaActual > paginasTotales - 5) {
        if (i > paginasTotales - 10 || i === 1) {
          paginas.push(i)
        }
      }

      // Si la página actual es mayor a 4, mostramos las 4 anteriores y las 4 siguientes
      else {
        if (i >= paginaActual - 4 && i <= paginaActual + 4 || i === 1  || i === paginasTotales) {
          paginas.push(i)
        }
      }
    } else {
      paginas.push(i)
    }
  }
  
  return (
    <nav className='paginationContainer'>
      <ul className="pagination">
        <button onClick={handlePrevPage} disabled={paginaActual === 1}>
          <RiArrowLeftSLine />
        </button>
        {/*Una lista de */}
        {paginas.map((pagina, index) => (
          <li key={index} >
            <button
            className={pagina === paginaActual ? 'active' : ''} 
            onClick={() => handlePaginate(pagina)}>{pagina}</button>
          </li>
        ))}
        <button onClick={handleNextPage} disabled={paginaActual === paginasTotales}>
          <RiArrowRightSLine />
        </button>
      </ul>
    </nav>
  )
}

export default PaginationBar