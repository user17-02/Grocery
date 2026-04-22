import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Wishlist.css';
import { FiX } from 'react-icons/fi';
import breadcrumbBg from '../../assets/1-1 (2).webp';
import NeedHelp from '../../components/Home/NeedHelp';
import wishlistApi from '../../api/wishlistApi';
import cartApi from '../../api/cartApi';

const Wishlist = () => {
    const [wishlistItems, setWishlistItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchWishlist();
    }, []);

    const fetchWishlist = async () => {
        try {
            const data = await wishlistApi.getWishlist();
            setWishlistItems(data || []);
            setLoading(false);
        } catch (err) {
            console.error('Failed to fetch wishlist');
            setLoading(false);
        }
    };

    const removeItem = async (id) => {
        try {
            await wishlistApi.removeFromWishlist(id);
            setWishlistItems(prevItems => prevItems.filter(item => item.product !== id));
            window.dispatchEvent(new Event('wishlist-updated'));
        } catch (err) {
            alert('Failed to remove item');
        }
    };

    const handleAddToCart = async (item) => {
        const userInfo = localStorage.getItem('userInfo')
            ? JSON.parse(localStorage.getItem('userInfo'))
            : null;

        if (!userInfo) {
            navigate('/login');
            return;
        }

        try {
            await cartApi.addToCart({
                product: item.product,
                name: item.name,
                image: item.image,
                price: item.price,
                countInStock: 10, // Default if not provided
                qty: 1
            });
            await removeItem(item.product);
            window.dispatchEvent(new Event('cart-updated'));
            window.dispatchEvent(new Event('wishlist-updated'));
            alert('Added to cart and removed from wishlist!');
        } catch (err) {
            alert('Failed to add to cart');
        }
    };

    if (loading) return <div className="container section-padding"><p>Loading wishlist...</p></div>;

    return (
        <div className="wishlist-page">
            {/* Breadcrumb Section */}
            <section className="shop-breadcrumb" style={{ backgroundImage: `url("${breadcrumbBg}")` }}>
                <div className="container">
                    <div className="breadcrumb-content">
                        <h2 className="breadcrumb-title">Wishlist</h2>
                        <nav className="breadcrumb-nav">
                            <Link to="/">Home</Link>
                            <span className="separator">&gt;</span>
                            <span className="current">Wishlist</span>
                        </nav>
                    </div>
                </div>
            </section>

            {/* Wishlist Area */}
            <section className="wishlist-main-area section-padding">
                <div className="container">
                    <div className="wishlist-table-wrapper">
                        <table className="cart-table wishlist-table">
                            <thead>
                                <tr>
                                    <th className="pro-remove">Remove</th>
                                    <th className="pro-thumbnail">Image</th>
                                    <th className="pro-title">Product</th>
                                    <th className="pro-price">Unit Price</th>
                                    <th className="pro-stock">Stock Status</th>
                                    <th className="pro-add-cart">Add to Cart</th>
                                </tr>
                            </thead>
                            <tbody>
                                {wishlistItems.length > 0 ? (
                                    wishlistItems.map(item => (
                                        <tr key={item.product}>
                                            <td className="pro-remove">
                                                <button onClick={() => removeItem(item.product)}><FiX /></button>
                                            </td>
                                            <td className="pro-thumbnail">
                                                <Link to={`/product/${item.product}`}>
                                                    <img src={item.image?.startsWith('http') ? item.image : `http://localhost:5000${item.image}`} alt={item.name} />
                                                </Link>
                                            </td>
                                            <td className="pro-title">
                                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                                            </td>
                                            <td className="pro-price"><span>${item.price.toFixed(2)}</span></td>
                                            <td className="pro-stock"><span>In Stock</span></td>
                                            <td className="pro-add-cart">
                                                <button className="add-cart-btn" onClick={() => handleAddToCart(item)}>ADD TO CART</button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="empty-msg">No items in your wishlist</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            <NeedHelp />
        </div>
    );
};

export default Wishlist;
