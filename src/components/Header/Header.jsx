import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Header.css';
import cartApi from '../../api/cartApi';
import wishlistApi from '../../api/wishlistApi';
import productApi from '../../api/productApi';
import logo from '../../assets/logo.png';
import { FiSearch, FiUser, FiHeart, FiShoppingBag, FiChevronDown, FiMenu, FiX } from 'react-icons/fi';

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [userInfo, setUserInfo] = useState(null);
    const [cartCount, setCartCount] = useState(0);
    const [wishlistCount, setWishlistCount] = useState(0);
    const [categories, setCategories] = useState([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await productApi.getCategories();
                setCategories(data || []);
            } catch (err) {
                console.error('Failed to fetch categories');
            }
        };
        fetchCategories();

        const user = localStorage.getItem('userInfo')
            ? JSON.parse(localStorage.getItem('userInfo'))
            : null;
        setUserInfo(user);

        const handleUpdate = () => {
            if (user) fetchCounts();
        };

        window.addEventListener('cart-updated', handleUpdate);
        window.addEventListener('wishlist-updated', handleUpdate);

        if (user) {
            fetchCounts();
        } else {
            setCartCount(0);
            setWishlistCount(0);
        }

        return () => {
            window.removeEventListener('cart-updated', handleUpdate);
            window.removeEventListener('wishlist-updated', handleUpdate);
        };
    }, [location]);

    const fetchCounts = async () => {
        try {
            const cartData = await cartApi.getCart();
            setCartCount(cartData.length);

            const wishlistData = await wishlistApi.getWishlist();
            setWishlistCount(wishlistData.length || 0);
        } catch (err) {
            console.error('Failed to fetch counts');
        }
    };

    const toggleMenu = () => {
        console.log('Toggling menu, current state:', isMenuOpen);
        setIsMenuOpen(!isMenuOpen);
        setOpenDropdown(null);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
        setOpenDropdown(null);
    };

    const toggleDropdown = (name) => {
        if (openDropdown === name) {
            setOpenDropdown(null);
        } else {
            setOpenDropdown(name);
        }
    };

    const logoutHandler = () => {
        localStorage.removeItem('userInfo');
        setUserInfo(null);
        setCartCount(0);
        setWishlistCount(0);
        navigate('/login');
    };

    return (
        <header className="main-header">
            <div className="container header-container">
                <div className="logo">
                    <Link to="/" onClick={closeMenu}>
                        <img src={logo} alt="Obrien Logo" />
                    </Link>
                </div>

                <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
                    <div className="mobile-close-btn" onClick={closeMenu}>
                        <FiX />
                    </div>
                    <ul>
                        <li className={location.pathname === '/' ? 'active' : ''}>
                            <Link to="/" onClick={closeMenu}>Home</Link>
                        </li>
                        <li className={`has-dropdown ${openDropdown === 'shop' ? 'open' : ''}`}>
                            <div className="mobile-nav-link">
                                <Link to="/shop" onClick={closeMenu}>Shop <FiChevronDown /></Link>
                                <span className="dropdown-toggle-circle" onClick={(e) => { e.stopPropagation(); toggleDropdown('shop'); }}>
                                    <FiChevronDown />
                                </span>
                            </div>
                            <ul className="dropdown">
                                <li><Link to="/shop" onClick={closeMenu}>All Products</Link></li>
                                <li><Link to="/cart" onClick={closeMenu}>Cart</Link></li>
                                <li><Link to="/checkout" onClick={closeMenu}>Checkout</Link></li>
                            </ul>
                        </li>
                        <li className={`has-dropdown ${openDropdown === 'blog' ? 'open' : ''}`}>
                            <div className="mobile-nav-link">
                                <Link to="/blog-grid" onClick={closeMenu}>Blog <FiChevronDown /></Link>
                                <span className="dropdown-toggle-circle" onClick={(e) => { e.stopPropagation(); toggleDropdown('blog'); }}>
                                    <FiChevronDown />
                                </span>
                            </div>
                            <ul className="dropdown">
                                <li><Link to="/blog-grid" onClick={closeMenu}>Blog Grid View</Link></li>
                            </ul>
                        </li>
                        <li className={`has-dropdown ${openDropdown === 'pages' ? 'open' : ''}`}>
                            <div className="mobile-nav-link">
                                <Link to="/my-account" onClick={closeMenu}>Pages <FiChevronDown /></Link>
                                <span className="dropdown-toggle-circle" onClick={(e) => { e.stopPropagation(); toggleDropdown('pages'); }}>
                                    <FiChevronDown />
                                </span>
                            </div>
                            <ul className="dropdown">
                                <li><Link to="/my-account" onClick={closeMenu}>My Account</Link></li>
                            </ul>
                        </li>
                        <li><Link to="/about" onClick={closeMenu}>About Us</Link></li>
                        <li><Link to="/contact" onClick={closeMenu}>Contact Us</Link></li>
                        
                        {/* Mobile Account Links */}
                        <li className="mobile-only-links">
                            {userInfo ? (
                                <>
                                    <div className="mobile-user-info">
                                        <FiUser /> <span>{userInfo.name}</span>
                                    </div>
                                    <Link to="/my-account" onClick={closeMenu}>My Account</Link>
                                    {userInfo.isAdmin && <Link to="/admin/dashboard" onClick={closeMenu}>Admin Dashboard</Link>}
                                    <button className="mobile-logout" onClick={logoutHandler}>Logout</button>
                                </>
                            ) : (
                                <div className="mobile-auth-links">
                                    <Link to="/login" onClick={closeMenu}>Login</Link>
                                    <Link to="/register" onClick={closeMenu}>Register</Link>
                                </div>
                            )}
                        </li>
                    </ul>
                </div>

                <div className="header-actions">
                    <div className="mobile-toggle" onClick={toggleMenu}>
                        {isMenuOpen ? <FiX /> : <FiMenu />}
                    </div>
                    <div className="account-links">
                        {userInfo ? (
                            <div className="user-dropdown">
                                <span className="user-name">Hello, {userInfo.name} <FiChevronDown /></span>
                                <div className="user-dropdown-content">
                                    {userInfo.isAdmin && <Link to="/admin/dashboard">Admin Dashboard</Link>}
                                    <Link to="/my-account">My Account</Link>
                                    <button onClick={logoutHandler}>Logout</button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <Link to="/login">Login</Link>
                                <span className="divider">|</span>
                                <Link to="/register">Register</Link>
                            </>
                        )}
                    </div>
                    <div className="header-icons">
                        <Link to="/wishlist" className="header-wishlist">
                            <FiHeart />
                            <span className="badge">{wishlistCount}</span>
                        </Link>
                        <div className="header-cart">
                            <Link to="/cart">
                                <FiShoppingBag />
                                <span className="cart-badge">{cartCount}</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`menu-overlay ${isMenuOpen ? 'active' : ''}`} onClick={closeMenu}></div>
        </header>
    );
};

export default Header;
