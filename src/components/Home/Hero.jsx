import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';
import avocadoSlide from '../../assets/1-1 (1).webp';
import organicSlide from '../../assets/1-2.webp';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Hero = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            subtitle: "Cold processed organic fruit",
            title: "Fresh Avocado",
            image: avocadoSlide
        },
        {
            subtitle: "Healthy life with",
            title: "Natural Organic",
            image: organicSlide
        }
    ];

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const slide = slides[currentSlide];

    return (
        <section
            className="hero"
            style={{
                backgroundImage: `url("${slide.image}"), url("data:image/svg+xml,%3Csvg width='800' height='800' viewBox='0 0 800 800' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M100 100 Q 150 50 200 100 T 300 100 M600 200 Q 650 150 700 200 T 800 200 M200 600 Q 250 550 300 600 T 400 600 M500 700 Q 550 650 600 700 T 700 700' fill='none' stroke='%23d1cbba' stroke-width='1.5' opacity='0.5'/%3E%3Ccircle cx='150' cy='300' r='30' fill='none' stroke='%23d1cbba' stroke-width='1' opacity='0.3'/%3E%3Ccircle cx='650' cy='500' r='20' fill='none' stroke='%23d1cbba' stroke-width='1' opacity='0.3'/%3E%3C/svg%3E")`
            }}
        >
            <div className="slider-arrow arrow-left" onClick={prevSlide}><span><FiChevronLeft /></span></div>
            <div className="slider-arrow arrow-right" onClick={nextSlide}><span><FiChevronRight /></span></div>

            <div className="container hero-wrapper">
                <div className="hero-content">
                    <span className="subtitle">{slide.subtitle}</span>
                    <h1 className="title">{slide.title}</h1>
                    <Link to="/shop" className="btn-shop-now">SHOP NOW</Link>
                </div>
            </div>

            <div className="slider-pagination">
                {slides.map((_, index) => (
                    <div
                        key={index}
                        className={`pagination-line ${currentSlide === index ? 'active' : ''}`}
                        onClick={() => setCurrentSlide(index)}
                    ></div>
                ))}
            </div>
        </section>
    );
};

export default Hero;
