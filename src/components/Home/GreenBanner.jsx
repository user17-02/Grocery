import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './GreenBanner.css';

const GreenBanner = () => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0, hours: 0, minutes: 0, seconds: 0
    });

    useEffect(() => {
        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + 5);

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate.getTime() - now;

            setTimeLeft({
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((distance % (1000 * 60)) / 1000)
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="green-banner">
            <div className="container green-banner-wrapper">
                <div className="green-banner-content">
                    <span className="subtitle">Hurry up and Get 25% Discount</span>
                    <h2>Flash <span>Deals</span></h2>
                    <p>All best seller product are now available for you and your can buy this product from here any time any where so sop now</p>

                    <div className="countdown-timer">
                        <div className="timer-item"><span>{timeLeft.days}</span>Days</div>
                        <div className="timer-item"><span>{timeLeft.hours}</span>Hours</div>
                        <div className="timer-item"><span>{timeLeft.minutes}</span>Min</div>
                        <div className="timer-item"><span>{timeLeft.seconds}</span>Sec</div>
                    </div>

                    <div className="banner-buttons">
                        <Link to="/shop" className="btn-white">Shop Now</Link>
                    </div>
                </div>
                {/* ... existing image placeholder ... */}

                <div className="green-banner-image">
                    {/* Placeholder for the green bottle promo */}
                    <div className="bottle-promo">
                        <div className="bottle"></div>
                        <div className="leaf-decor">
                            <svg width="100" height="100" viewBox="0 0 24 24" fill="currentColor" opacity="0.6">
                                <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8.13,20C11,20 14,19 16.5,17C18.85,15.12 20.12,13 21,11C21,11 21,8 17,8M8,18C7.17,18 6.5,17.33 6.5,16.5C6.5,15.67 7.17,15 8,15C8.83,15 9.5,15.67 9.5,16.5C9.5,17.33 8.83,18 8,18Z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GreenBanner;
