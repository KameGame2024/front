import React, { useContext, useState } from 'react';
import { GlobalContext } from '@src/context/GlobalContext';
import './ListaUsuarios.css'; // Puedes agregar estilos personalizados en este archivo

const ListaUsuarios = () => {
    const { usuarios, eliminarUsuario, editarUsuario } = useContext(GlobalContext);
    const [editIndex, setEditIndex] = useState(null);
    const [newRole, setNewRole] = useState('');

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
                                    <input
                                        type="text"
                                        value={newRole}
                                        onChange={(e) => setNewRole(e.target.value)}
                                    />
                                ) : (
                                    usuario.role
                                )}
                            </td>
                            <td>
                                {editIndex === index ? (
                                    <button onClick={() => guardarRol(usuario.email)}>Guardar</button>
                                ) : (
                                    <>
                                        <button onClick={() => activarEdicion(index, usuario.role)}>
                                            <img src="/icons/edit.png" alt="Editar" className="icono-editar" />
                                        </button>
                                        <button onClick={() => eliminarUsuario(usuario.email)}>
                                            <img src="/icons/delete.png" alt="Eliminar" className="icono-eliminar" />
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
