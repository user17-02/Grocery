import React from 'react';
import { Link } from 'react-router-dom';
import './TopBar.css';

const TopBar = () => {
    return (
        <div className="top-bar">
            <div className="container top-bar-content">
                <div className="offer-text">
                    Get 35% off for new product
                    <Link to="/shop">
                        <button className="shop-now-btn">Shop Now</button>
                    </Link>
                </div>
                <div className="top-bar-close">
                    <span>X</span>
                </div>
            </div>
        </div>
    );
};

export default TopBar;
