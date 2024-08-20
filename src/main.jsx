import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppRoutes from './routes.jsx';
import GlobalStyles from '@src/componentes/GlobalStyles';
import { GlobalProvider } from '@src/context/GlobalContext'; // Asegúrate de importar correctamente el GlobalProvider

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalStyles />
    <GlobalProvider>
      <AppRoutes />
    </GlobalProvider>
  </React.StrictMode>,
);
