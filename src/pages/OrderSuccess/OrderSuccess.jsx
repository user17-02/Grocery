import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './OrderSuccess.css';
import breadcrumbBg from '../../assets/1-1 (2).webp';
import NeedHelp from '../../components/Home/NeedHelp';

const OrderSuccess = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const orderId = query.get('id');

    return (
        <div className="order-success-page">
            {/* Breadcrumb Section */}
            <section className="shop-breadcrumb" style={{ backgroundImage: `url("${breadcrumbBg}")` }}>
                <div className="container">
                    <div className="breadcrumb-content">
                        <h2 className="breadcrumb-title">Order Success</h2>
                        <nav className="breadcrumb-nav">
                            <Link to="/">Home</Link>
                            <span className="separator">&gt;</span>
                            <span className="current">Order Success</span>
                        </nav>
                    </div>
                </div>
            </section>

            <section className="success-area section-padding text-center">
                <div className="container">
                    <div className="success-content">
                        <div className="success-icon" style={{ fontSize: '80px', color: '#7ab317', marginBottom: '20px' }}>
                            ✓
                        </div>
                        <h2>Thank You for Your Order!</h2>
                        <p>Your order has been placed successfully.</p>
                        {orderId && (
                            <div className="order-number" style={{ margin: '20px 0', padding: '15px', background: '#f9f9f9', display: 'inline-block', borderRadius: '5px' }}>
                                <strong>Order Number:</strong> {orderId}
                            </div>
                        )}
                        <p>We've sent a confirmation email to your billing address.</p>
                        <div className="success-actions" style={{ marginTop: '30px' }}>
                            <Link to="/shop" className="update-cart-btn" style={{ marginRight: '15px', textDecoration: 'none' }}>CONTINUE SHOPPING</Link>
                            <Link to="/my-account" className="checkout-btn" style={{ textDecoration: 'none' }}>VIEW MY ORDERS</Link>
                        </div>
                    </div>
                </div>
            </section>

            <NeedHelp />
        </div>
    );
};

export default OrderSuccess;
