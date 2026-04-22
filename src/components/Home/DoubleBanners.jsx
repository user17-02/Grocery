import React from 'react';
import { Link } from 'react-router-dom';
import './DoubleBanners.css';
const chicken = 'https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=800&auto=format&fit=crop';
const pie = 'https://images.unsplash.com/photo-1595126731402-4dcca4666324?q=80&w=800&auto=format&fit=crop';

const DoubleBanners = () => {
    return (
        <section className="double-banners section-padding">
            <div className="container banners-grid-2">
                <div className="promo-banner" style={{ backgroundImage: `url(${chicken})` }}>
                    <div className="banner-content">
                        <span className="badge-promo">Organic Farm</span>
                        <h3>Fresh Food <br /> Restore Health</h3>
                        <Link to="/shop" className="btn-banner">Shop Now</Link>
                    </div>
                </div>
                <div className="promo-banner" style={{ backgroundImage: `url(${pie})` }}>
                    <div className="banner-content">
                        <span className="badge-promo">Organic Farm</span>
                        <h3>Fresh Food <br /> Restore Health</h3>
                        <Link to="/shop" className="btn-banner">Shop Now</Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DoubleBanners;
