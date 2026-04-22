import React, { useState, useEffect } from 'react';
import './BestSale.css';
import ProductCard from '../Product/ProductCard';
import productApi from '../../api/productApi';

const BestSale = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await productApi.getAll();
                if (response && response.products) {
                    setProducts(response.products.slice(0, 4));
                }
            } catch (error) {
                console.error('Failed to fetch products', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <section className="best-sale section-padding">
            <div className="container">
                <div className="section-header text-center">
                    <h2 className="section-title">BEST SALE</h2>
                    <p className="section-subtitle">
                        All best seller product are now available for you and your <br />
                        can buy this product from here any time any where so sop <br />
                        now
                    </p>
                </div>
                <div className="best-sale-grid">
                    {products.map(product => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BestSale;
