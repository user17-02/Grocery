import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ProductCard.css';
import { FiEye, FiHeart, FiRefreshCw, FiShoppingCart } from 'react-icons/fi';
import cartApi from '../../api/cartApi';
import wishlistApi from '../../api/wishlistApi';

const ProductCard = ({ product }) => {
    const navigate = useNavigate();

    const handleAddToCart = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        const userInfo = localStorage.getItem('userInfo')
            ? JSON.parse(localStorage.getItem('userInfo'))
            : null;

        if (!userInfo) {
            navigate('/login');
            return;
        }

        try {
            await cartApi.addToCart({
                product: product._id,
                name: product.name,
                image: product.image,
                price: product.price,
                countInStock: product.countInStock,
                qty: 1
            });
            window.dispatchEvent(new Event('cart-updated'));
            alert('Added to cart!');
        } catch (err) {
            alert('Failed to add to cart');
        }
    };

    const handleAddToWishlist = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        const userInfo = localStorage.getItem('userInfo')
            ? JSON.parse(localStorage.getItem('userInfo'))
            : null;

        if (!userInfo) {
            navigate('/login');
            return;
        }

        try {
            await wishlistApi.addToWishlist({
                product: product._id,
                name: product.name,
                image: product.image,
                price: product.price
            });
            window.dispatchEvent(new Event('wishlist-updated'));
            alert('Added to wishlist!');
        } catch (err) {
            alert('Failed to add to wishlist');
        }
    };

    return (
        <div className={`product-card ${product.isSoldOut ? 'sold-out' : ''}`}>
            <div className="product-image-box">
                {product.isSoldOut && <span className="soldout-badge">SOLDOUT</span>}
                <Link to={`/product/${product._id}`}>
                    <img src={product.image?.startsWith('http') ? product.image : `http://localhost:5000${product.image}`} alt={product.name} />
                </Link>
                <div className="product-actions">
                    <button title="Quick View"><FiEye /></button>
                    <button title="Wishlist" onClick={handleAddToWishlist}><FiHeart /></button>
                    <button title="Compare"><FiRefreshCw /></button>
                    <button title="Add to Cart" onClick={handleAddToCart} disabled={product.countInStock === 0}>
                        <FiShoppingCart />
                    </button>
                </div>
            </div>
            <div className="product-details">
                <div className="product-rating">
                    {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < product.rating ? 'star filled' : 'star'}>
                            {i < product.rating ? '★' : '☆'}
                        </span>
                    ))}
                </div>
                <h3 className="product-name">
                    <Link to={`/product/${product._id}`}>{product.name}</Link>
                </h3>
                <div className="product-price">
                    <span className="current-price">${product.price.toFixed(2)}</span>
                    {product.oldPrice && <span className="old-price">${product.oldPrice.toFixed(2)}</span>}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
