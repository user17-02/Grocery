import React, { useState } from 'react';
import './ContactUs.css';
import { FiMapPin, FiPhone, FiMail } from 'react-icons/fi';
import NeedHelp from '../../components/Home/NeedHelp';
import breadcrumbBg from '../../assets/1-1 (2).webp';
import contactApi from '../../api/contactApi';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess(false);

        try {
            await contactApi.createContact(formData);
            setSuccess(true);
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to send message. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="contact-page">
            {/* Breadcrumb Section */}
            <section className="contact-breadcrumb" style={{ backgroundImage: `url(${breadcrumbBg})` }}>
                <div className="container">
                    <div className="breadcrumb-content">
                        <h2 className="breadcrumb-title">contact Us</h2>
                        <nav className="breadcrumb-nav">
                            <a href="/">Home</a>
                            <span className="separator">&gt;</span>
                            <span className="current">Contact Us</span>
                        </nav>
                    </div>
                </div>
            </section>

            {/* Contact Information Section */}
            <section className="contact-info-section section-padding">
                <div className="container">
                    <div className="contact-info-grid">
                        {/* Location Box */}
                        <div className="info-box">
                            <div className="icon-wrapper">
                                <FiMapPin />
                            </div>
                            <h3 className="info-title">Our Location</h3>
                            <p className="info-desc">(800) 123 456 789 / (800) 123 456 789</p>
                            <p className="info-desc email">info@example.com</p>
                        </div>

                        {/* Phone Box */}
                        <div className="info-box">
                            <div className="icon-wrapper">
                                <FiPhone />
                            </div>
                            <h3 className="info-title">Contact us Anytime</h3>
                            <p className="info-desc">Mobile: 012 345 678</p>
                            <p className="info-desc">Fax: 123 456 789</p>
                        </div>

                        {/* Support Box */}
                        <div className="info-box">
                            <div className="icon-wrapper">
                                <FiMail />
                            </div>
                            <h3 className="info-title">Support Overall</h3>
                            <p className="info-desc">Support24/7@example.com</p>
                            <p className="info-desc email">info@example.com</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section className="contact-form-section section-padding">
                <div className="container">
                    <div className="form-container">
                        <h2 className="form-heading">GET IN TOUCH</h2>
                        {success && <p className="success-message" style={{ color: 'green', marginBottom: '20px', fontWeight: 'bold' }}>Your message has been sent successfully!</p>}
                        {error && <p className="error-message" style={{ color: 'red', marginBottom: '20px', fontWeight: 'bold' }}>{error}</p>}

                        <form className="contact-form" onSubmit={handleSubmit}>
                            <div className="form-row">
                                <div className="form-group half-width">
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group half-width">
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="form-group full-width">
                                <input
                                    type="text"
                                    name="subject"
                                    placeholder="Subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group full-width">
                                <textarea
                                    name="message"
                                    placeholder="Message"
                                    rows="6"
                                    required
                                    value={formData.message}
                                    onChange={handleChange}
                                ></textarea>
                            </div>
                            <div className="form-action">
                                <button type="submit" className="send-btn" disabled={loading}>
                                    {loading ? 'SENDING...' : 'SEND A MESSAGE'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

            {/* Google Map Section */}
            <section className="map-section">
                <iframe
                    title="location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.902542565011!2d90.3910000!3d23.7500000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa569fd240411b4!2sDhaka!5e0!3m2!1sen!2sbd!4v1690000000000!5m2!1sen!2sbd"
                    width="100%"
                    height="500"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                ></iframe>
            </section>

            <NeedHelp />
        </div>
    );
};

export default ContactUs;
