import React, { useContext, useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Importando los íconos
import { GlobalContext } from '@src/context/GlobalContext';
import './ListaUsuarios.css';

import { urlGetUsuarios, urlDeleteUsuario, urlUpdateUsuario } from '../../utils/constants';

const ListaUsuarios = () => {

    const [usuarios, setUsuarios] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [newRole, setNewRole] = useState('usuario');


    // Fetch users when the component mounts
    const fetchUsuariosData = async () => {
        try {
            const response = await fetch(urlGetUsuarios);
            const data = await response.json();
            setUsuarios(data);
        }
        catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        

        fetchUsuariosData();
    }, []);

    // Función para activar el modo de edición
    const activarEdicion = (index, role) => {
        setEditIndex(index);
        setNewRole(role);
    };

    // Función para guardar los cambios del rol
    const guardarRol = (usuarioId) => {
        // editarUsuario(email, newRole); // Llamada al método del contexto para editar el rol
        // usar fetch para enviar la petición al servidor de editar el rol

        let UpdateData = { rol: newRole };
        console.log(UpdateData);

        if (UpdateData.rol === undefined) {
            UpdateData = { rol: 'usuario' };
        }
        fetch(urlUpdateUsuario(usuarioId), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(UpdateData),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                fetchUsuariosData();
            })
            .catch((error) => {
                console.error('Error:', error);
            });

        setEditIndex(null); // Salir del modo de edición

    };

    // Función para eliminar un usuario
    const eliminarUsuario = (usuarioId) => {
        // eliminarUsuario(usuarioId); // Llamada al método del contexto para eliminar el usuario
        // usar fetch para enviar la petición al servidor de eliminar el usuario
        try {
            fetch(urlDeleteUsuario(usuarioId), {
                method: 'DELETE',
            })
            
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="lista-usuarios-container">
            <h2>Lista de Usuarios</h2>
            <table className="usuarios-tabla">
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>Rol</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((usuario, index) => (
                        <tr key={index}>
                            <td>{usuario.email}</td>
                            <td>
                                {editIndex === index ? (
                                    <select
                                        value={newRole}
                                        onChange={(e) => setNewRole(e.target.value)}
                                        className="select-rol"
                                    >
                                        <option value="usuario">Usuario</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                ) : (
                                    usuario.rol
                                )}
                            </td>
                            <td>
                                {editIndex === index ? (
                                    <button onClick={() => guardarRol(usuario.id)}>Guardar</button>
                                ) : (
                                    <>
                                        <button onClick={() => activarEdicion(index, usuario.role)} className="icono-editar">
                                            <FaEdit /> {/* Ícono de lápiz */}
                                        </button>
                                        {/* <button onClick={() => eliminarUsuario(usuario.id)} className="icono-eliminar">
                                            <FaTrash />}
                                        </button> */}
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListaUsuarios;
