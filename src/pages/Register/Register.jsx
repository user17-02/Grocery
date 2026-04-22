import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import breadcrumbBg from '../../assets/1-1 (2).webp';
import NeedHelp from '../../components/Home/NeedHelp';
import authApi from '../../api/authApi';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await authApi.register({ name, email, password });
            localStorage.setItem('userInfo', JSON.stringify(data));
            setMessage('Registration successful! Redirecting...');
            setTimeout(() => {
                navigate('/shop');
            }, 2000);
        } catch (err) {
            setError(err.response && err.response.data.message ? err.response.data.message : err.message);
        }
    };

    return (
        <div className="register-page">
            {/* Breadcrumb Section */}
            <section className="shop-breadcrumb" style={{ backgroundImage: `url("${breadcrumbBg}")` }}>
                <div className="container">
                    <div className="breadcrumb-content">
                        <h2 className="breadcrumb-title">Login-Register</h2>
                        <nav className="breadcrumb-nav">
                            <a href="/">Home</a>
                            <span className="separator">&gt;</span>
                            <span className="current">Register</span>
                        </nav>
                    </div>
                </div>
            </section>

            {/* Register Area */}
            <section className="register-area section-padding">
                <div className="container">
                    <div className="register-wrapper">
                        <div className="register-form-container">
                            <h3 className="register-title">Create Account</h3>
                            <p className="register-desc">Please Register using account detail bellow.</p>
                            {message && <div className="success-message" style={{ color: 'green', marginBottom: '10px' }}>{message}</div>}
                            {error && <div className="error-message" style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
                            <form className="register-form" onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        placeholder="Full Name"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <div className="register-actions">
                                    <button type="submit" className="register-btn">Register</button>
                                </div>
                                <div className="login-link">
                                    <a href="/login">Already have an account? Login here</a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            <NeedHelp />
        </div>
    );
};

export default Register;
