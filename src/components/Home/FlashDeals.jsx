import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './FlashDeals.css';
import vegImage from '../../assets/1.webp'; // Using the substantial stack asset

const FlashDeals = () => {
    const [timeLeft, setTimeLeft] = useState({
        days: '00',
        hours: '00',
        minutes: '00',
        seconds: '00'
    });

    useEffect(() => {
        // Simple countdown logic for demonstration (e.g., 2 days from now)
        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + 2);

        const timer = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate.getTime() - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            setTimeLeft({
                days: String(days).padStart(2, '0'),
                hours: String(hours).padStart(2, '0'),
                minutes: String(minutes).padStart(2, '0'),
                seconds: String(seconds).padStart(2, '0')
            });

            if (distance < 0) {
                clearInterval(timer);
                setTimeLeft({ days: '00', hours: '00', minutes: '00', seconds: '00' });
            }
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <section className="flash-deals">
            <div className="container flash-deals-wrapper">
                <div className="flash-deals-image">
                    <img src={vegImage} alt="Mixed Vegetables Deal" />
                </div>
                <div className="flash-deals-content">
                    <h2 className="flash-title">FLASH DEALS</h2>
                    <h3 className="flash-subtitle">HURRY UP AND GET 25% DISCOUNT</h3>
                    <Link to="/shop" className="btn-shop-now-coral">SHOP NOW</Link>

                    <div className="countdown-timer">
                        <div className="timer-item">
                            <span className="time-value">{timeLeft.days}</span>
                            <span className="time-label">Days</span>
                        </div>
                        <div className="timer-item">
                            <span className="time-value">{timeLeft.hours}</span>
                            <span className="time-label">Hours</span>
                        </div>
                        <div className="timer-item">
                            <span className="time-value">{timeLeft.minutes}</span>
                            <span className="time-label">Min</span>
                        </div>
                        <div className="timer-item">
                            <span className="time-value">{timeLeft.seconds}</span>
                            <span className="time-label">Sec</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FlashDeals;
