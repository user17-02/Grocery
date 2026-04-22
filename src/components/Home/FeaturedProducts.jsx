import React, { useEffect, useState } from 'react';
import ProductCard from '../Product/ProductCard';
import './FeaturedProducts.css';
import productApi from '../../api/productApi';

const FeaturedProducts = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await productApi.getAll();
                // The API returns { products: [], page, pages }
                // So we need to access response.products
                if (response && response.products) {
                    setProducts(response.products);
                }
            } catch (error) {
                console.error('Failed to fetch products', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <section className="featured-products section-padding">
            <div className="container">
                <div className="section-header text-center">
                    <h2 className="section-title">FEATURED PRODUCTS</h2>
                    <p className="section-subtitle">
                        All best seller product are now available for you and your <br />
                        can buy this product from here any time any where so sop <br />
                        now
                    </p>
                </div>

                <div className="products-grid">
                    {products.map(product => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedProducts;
