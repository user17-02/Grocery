import React, { useEffect, useState } from 'react';
import adminApi from '../../api/adminApi';

const SupportList = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchMessages = async () => {
        try {
            const data = await adminApi.getContacts();
            setMessages(data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch messages');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure you want to delete this message?')) {
            try {
                await adminApi.deleteContact(id);
                fetchMessages();
            } catch (err) {
                alert('Failed to delete message');
            }
        }
    };

    if (loading) return <p>Loading messages...</p>;
    if (error) return <p className="error-message">{error}</p>;

    return (
        <div className="admin-table-container">
            <h2>Support Messages</h2>
            <table className="admin-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Message</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {messages.length === 0 ? (
                        <tr>
                            <td colSpan="5" style={{ textAlign: 'center' }}>No messages found</td>
                        </tr>
                    ) : (
                        messages.slice().reverse().map(msg => (
                            <tr key={msg._id}>
                                <td>{new Date(msg.createdAt).toLocaleDateString()}</td>
                                <td>{msg.name}</td>
                                <td>{msg.email}</td>
                                <td>{msg.message}</td>
                                <td>
                                    <button
                                        className="btn-delete"
                                        onClick={() => deleteHandler(msg._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default SupportList;
