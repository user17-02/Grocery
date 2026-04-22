import React, { useState } from 'react';
import './WeeklyOffers.css';
import ProductCard from '../Product/ProductCard';

const categories = ['All Products', 'Fresh Fruits', 'Fresh Meat', 'Vegetables'];

const productsData = {
    'All Products': [
        { id: 1, name: 'Fresh Organic Blueberries', category: 'Fruits', price: 12.00, oldPrice: 15.00, rating: 5, discount: 20 },
        { id: 2, name: 'Organic Green Broccoli', category: 'Vegetables', price: 4.50, rating: 4 },
        { id: 3, name: 'Fresh Organic Strawberry', category: 'Fruits', price: 10.00, rating: 5 },
        { id: 4, name: 'Organic Red Tomatoes', category: 'Vegetables', price: 3.50, rating: 4 },
    ],
    'Fresh Fruits': [
        { id: 1, name: 'Fresh Organic Blueberries', category: 'Fruits', price: 12.00, oldPrice: 15.00, rating: 5, discount: 20 },
        { id: 3, name: 'Fresh Organic Strawberry', category: 'Fruits', price: 10.00, rating: 5 },
    ],
    'Fresh Meat': [
        { id: 5, name: 'Organic Grass-Fed Beef', category: 'Meat', price: 25.00, oldPrice: 30.00, rating: 5, discount: 15 },
    ],
    'Vegetables': [
        { id: 2, name: 'Organic Green Broccoli', category: 'Vegetables', price: 4.50, rating: 4 },
        { id: 4, name: 'Organic Red Tomatoes', category: 'Vegetables', price: 3.50, rating: 4 },
    ]
};

const WeeklyOffers = () => {
    const [activeTab, setActiveTab] = useState('All Products');

    return (
        <section className="weekly-offers section-padding">
            <div className="container">
                <div className="section-title text-center">
                    <span className="subtitle">Special Tonight</span>
                    <h2>Weekly <span>Food Offers</span></h2>
                </div>

                <div className="tabs-container">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            className={`tab-btn ${activeTab === cat ? 'active' : ''}`}
                            onClick={() => setActiveTab(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="products-grid-weekly">
                    {productsData[activeTab].map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                <div className="view-all-container">
                    <p>Don't miss our latest offer, quality products. <a>View All ➔</a></p>
                </div>
            </div>
        </section>
    );
};

export default WeeklyOffers;
