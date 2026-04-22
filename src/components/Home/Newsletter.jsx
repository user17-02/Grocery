import React from 'react';
import './Newsletter.css';
import basketImage from '../../assets/feature-1.webp';

const Newsletter = () => {
    return (
        <section className="newsletter-section">
            <div className="container newsletter-wrapper">
                <div className="newsletter-image">
                    <img src={basketImage} alt="Vegetable Basket" />
                </div>
                <div className="newsletter-content">
                    <span className="newsletter-subtitle">
                        SPECIAL <span className="highlight">OFFER</span> FOR SUBSCRIPTION
                    </span>
                    <h2 className="newsletter-title">GET INSTANT DISCOUNT FOR MEMBERSHIP</h2>
                    <p className="newsletter-desc">
                        Subscribe our newsletter and all latest news of our <br />
                        latest product, promotion and offers
                    </p>

                    <form className="newsletter-form-inline">
                        <input
                            type="email"
                            placeholder="email@example.com"
                            className="newsletter-input"
                        />
                        <button type="submit" className="newsletter-submit-btn">
                            SUBSCRIBE
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;
