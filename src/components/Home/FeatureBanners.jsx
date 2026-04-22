import React from 'react';
import './FeatureBanners.css';
import avocadoBanner from '../../assets/1-1.png';
import papayaBanner from '../../assets/1-2.png';
import orangeBanner from '../../assets/1-3.png';

const FeatureBanners = () => {
    return (
        <section className="feature-banners section-padding">
            <div className="container feature-banners-grid">
                <div className="banner-item">
                    <img src={avocadoBanner} alt="Fresh Avocado" />
                </div>
                <div className="banner-item">
                    <img src={papayaBanner} alt="Fresh Papaya" />
                </div>
                <div className="banner-item">
                    <img src={orangeBanner} alt="Fresh Orange" />
                </div>
            </div>
        </section>
    );
};

export default FeatureBanners;
