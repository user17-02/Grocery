import React from 'react';
import './Highlights.css';
import ProductCard from '../Product/ProductCard';

const highlightProducts = [
    { id: 1, name: 'Fresh Organic Blueberries', category: 'Fruits', price: 12.00, oldPrice: 15.00, rating: 5, discount: 20 },
    { id: 2, name: 'Fresh Organic Strawberry', category: 'Fruits', price: 10.00, rating: 5 },
    { id: 3, name: 'Organic Green Broccoli', category: 'Vegetables', price: 4.50, rating: 4 },
    { id: 4, name: 'Organic Red Tomatoes', category: 'Vegetables', price: 3.50, rating: 4 },
    { id: 5, name: 'Fresh Organic Milk', category: 'Dairy', price: 5.00, rating: 4 },
    { id: 6, name: 'Fresh Organic Eggs', category: 'Dairy', price: 7.00, rating: 4 },
    { id: 7, name: 'Whole Wheat Organic Bread', category: 'Bakery', price: 8.50, rating: 4 },
    { id: 8, name: 'Daily Fresh Fruit Juice', category: 'Beverages', price: 15.00, rating: 5 },
    { id: 9, name: 'Organic Grass-Fed Beef', category: 'Meat', price: 25.00, rating: 5 },
];

const Highlights = () => {
    // Show first 8 products for the featured section
    const featuredList = highlightProducts.slice(0, 8);

    return (
        <section className="highlights section-padding">
            <div className="container">
                <div className="section-title text-center">
                    <span className="subtitle">Featured Products</span>
                    <h2>All <span>best seller</span> product</h2>
                    <p className="subtext">All best seller product are now available for you and your can buy this product from here any time any where so sop now</p>
                </div>

                <div className="highlights-grid">
                    {featuredList.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Highlights;
