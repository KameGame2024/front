// src/pages/AdminPage.jsx
import React from 'react';
import Banner from '@src//componentes/Banner';
import CategoriaAdmin from '@src//componentes/CategoriaAdmin';
import './Admin.css';

const Admin = () => {
    return (
        <div className='admin_panel'>
          <CategoriaAdmin />
        </div>
      );
};

export default Admin;
