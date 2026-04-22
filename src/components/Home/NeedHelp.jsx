import React from 'react';
import { Link } from 'react-router-dom';
import './NeedHelp.css';

const NeedHelp = () => {
    return (
        <section className="need-help-section">
            <div className="container need-help-wrapper">
                <div className="need-help-content">
                    <h2 className="need-help-title">Need Help ?</h2>
                    <p className="need-help-desc">Call our support 24/7 at 01234-567-890</p>
                </div>
                <div className="need-help-action">
                    <Link to="/contact" className="contact-btn">CONTACT NOW</Link>
                </div>
            </div>
        </section>
    );
};

export default NeedHelp;
