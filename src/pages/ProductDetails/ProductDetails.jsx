import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductDetails.css';
import { FiStar, FiHeart, FiRefreshCw, FiMinus, FiPlus, FiFacebook, FiTwitter, FiLink, FiInstagram } from 'react-icons/fi';
import NeedHelp from '../../components/Home/NeedHelp';
import breadcrumbBg from '../../assets/1-1 (2).webp';
import productImg from '../../assets/1.webp';
import productApi from '../../api/productApi';
import cartApi from '../../api/cartApi';
import wishlistApi from '../../api/wishlistApi';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('description');
    const [addedToCart, setAddedToCart] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await productApi.getById(id);
                setProduct(data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch product details');
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleQuantityChange = (type) => {
        if (type === 'inc') {
            if (product && quantity < product.countInStock) {
                setQuantity(quantity + 1);
            }
        }
        else if (type === 'dec' && quantity > 1) setQuantity(quantity - 1);
    };

    const handleAddToCart = async () => {
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
                qty: quantity
            });
            window.dispatchEvent(new Event('cart-updated'));
            setAddedToCart(true);
            setTimeout(() => setAddedToCart(false), 3000);
        } catch (err) {
            alert('Failed to add to cart');
        }
    };

    if (loading) return <div className="container section-padding"><p>Loading product...</p></div>;
    if (error) return <div className="container section-padding"><p className="error-message">{error}</p></div>;
    if (!product) return <div className="container section-padding"><p>Product not found</p></div>;

    return (
        <div className="product-details-page">
            {/* Breadcrumb Section */}
            <section className="shop-breadcrumb" style={{ backgroundImage: `url("${breadcrumbBg}")` }}>
                <div className="container">
                    <div className="breadcrumb-content">
                        <h2 className="breadcrumb-title">{product.name}</h2>
                        <nav className="breadcrumb-nav">
                            <a href="/">Home</a>
                            <span className="separator">&gt;</span>
                            <span className="current">Product Details</span>
                        </nav>
                    </div>
                </div>
            </section>

            {/* Product Shop Area */}
            <section className="product-shop-area section-padding">
                <div className="container">
                    <div className="product-shop-wrapper">
                        {/* Left Side: Product Gallery */}
                        <div className="product-gallery">
                            <div className="main-image-wrapper">
                                <img src={product.image?.startsWith('http') ? product.image : `http://localhost:5000${product.image}`} alt={product.name} className="main-product-image" />
                            </div>
                        </div>

                        {/* Right Side: Product Info */}
                        <div className="product-shop-content">
                            <h2 className="product-title">{product.name}</h2>
                            <div className="product-rating">
                                {[...Array(5)].map((_, i) => (
                                    <FiStar key={i} className={i < product.rating ? 'filled' : ''} />
                                ))}
                                <span className="review-count">({product.numReviews} customer reviews)</span>
                            </div>
                            <div className="product-price">
                                <span className="current-price">${product.price.toFixed(2)}</span>
                                {product.oldPrice && <span className="old-price">${product.oldPrice.toFixed(2)}</span>}
                            </div>
                            <p className="short-description">
                                {product.description}
                            </p>

                            <div className="stock-info" style={{ marginBottom: '15px' }}>
                                Status: <span className={product.countInStock > 0 ? 'text-success' : 'text-danger'}>
                                    {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                </span>
                            </div>

                            <div className="product-actions-wrapper">
                                <div className="quantity-selector">
                                    <button onClick={() => handleQuantityChange('dec')}><FiMinus /></button>
                                    <input type="text" value={quantity} readOnly />
                                    <button onClick={() => handleQuantityChange('inc')}><FiPlus /></button>
                                </div>
                                <button
                                    className="add-to-cart-btn"
                                    onClick={handleAddToCart}
                                    disabled={product.countInStock === 0}
                                >
                                    {addedToCart ? 'ADDED!' : 'ADD TO CART'}
                                </button>
                            </div>

                            <div className="secondary-actions">
                                <button className="action-link" onClick={async () => {
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
                                }}><FiHeart /> Add to wishlist</button>
                                <button className="action-link"><FiRefreshCw /> Compare</button>
                            </div>

                            <button
                                className="buy-it-now-btn"
                                onClick={() => {
                                    handleAddToCart();
                                    navigate('/checkout');
                                }}
                                disabled={product.countInStock === 0}
                            >
                                BUY IT NOW
                            </button>

                            <div className="product-meta">
                                <p><strong>SKU:</strong> {product._id.substring(0, 8)}</p>
                                <p><strong>Category:</strong> <a href="#">{product.category?.name || 'Organic Food'}</a></p>
                                <p><strong>Tags:</strong> <a href="#">Fruits</a>, <a href="#">Vegetables</a></p>
                            </div>

                            <div className="share-links">
                                <span>Share:</span>
                                <a href="#"><FiFacebook /></a>
                                <a href="#"><FiTwitter /></a>
                                <a href="#"><FiInstagram /></a>
                                <a href="#"><FiLink /></a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Product Info Tabs */}
            <section className="product-info-tabs section-padding-bottom">
                <div className="container">
                    <div className="tabs-header">
                        <button className={activeTab === 'description' ? 'active' : ''} onClick={() => setActiveTab('description')}>Description</button>
                        <button className={activeTab === 'reviews' ? 'active' : ''} onClick={() => setActiveTab('reviews')}>Reviews</button>
                        <button className={activeTab === 'shipping' ? 'active' : ''} onClick={() => setActiveTab('shipping')}>Shipping Policy</button>
                        <button className={activeTab === 'size' ? 'active' : ''} onClick={() => setActiveTab('size')}>Size Chart</button>
                    </div>

                    <div className="tab-content">
                        {activeTab === 'description' && (
                            <div className="description-tab">
                                <p>{product.description}</p>
                            </div>
                        )}
                        {activeTab === 'reviews' && (
                            <div className="reviews-tab">
                                {/* Reviews rendering logic here */}
                                <p>No reviews yet.</p>
                            </div>
                        )}
                        {activeTab === 'shipping' && (
                            <div className="shipping-tab">
                                <h3>Shipping policy for our store</h3>
                                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>
                                <ul>
                                    <li>1-2 business days (Typically by end of day)</li>
                                    <li>30 days money back guaranty</li>
                                    <li>24/7 live support</li>
                                </ul>
                            </div>
                        )}
                        {activeTab === 'size' && (
                            <div className="size-tab">
                                <h3>Size Chart</h3>
                                <p>Standard size chart information goes here.</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <NeedHelp />
        </div>
    );
};

export default ProductDetails;
