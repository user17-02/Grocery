import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './DealsSection.css';

const DealsSection = () => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0, hours: 0, minutes: 0, seconds: 0
    });

    useEffect(() => {
        // Set target date 7 days from now for demo
        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + 7);

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate.getTime() - now;

            setTimeLeft({
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((distance % (1000 * 60)) / 1000)
            });

            if (distance < 0) {
                clearInterval(interval);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="deals-section section-padding">
            <div className="container">
                <div className="deals-banner">
                    <div className="deals-content">
                        <span className="subtitle">Special Offer</span>
                        <h2>Deals Of The <span>Week</span></h2>
                        <p>Don't miss out on our best-selling organic products at unbeatable prices.</p>

                        <div className="countdown">
                            <div className="countdown-item">
                                <span className="count">{timeLeft.days}</span>
                                <span className="label">Days</span>
                            </div>
                            <div className="countdown-item">
                                <span className="count">{timeLeft.hours}</span>
                                <span className="label">Hrs</span>
                            </div>
                            <div className="countdown-item">
                                <span className="count">{timeLeft.minutes}</span>
                                <span className="label">Min</span>
                            </div>
                            <div className="countdown-item">
                                <span className="count">{timeLeft.seconds}</span>
                                <span className="label">Sec</span>
                            </div>
                        </div>

                        <Link to="/shop" className="btn-primary">Shop Now</Link>
                    </div>

                    <div className="deals-featured-product">
                        <div className="deal-product-img">
                            <div className="sale-badge">Hurry Up!</div>
                            <div className="placeholder-deal-img">Fresh Organic Strawberry</div>
                        </div>
                        <div className="deal-product-info">
                            <h3>Fresh Organic Strawberry</h3>
                            <div className="price">
                                <span className="current">$12.00</span>
                                <span className="old">$15.00</span>
                            </div>
                            <div className="stock-status">
                                <div className="stock-info">
                                    <span>Available: <strong>26</strong></span>
                                    <span>Sold: <strong>44</strong></span>
                                </div>
                                <div className="stock-bar">
                                    <div className="stock-fill" style={{ width: '63%' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DealsSection;
