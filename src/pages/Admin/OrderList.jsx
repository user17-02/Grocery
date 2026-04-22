import React, { useEffect, useState } from 'react';
import adminApi from '../../api/adminApi';

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const data = await adminApi.getOrders();
            setOrders(data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch orders');
            setLoading(false);
        }
    };

    const deliverHandler = async (id) => {
        try {
            await adminApi.deliverOrder(id);
            fetchOrders();
        } catch (err) {
            alert('Failed to mark as delivered');
        }
    };

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure you want to delete this order?')) {
            try {
                await adminApi.deleteOrder(id);
                fetchOrders();
            } catch (err) {
                alert('Failed to delete order');
            }
        }
    };

    if (loading) return <p>Loading orders...</p>;
    if (error) return <p className="error-message">{error}</p>;

    return (
        <div className="admin-table-container">
            <h2>Orders</h2>
            <table className="admin-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>USER</th>
                        <th>DATE</th>
                        <th>TOTAL</th>
                        <th>STATUS</th>
                        <th>PAID</th>
                        <th>DELIVERED</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order._id}>
                            <td><span title={order._id}>{order._id.substring(0, 8)}...</span></td>
                            <td>{order.user && order.user.name}</td>
                            <td>{order.createdAt.substring(0, 10)}</td>
                            <td>${order.totalPrice}</td>
                            <td>
                                <span className={`badge-${order.status === 'Delivered' ? 'success' : order.status === 'Confirmed' ? 'primary' : 'warning'}`}>
                                    {order.status}
                                </span>
                            </td>
                            <td>
                                {order.isPaid ? (
                                    <span className="badge-success">{order.paidAt.substring(0, 10)}</span>
                                ) : (
                                    <span className="badge-danger">Not Paid</span>
                                )}
                            </td>
                            <td>
                                {order.isDelivered ? (
                                    <span className="badge-success">{order.deliveredAt.substring(0, 10)}</span>
                                ) : (
                                    <span className="badge-danger">Not Delivered</span>
                                )}
                            </td>
                            <td>
                                <div className="action-buttons">
                                    {!order.isDelivered && (
                                        <button
                                            className="btn-action"
                                            onClick={() => deliverHandler(order._id)}
                                        >
                                            Deliver
                                        </button>
                                    )}
                                    <button
                                        className="btn-delete"
                                        onClick={() => deleteHandler(order._id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrderList;
