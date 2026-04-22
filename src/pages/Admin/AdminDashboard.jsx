import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../../api/axiosClient';
import adminApi from '../../api/adminApi';
import UserList from './UserList';
import ProductList from './ProductList';
import OrderList from './OrderList';
import SupportList from './SupportList';
import { FiMenu, FiX, FiGrid, FiBox, FiShoppingBag, FiUsers, FiHelpCircle, FiLogOut } from 'react-icons/fi';
import './AdminDashboard.css';


const AdminDashboard = () => {
    const [stats, setStats] = useState({ users: 0, products: 0, orders: 0, revenue: 0 });
    const [activeTab, setActiveTab] = useState('dashboard');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo')
            ? JSON.parse(localStorage.getItem('userInfo'))
            : null;

        if (!userInfo || !userInfo.isAdmin) {
            navigate('/login');
            return;
        }

        const fetchStats = async () => {
            try {
                const data = await adminApi.getStats();
                if (data) {
                    setStats({
                        users: data.usersCount || 0,
                        products: data.productsCount || 0,
                        orders: data.ordersCount || 0,
                        revenue: data.totalRevenue || 0
                    });
                }
            } catch (error) {
                console.error('Error fetching stats:', error);
            }
        };

        if (activeTab === 'dashboard') {
            fetchStats();
        }
    }, [navigate, activeTab]);

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        navigate('/login');
    };

    return (
        <div className="admin-layout">
            <div className="admin-main-wrapper">

                <button className="admin-mobile-toggle" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    {isSidebarOpen ? <FiX /> : <FiMenu />}
                </button>

                <aside className={`admin-sidebar ${isSidebarOpen ? 'open' : ''}`}>
                    <div className="admin-sidebar-brand">Admin Panel</div>
                    <nav className="admin-nav">
                        <button 
                            className={activeTab === 'dashboard' ? 'active' : ''} 
                            onClick={() => { setActiveTab('dashboard'); setIsSidebarOpen(false); }}
                        >
                            <FiGrid /> Dashboard
                        </button>
                        <button 
                            className={activeTab === 'products' ? 'active' : ''} 
                            onClick={() => { setActiveTab('products'); setIsSidebarOpen(false); }}
                        >
                            <FiBox /> Products
                        </button>
                        <button 
                            className={activeTab === 'orders' ? 'active' : ''} 
                            onClick={() => { setActiveTab('orders'); setIsSidebarOpen(false); }}
                        >
                            <FiShoppingBag /> Orders
                        </button>
                        <button 
                            className={activeTab === 'users' ? 'active' : ''} 
                            onClick={() => { setActiveTab('users'); setIsSidebarOpen(false); }}
                        >
                            <FiUsers /> Users
                        </button>
                        <button 
                            className={activeTab === 'support' ? 'active' : ''} 
                            onClick={() => { setActiveTab('support'); setIsSidebarOpen(false); }}
                        >
                            <FiHelpCircle /> Help & Support
                        </button>
                    </nav>
                    <button className="logout-btn" onClick={handleLogout}>
                        <FiLogOut /> Logout
                    </button>
                </aside>

                {isSidebarOpen && <div className="admin-sidebar-overlay" onClick={() => setIsSidebarOpen(false)}></div>}

                <main className="admin-content">
                    <div className="admin-content-inner">
                        {activeTab === 'dashboard' && (
                            <div className="dashboard-stats">
                                <h2>Overview</h2>
                                <div className="stats-grid">
                                    <div className="stat-card">
                                        <h3>Total Users</h3>
                                        <p>{stats.users}</p>
                                    </div>
                                    <div className="stat-card">
                                        <h3>Total Products</h3>
                                        <p>{stats.products}</p>
                                    </div>
                                    <div className="stat-card">
                                        <h3>Total Orders</h3>
                                        <p>{stats.orders}</p>
                                    </div>
                                    <div className="stat-card">
                                        <h3>Total Revenue</h3>
                                        <p>${stats.revenue}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                        {activeTab === 'products' && <ProductList />}
                        {activeTab === 'orders' && <OrderList />}
                        {activeTab === 'users' && <UserList />}
                        {activeTab === 'support' && <SupportList />}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;
