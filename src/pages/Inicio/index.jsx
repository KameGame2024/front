// Inicio.js (por ejemplo)

import React, { useContext, useEffect } from 'react';
//import { GlobalContext } from '@src//context/GlobalContext';
import Banner from '@src//componentes/Banner';
import Categoria from '@src//componentes/Categoria';

function Inicio() {


  return (
    <div>
      <Banner />
      <Categoria />
    </div>
  );
}

export default Inicio;
