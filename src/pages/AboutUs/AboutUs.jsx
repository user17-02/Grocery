import React from 'react';
import './AboutUs.css';
import Newsletter from '../../components/Home/Newsletter';
import BrandLogos from '../../components/Home/BrandLogos';
import NeedHelp from '../../components/Home/NeedHelp';
import breadcrumbBg from '../../assets/1-1 (2).webp';
import fruitVideoThumb from '../../assets/feature-1.webp';

const AboutUs = () => {
    return (
        <div className="about-us-page">
            {/* Breadcrumb Section */}
            <section className="breadcrumb-section">
                <div className="container">
                    <div className="breadcrumb-content">
                        <h1>About Us</h1>
                        <nav>
                            <a href="/">Home</a> <span>{'>'}</span> <span>About Us</span>
                        </nav>
                    </div>
                </div>
            </section>

            {/* Fruit Importance Section */}
            <section className="fruit-importance-section section-padding">
                <div className="container">
                    <div className="fruit-grid">
                        <div className="fruit-content">
                            <h2 className="section-heading">Important to eat fruit</h2>
                            <p>Eating fruit provides health benefits — people who eat more fruits and vegetables as part of an overall healthy diet are likely to have a reduced risk of some chronic diseases. Fruits provide nutrients vital for health and maintenance of your body.</p>
                            <p>Fruits are sources of many essential nutrients that are underconsumed, including potassium, dietary fiber, vitamin C, and folate (folic acid).</p>
                            <p>Most fruits are naturally low in fat, sodium, and calories. None have cholesterol.</p>
                        </div>
                        <div className="fruit-video">
                            <div className="video-thumb">
                                <img src={fruitVideoThumb} alt="Fruit Importance" />
                                <div className="play-button">
                                    <span className="play-icon"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Newsletter />
            <BrandLogos />
            <NeedHelp />

        </div>
    );
};

export default AboutUs;
