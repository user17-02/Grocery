import React from 'react';
import './ServiceFeatures.css';
const icon1 = '🛒';
const icon2 = '🏪';
const icon3 = '🚚';

const ServiceFeatures = () => {
    const features = [
        {
            icon: icon1,
            title: "Select Your Products",
            description: "Choose from select produce to start. Keep, add, or remove items."
        },
        {
            icon: icon2,
            title: "Our Shop Orfarm",
            description: "We provide 100+ products, provide enough nutrition for your family."
        },
        {
            icon: icon3,
            title: "Delivery To Your",
            description: "Delivery to your door. Up to 100km and it is completely free."
        }
    ];

    return (
        <section className="service-features section-padding">
            <div className="container">
                <div className="features-wrapper">
                    {features.map((feature, index) => (
                        <div className="feature-item" key={index}>
                            <div className="feature-icon-emoji">{feature.icon}</div>
                            <h3 className="feature-title">{feature.title}</h3>
                            <p className="feature-desc">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServiceFeatures;
