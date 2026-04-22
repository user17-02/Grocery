import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './MyAccount.css';
import { FiLayout, FiShoppingBag, FiDownload, FiCreditCard, FiMapPin, FiUser, FiLogOut } from 'react-icons/fi';
import breadcrumbBg from '../../assets/1-1 (2).webp';
import NeedHelp from '../../components/Home/NeedHelp';
import orderApi from '../../api/orderApi';

const MyAccount = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('dashboard');
    const [userInfo, setUserInfo] = useState(null);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const user = localStorage.getItem('userInfo')
            ? JSON.parse(localStorage.getItem('userInfo'))
            : null;

        if (!user) {
            navigate('/login');
            return;
        }
        setUserInfo(user);

        const fetchOrders = async () => {
            try {
                const data = await orderApi.getMyOrders();
                setOrders(data || []);
                setLoading(false);
            } catch (err) {
                console.error('Failed to fetch orders');
                setLoading(false);
            }
        };

        fetchOrders();
    }, [navigate]);

    const logoutHandler = () => {
        localStorage.removeItem('userInfo');
        navigate('/login');
    };

    const renderContent = () => {
        if (!userInfo) return null;

        switch (activeTab) {
            case 'dashboard':
                return (
                    <div className="tab-pane active">
                        <h3>Dashboard</h3>
                        <p>Hello, <strong>{userInfo.name}</strong> (If Not {userInfo.name} <button onClick={logoutHandler} className="logout-link" style={{ background: 'none', border: 'none', color: '#ff6b6b', cursor: 'pointer', padding: 0 }}>Logout</button>)</p>
                        <p>From your account dashboard. you can easily check & view your recent orders, manage your shipping and billing addresses and edit your password and account details.</p>
                    </div>
                );
            case 'orders':
                return (
                    <div className="tab-pane active">
                        <h3>Orders</h3>
                        {orders.length === 0 ? (
                            <p>You haven't placed any orders yet. <Link to="/shop">Go Shopping!</Link></p>
                        ) : (
                            <div className="account-table-wrapper">
                                <table className="account-table">
                                    <thead>
                                        <tr>
                                            <th>Order</th>
                                            <th>Date</th>
                                            <th>Status</th>
                                            <th>Total</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.map((order, index) => (
                                            <tr key={order._id}>
                                                <td>{index + 1}</td>
                                                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                                <td>{order.isPaid ? 'Paid' : 'Pending'} {order.isDelivered ? '& Delivered' : ''}</td>
                                                <td>${order.totalPrice.toFixed(2)}</td>
                                                <td><Link to={`/order-success?id=${order._id}`} className="view-btn">View</Link></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                );
            case 'download':
                return (
                    <div className="tab-pane active">
                        <h3>Downloads</h3>
                        <p>No downloads available.</p>
                    </div>
                );
            case 'payment-method':
                return (
                    <div className="tab-pane active">
                        <h3>Payment Method</h3>
                        <p className="p-method-text">You haven't saved any payment methods yet.</p>
                    </div>
                );
            case 'address':
                const address = userInfo.addresses?.length > 0 ? userInfo.addresses[0] : null;
                return (
                    <div className="tab-pane active">
                        <h3>Billing Address</h3>
                        {address ? (
                            <div className="address-box">
                                <p><strong>{userInfo.name}</strong></p>
                                <p>{address.street}</p>
                                <p>{address.city}, {address.postalCode}</p>
                                <p>{address.country}</p>
                                <Link to="/my-account" onClick={() => setActiveTab('account-info')} className="edit-btn">Edit Address</Link>
                            </div>
                        ) : (
                            <p>No address saved yet. <Link to="/my-account" onClick={() => setActiveTab('account-info')}>Add one in account details</Link></p>
                        )}
                    </div>
                );
            case 'account-info':
                return (
                    <div className="tab-pane active">
                        <h3>Account Details</h3>
                        <form className="account-details-form">
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Full Name *</label>
                                    <input type="text" defaultValue={userInfo.name} required />
                                </div>
                                <div className="form-group">
                                    <label>Email Address *</label>
                                    <input type="email" defaultValue={userInfo.email} required />
                                </div>
                            </div>
                            <fieldset>
                                <legend>Password Change</legend>
                                <div className="form-group">
                                    <label>Current Password (leave blank to leave unchanged)</label>
                                    <input type="password" />
                                </div>
                                <div className="form-group">
                                    <label>New Password (leave blank to leave unchanged)</label>
                                    <input type="password" />
                                </div>
                                <div className="form-group">
                                    <label>Confirm New Password</label>
                                    <input type="password" />
                                </div>
                            </fieldset>
                            <button type="submit" className="save-btn">SAVE CHANGES</button>
                        </form>
                    </div>
                );
            default:
                return null;
        }
    };

    if (loading) return <div className="container section-padding"><p>Loading account details...</p></div>;

    return (
        <div className="my-account-page">
            {/* Breadcrumb Section */}
            <section className="shop-breadcrumb" style={{ backgroundImage: `url("${breadcrumbBg}")` }}>
                <div className="container">
                    <div className="breadcrumb-content">
                        <h2 className="breadcrumb-title">My Account</h2>
                        <nav className="breadcrumb-nav">
                            <Link to="/">Home</Link>
                            <span className="separator">&gt;</span>
                            <span className="current">My Account</span>
                        </nav>
                    </div>
                </div>
            </section>

            {/* My Account Area */}
            <section className="my-account-area section-padding">
                <div className="container">
                    <div className="my-account-wrapper">
                        <div className="account-sidebar">
                            <ul className="account-tabs">
                                <li className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => setActiveTab('dashboard')}>
                                    <FiLayout /> Dashboard
                                </li>
                                <li className={activeTab === 'orders' ? 'active' : ''} onClick={() => setActiveTab('orders')}>
                                    <FiShoppingBag /> Orders
                                </li>
                                <li className={activeTab === 'download' ? 'active' : ''} onClick={() => setActiveTab('download')}>
                                    <FiDownload /> Download
                                </li>
                                <li className={activeTab === 'payment-method' ? 'active' : ''} onClick={() => setActiveTab('payment-method')}>
                                    <FiCreditCard /> Payment Method
                                </li>
                                <li className={activeTab === 'address' ? 'active' : ''} onClick={() => setActiveTab('address')}>
                                    <FiMapPin /> Address
                                </li>
                                <li className={activeTab === 'account-info' ? 'active' : ''} onClick={() => setActiveTab('account-info')}>
                                    <FiUser /> Account Details
                                </li>
                                <li onClick={logoutHandler} style={{ cursor: 'pointer' }}>
                                    <span><FiLogOut /> Logout</span>
                                </li>
                            </ul>
                        </div>
                        <div className="account-content">
                            {renderContent()}
                        </div>
                    </div>
                </div>
            </section>

            <NeedHelp />
        </div>
    );
};

export default MyAccount;
