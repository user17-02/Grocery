import React from 'react';
import './Testimonials.css';
const ava1 = 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop';
const ava2 = 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop';
const ava3 = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop';

const testimonials = [
    { id: 1, name: 'Angeline White', role: 'CEO, Organic Food', text: '“The first step in your healthy lifestyle is to eat healthy and drink organic juices delivered from farm.”', image: ava1 },
    { id: 2, name: 'Marcos Anthony', role: 'Manager, Farm Lab', text: '“The first step in your healthy lifestyle is to eat healthy and drink organic juices delivered from farm.”', image: ava2 },
    { id: 3, name: 'Elena Smith', role: 'Nutritionist', text: '“The first step in your healthy lifestyle is to eat healthy and drink organic juices delivered from farm.”', image: ava3 },
];

const Testimonials = () => {
    return (
        <section className="testimonials section-padding">
            <div className="container">
                <div className="testimonials-grid">
                    {testimonials.map(item => (
                        <div key={item.id} className="testimonial-card">
                            <div className="user-avatar">
                                <img src={item.image} alt={item.name} />
                            </div>
                            <p className="testimonial-text">{item.text}</p>
                            <div className="user-info">
                                <span className="user-role">{item.role}</span>
                                <h4 className="user-name">{item.name}</h4>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
