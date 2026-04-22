import React from 'react';
import './CategoryGrid.css';

const categories = [
    { id: 1, name: 'Fresh Fruits', icon: '🍎', count: 15, color: '#fef1f1' },
    { id: 2, name: 'Vegetables', icon: '🥦', count: 22, color: '#eefaf1' },
    { id: 3, name: 'Meat & Seafood', icon: '🥩', count: 18, color: '#f1f6ff' },
    { id: 4, name: 'Bakery', icon: '🍞', count: 12, color: '#fff9e6' },
    { id: 5, name: 'Beverages', icon: '🥤', count: 25, color: '#f2f2f2' },
    { id: 6, name: 'Dairy & Eggs', icon: '🥚', count: 10, color: '#f9f1ff' },
];

const CategoryGrid = () => {
    return (
        <section className="category-section section-padding">
            <div className="container">
                <div className="section-title text-center">
                    <span className="subtitle">Famous Brands</span>
                    <h2>Browse By <span>Categories</span></h2>
                </div>

                <div className="category-grid">
                    {categories.map(category => (
                        <div key={category.id} className="category-item" style={{ '--bg-hover': category.color }}>
                            <div className="category-icon">{category.icon}</div>
                            <div className="category-info">
                                <h4>{category.name}</h4>
                                <p>{category.count} Products</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategoryGrid;
