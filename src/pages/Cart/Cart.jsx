import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Cart.css';
import { FiX, FiMinus, FiPlus } from 'react-icons/fi';
import breadcrumbBg from '../../assets/1-1 (2).webp';
import NeedHelp from '../../components/Home/NeedHelp';
import cartApi from '../../api/cartApi';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        try {
            const data = await cartApi.getCart();
            setCartItems(data);
            setLoading(false);
        } catch (err) {
            console.error('Failed to fetch cart');
            setLoading(false);
        }
    };

    const handleQuantityChange = async (productId, currentQty, type, productData) => {
        const newQty = type === 'inc' ? currentQty + 1 : currentQty - 1;
        if (newQty < 1) return;
        if (productData.countInStock && newQty > productData.countInStock) return;
        try {
            const updatedItems = await cartApi.addToCart({
                product: productId,
                qty: newQty,
                name: productData.name,
                image: productData.image,
                price: productData.price,
                countInStock: productData.countInStock
            });
            setCartItems(updatedItems);
            window.dispatchEvent(new Event('cart-updated'));
        } catch (err) {
            alert('Failed to update quantity');
        }
    };

    const removeItem = async (id) => {
        try {
            const updatedItems = await cartApi.removeFromCart(id);
            setCartItems(updatedItems);
            window.dispatchEvent(new Event('cart-updated'));
        } catch (err) {
            alert('Failed to remove item');
        }
    };

    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);

    if (loading) return <div className="container section-padding"><p>Loading cart...</p></div>;

    return (
        <div className="cart-page">
            {/* Breadcrumb Section */}
            <section className="shop-breadcrumb" style={{ backgroundImage: `url("${breadcrumbBg}")` }}>
                <div className="container">
                    <div className="breadcrumb-content">
                        <h2 className="breadcrumb-title">Shopping Cart</h2>
                        <nav className="breadcrumb-nav">
                            <Link to="/">Home</Link>
                            <span className="separator">&gt;</span>
                            <span className="current">Cart</span>
                        </nav>
                    </div>
                </div>
            </section>

            {/* Cart Table Area */}
            <section className="cart-main-area section-padding">
                <div className="container">
                    {cartItems.length === 0 ? (
                        <div className="empty-cart-message">
                            <h3>Your cart is empty</h3>
                            <Link to="/shop" className="update-cart-btn" style={{ display: 'inline-block', marginTop: '20px' }}>Go Shopping</Link>
                        </div>
                    ) : (
                        <>
                            <div className="cart-table-wrapper">
                                <table className="cart-table">
                                    <thead>
                                        <tr>
                                            <th className="pro-thumbnail">Image</th>
                                            <th className="pro-title">Product</th>
                                            <th className="pro-price">Price</th>
                                            <th className="pro-quantity">Quantity</th>
                                            <th className="pro-subtotal">Total</th>
                                            <th className="pro-remove">Remove</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartItems.map(item => (
                                            <tr key={item.product}>
                                                <td className="pro-thumbnail">
                                                    <Link to={`/product/${item.product}`}><img src={item.image} alt={item.name} /></Link>
                                                </td>
                                                <td className="pro-title">
                                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                </td>
                                                <td className="pro-price"><span>${item.price.toFixed(2)}</span></td>
                                                <td className="pro-quantity">
                                                    <div className="quantity-selector">
                                                        <button onClick={() => handleQuantityChange(item.product, item.qty, 'dec', item)}><FiMinus /></button>
                                                        <input type="text" value={item.qty} readOnly />
                                                        <button onClick={() => handleQuantityChange(item.product, item.qty, 'inc', item)}><FiPlus /></button>
                                                    </div>
                                                </td>
                                                <td className="pro-subtotal"><span>${(item.price * item.qty).toFixed(2)}</span></td>
                                                <td className="pro-remove">
                                                    <button onClick={() => removeItem(item.product)}><FiX /></button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="cart-actions-wrapper">
                                <div className="coupon-area">
                                    <input type="text" placeholder="Enter your coupon code" />
                                    <button className="apply-coupon-btn">APPLY COUPON</button>
                                </div>
                                <button className="update-cart-btn" onClick={fetchCart}>UPDATE CART</button>
                            </div>

                            <div className="cart-totals-wrapper">
                                <div className="cart-totals">
                                    <h3>Cart Totals</h3>
                                    <div className="totals-row">
                                        <span>Subtotal</span>
                                        <span>${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="totals-row total">
                                        <span>Total</span>
                                        <span>${subtotal.toFixed(2)}</span>
                                    </div>
                                    <button
                                        className="checkout-btn"
                                        onClick={() => navigate('/checkout')}
                                    >
                                        PROCEED TO CHECKOUT
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </section>

            <NeedHelp />
        </div>
    );
};

export default Cart;
