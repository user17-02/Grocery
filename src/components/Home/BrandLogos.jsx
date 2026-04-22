import React from 'react';
import './BrandLogos.css';
import brand1 from '../../assets/brand-1.webp';
import brand2 from '../../assets/brand-2.webp';
import brand3 from '../../assets/brand-3.webp';
import brand4 from '../../assets/brand-4.webp';
import brand5 from '../../assets/brand-5.webp';

const BrandLogos = () => {
    return (
        <section className="brand-logos-section">
            <div className="container logos-wrapper">
                <div className="logo-item">
                    <img src={brand1} alt="Art Studio" />
                </div>
                <div className="logo-item">
                    <img src={brand2} alt="Martha Smither" />
                </div>
                <div className="logo-item">
                    <img src={brand3} alt="Jes Wedding" />
                </div>
                <div className="logo-item">
                    <img src={brand4} alt="Hand Crafted" />
                </div>
                <div className="logo-item">
                    <img src={brand5} alt="Pure" />
                </div>
            </div>
        </section>
    );
};

export default BrandLogos;
