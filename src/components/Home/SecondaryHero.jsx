import React from 'react';
import './SecondaryHero.css';
// import backgroundImage from '../../assets/secondary-hero-bg.jpg'; // Placeholder for the juice bottle image

const SecondaryHero = () => {
    return (
        <section className="secondary-hero">
            <div className="container secondary-hero-wrapper">
                <div className="secondary-hero-image">
                    {/* Replace with actual asset if found, using placeholder layout for now */}
                    <div className="promo-product-img">
                        <span className="juice-label">Organic</span>
                    </div>
                </div>
                <div className="secondary-hero-content">
                    <p className="promo-description">
                        100% HEALTHY & NATURAL <br />
                        <strong>Chemical Free</strong> and <strong>Curated</strong> organic products.
                    </p>
                    <button className="btn-outline">Learn More</button>
                </div>
            </div>
        </section>
    );
};

export default SecondaryHero;
