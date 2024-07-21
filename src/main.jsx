import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import AppRoutes from './routes.jsx'
import GlobalStyles from '@src/componentes/GlobalStyles'; // Asegúrate de importar correctamente


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalStyles />
    <AppRoutes />
  </React.StrictMode>,
)
