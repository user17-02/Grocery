import React, { useEffect, useState } from 'react';
import adminApi from '../../api/adminApi';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingUser, setEditingUser] = useState(null);
    const [editData, setEditData] = useState({ name: '', email: '', isAdmin: false });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const data = await adminApi.getUsers();
            setUsers(data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch users');
            setLoading(false);
        }
    };

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await adminApi.deleteUser(id);
                fetchUsers();
            } catch (err) {
                alert('Failed to delete user');
            }
        }
    };

    const editHandler = (user) => {
        setEditingUser(user._id);
        setEditData({ name: user.name, email: user.email, isAdmin: user.isAdmin });
    };

    const cancelEdit = () => {
        setEditingUser(null);
    };

    const saveHandler = async (id) => {
        try {
            await adminApi.updateUser({ _id: id, ...editData });
            setEditingUser(null);
            fetchUsers();
            alert('User updated successfully');
        } catch (err) {
            const message = err.response?.data?.message || 'Failed to update user';
            alert(message);
        }
    };

    if (loading) return <p>Loading users...</p>;
    if (error) return <p className="error-message">{error}</p>;

    return (
        <div className="admin-table-container">
            <h2>Users</h2>
            <table className="admin-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>EMAIL</th>
                        <th>ADMIN</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td><span title={user._id}>{user._id.substring(0, 8)}...</span></td>
                            <td>
                                {editingUser === user._id ? (
                                    <input
                                        type="text"
                                        value={editData.name}
                                        onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                                        className="edit-input"
                                    />
                                ) : (
                                    user.name
                                )}
                            </td>
                            <td>
                                {editingUser === user._id ? (
                                    <input
                                        type="email"
                                        value={editData.email}
                                        onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                                        className="edit-input"
                                    />
                                ) : (
                                    <a href={`mailto:${user.email}`}>{user.email}</a>
                                )}
                            </td>
                            <td>
                                {editingUser === user._id ? (
                                    <input
                                        type="checkbox"
                                        checked={editData.isAdmin}
                                        onChange={(e) => setEditData({ ...editData, isAdmin: e.target.checked })}
                                    />
                                ) : user.isAdmin ? (
                                    <span className="badge-success">Yes</span>
                                ) : (
                                    <span className="badge-danger">No</span>
                                )}
                            </td>
                            <td>
                                <div className="action-buttons">
                                    {editingUser === user._id ? (
                                        <>
                                            <button className="btn-save" onClick={() => saveHandler(user._id)}>Save</button>
                                            <button className="btn-cancel" onClick={cancelEdit}>Cancel</button>
                                        </>
                                    ) : (
                                        <>
                                            <button className="btn-edit" onClick={() => editHandler(user)}>Edit</button>
                                            {!user.isAdmin && (
                                                <button className="btn-delete" onClick={() => deleteHandler(user._id)}>Delete</button>
                                            )}
                                        </>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;
