import React from 'react';
import { Link } from 'react-router-dom';
import './BannersSection.css';

const BannersSection = () => {
    return (
        <section className="banners-section section-padding">
            <div className="container banners-grid">
                <div className="banner-item secondary-banner">
                    <div className="banner-content">
                        <span className="subtitle">Premium Quality</span>
                        <h3>Fresh Farm <br /> Product</h3>
                        <p>Get up to 30% Off on your first order</p>
                        <Link to="/shop" className="btn-shop">Shop Now</Link>
                    </div>
                </div>

                <div className="banner-item primary-banner">
                    <div className="banner-content">
                        <span className="subtitle">Healthy Lifestyle</span>
                        <h3>Organic Organic <br /> Food</h3>
                        <p>100% Certified Organic Products</p>
                        <Link to="/shop" className="btn-shop">Shop Now</Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BannersSection;
