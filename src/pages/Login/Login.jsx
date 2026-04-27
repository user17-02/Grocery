import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import breadcrumbBg from '../../assets/1-1 (2).webp';
import NeedHelp from '../../components/Home/NeedHelp';
import authApi from '../../api/authApi';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            // Clear any stale auth data before logging in
            localStorage.removeItem('userInfo');
            const data = await authApi.login({ email: email.trim(), password });
            localStorage.setItem('userInfo', JSON.stringify(data));
            if (data.isAdmin) {
                navigate('/admin/dashboard');
            } else {
                navigate('/shop');
            }
        } catch (err) {
            console.error('Login error:', err);
            const msg = err.response?.data?.message || err.message || 'Login failed. Please check your credentials.';
            setError(msg);
        }
    };


    return (
        <div className="login-page">
            {/* Breadcrumb Section */}
            <section className="shop-breadcrumb" style={{ backgroundImage: `url("${breadcrumbBg}")` }}>
                <div className="container">
                    <div className="breadcrumb-content">
                        <h2 className="breadcrumb-title">Login-Register</h2>
                        <nav className="breadcrumb-nav">
                            <a href="/">Home</a>
                            <span className="separator">&gt;</span>
                            <span className="current">Login</span>
                        </nav>
                    </div>
                </div>
            </section>

            {/* Login Area */}
            <section className="login-area section-padding">
                <div className="container">
                    <div className="login-wrapper">
                        <div className="login-form-container">
                            <h3 className="login-title">Login</h3>
                            <p className="login-desc">Please login using account detail bellow.</p>
                            {error && <div className="error-message" style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
                            <form className="login-form" onSubmit={handleSubmit}>
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
                                        placeholder="Enter your Password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <div className="login-meta">
                                    <div className="form-check">
                                        <input type="checkbox" id="remember" />
                                        <label htmlFor="remember">Remember Me</label>
                                    </div>
                                    <a href="#" className="forgot-password">Forget Password?</a>
                                </div>
                                <div className="login-actions">
                                    <button type="submit" className="login-btn">Login</button>
                                </div>
                                <div className="register-link">
                                    <a href="/register">Create Account</a>
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

export default Login;
