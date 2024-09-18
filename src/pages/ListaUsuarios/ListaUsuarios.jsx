import React, { useContext, useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Importando los íconos
import { GlobalContext } from '@src/context/GlobalContext';
import './ListaUsuarios.css';

import { urlGetUsuarios, urlDeleteUsuario, urlUpdateUsuario } from '../../utils/constants';

const ListaUsuarios = () => {
    const { eliminarUsuario, editarUsuario } = useContext(GlobalContext);
    const [usuarios, setUsuarios] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [newRole, setNewRole] = useState('');

    useEffect(() => {
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

        fetchUsuariosData();
    }, []);

    // Función para activar el modo de edición
    const activarEdicion = (index, role) => {
        setEditIndex(index);
        setNewRole(role);
    };

    // Función para guardar los cambios del rol
    const guardarRol = (email) => {
        editarUsuario(email, newRole); // Llamada al método del contexto para editar el rol
        setEditIndex(null); // Salir del modo de edición
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
                                        <option value="user">User</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                ) : (
                                    usuario.rol
                                )}
                            </td>
                            <td>
                                {editIndex === index ? (
                                    <button onClick={() => guardarRol(usuario.email)}>Guardar</button>
                                ) : (
                                    <>
                                        <button onClick={() => activarEdicion(index, usuario.role)} className="icono-editar">
                                            <FaEdit /> {/* Ícono de lápiz */}
                                        </button>
                                        <button onClick={() => eliminarUsuario(usuario.email)} className="icono-eliminar">
                                            <FaTrash /> {/* Ícono de basura */}
                                        </button>
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
