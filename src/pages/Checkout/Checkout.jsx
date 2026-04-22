import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Checkout.css';
import breadcrumbBg from '../../assets/1-1 (2).webp';
import NeedHelp from '../../components/Home/NeedHelp';
import cartApi from '../../api/cartApi';
import orderApi from '../../api/orderApi';
import paymentApi from '../../api/paymentApi';

const Checkout = () => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);
    const [billingDetails, setBillingDetails] = useState({
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        postalCode: '',
        country: 'United States',
        phone: '',
        email: ''
    });

    const [paymentMethod, setPaymentMethod] = useState('COD');
    const [paymentData, setPaymentData] = useState({
        cardNumber: '',
        expiry: '',
        cvc: '',
        upiId: ''
    });

    useEffect(() => {
        const fetchCartData = async () => {
            try {
                const data = await cartApi.getCart();
                setCartItems(data);
                if (data.length === 0) {
                    navigate('/cart');
                }
                setLoading(false);
            } catch (err) {
                console.error('Failed to fetch cart');
                setLoading(false);
            }
        };
        fetchCartData();
    }, [navigate]);

    const handleInputChange = (e) => {
        setBillingDetails({
            ...billingDetails,
            [e.target.name]: e.target.value
        });
    };

    const handlePaymentDataChange = (e) => {
        setPaymentData({
            ...paymentData,
            [e.target.name]: e.target.value
        });
    };

    const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
    const shippingPrice = itemsPrice > 100 ? 0 : 10;
    const taxPrice = Number((0.15 * itemsPrice).toFixed(2));
    const totalPrice = itemsPrice + shippingPrice + taxPrice;

    const placeOrderHandler = async () => {
        if (!billingDetails.address || !billingDetails.city || !billingDetails.email) {
            alert('Please fill in all required billing details');
            return;
        }

        setProcessing(true);
        try {
            // 1. Create the order
            const order = {
                orderItems: cartItems,
                shippingAddress: {
                    address: billingDetails.address,
                    city: billingDetails.city,
                    postalCode: billingDetails.postalCode,
                    country: billingDetails.country,
                },
                paymentMethod: paymentMethod,
                itemsPrice: itemsPrice,
                shippingPrice: shippingPrice,
                taxPrice: taxPrice,
                totalPrice: totalPrice,
            };

            const createdOrder = await orderApi.createOrder(order);

            // 2. Process Dummy Payment
            const payRes = await paymentApi.processPayment({
                paymentMethod,
                paymentData
            });

            // 3. Update Order to Paid / Confirmed in DB
            await orderApi.payOrder(createdOrder._id, {
                id: payRes.transactionId,
                status: payRes.paymentStatus,
                update_time: new Date().toISOString(),
                email_address: billingDetails.email
            });

            // 4. Clear cart
            try {
                await cartApi.clearCart();
            } catch (clearErr) {
                console.error('Non-critical: Failed to clear cart explicitly');
            }

            window.dispatchEvent(new Event('cart-updated'));
            setProcessing(false);
            navigate(`/order-success?id=${createdOrder._id}`);
        } catch (err) {
            setProcessing(false);
            alert(err.response?.data?.message || err.message);
        }
    };

    if (loading) return <div className="container section-padding"><p>Loading order details...</p></div>;

    return (
        <div className="checkout-page">
            {/* Breadcrumb Section */}
            <section className="shop-breadcrumb" style={{ backgroundImage: `url("${breadcrumbBg}")` }}>
                <div className="container">
                    <div className="breadcrumb-content">
                        <h2 className="breadcrumb-title">Checkout</h2>
                        <nav className="breadcrumb-nav">
                            <Link to="/">Home</Link>
                            <span className="separator">&gt;</span>
                            <span className="current">Checkout</span>
                        </nav>
                    </div>
                </div>
            </section>

            {/* Checkout Area */}
            <section className="checkout-area section-padding">
                <div className="container">
                    <div className="checkout-wrapper">
                        {/* Left Side: Billing Details */}
                        <div className="billing-details-wrapper">
                            <h3>Billing Details</h3>
                            <form className="billing-form" onSubmit={(e) => e.preventDefault()}>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>First Name *</label>
                                        <input type="text" name="firstName" required onChange={handleInputChange} value={billingDetails.firstName} />
                                    </div>
                                    <div className="form-group">
                                        <label>Last Name *</label>
                                        <input type="text" name="lastName" required onChange={handleInputChange} value={billingDetails.lastName} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Country *</label>
                                    <select name="country" required onChange={handleInputChange} value={billingDetails.country}>
                                        <option value="United States">United States</option>
                                        <option value="United Kingdom">United Kingdom</option>
                                        <option value="Canada">Canada</option>
                                        <option value="India">India</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Street Address *</label>
                                    <input type="text" name="address" placeholder="House number and street name" required onChange={handleInputChange} value={billingDetails.address} />
                                </div>
                                <div className="form-group">
                                    <label>Town / City *</label>
                                    <input type="text" name="city" required onChange={handleInputChange} value={billingDetails.city} />
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Postcode / ZIP *</label>
                                        <input type="text" name="postalCode" required onChange={handleInputChange} value={billingDetails.postalCode} />
                                    </div>
                                    <div className="form-group">
                                        <label>Phone *</label>
                                        <input type="tel" name="phone" required onChange={handleInputChange} value={billingDetails.phone} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Email Address *</label>
                                    <input type="email" name="email" required onChange={handleInputChange} value={billingDetails.email} />
                                </div>
                            </form>
                        </div>

                        {/* Right Side: Order Summary */}
                        <div className="order-summary-wrapper">
                            <h3>Your order</h3>
                            <div className="order-total-table">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Product</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartItems.map((item) => (
                                            <tr key={item.product}>
                                                <td>{item.name}  × {item.qty}</td>
                                                <td>${(item.price * item.qty).toFixed(2)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot>
                                        <tr className="cart-subtotal">
                                            <th>Items Price</th>
                                            <td>${itemsPrice.toFixed(2)}</td>
                                        </tr>
                                        <tr className="cart-subtotal">
                                            <th>Shipping</th>
                                            <td>${shippingPrice.toFixed(2)}</td>
                                        </tr>
                                        <tr className="cart-subtotal">
                                            <th>Tax (15%)</th>
                                            <td>${taxPrice.toFixed(2)}</td>
                                        </tr>
                                        <tr className="order-total">
                                            <th>Order Total</th>
                                            <td><strong>${totalPrice.toFixed(2)}</strong></td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>

                            <div className="payment-method">
                                <h3>Payment Method</h3>
                                <div className="payment-accordion">
                                    <div className="payment-single">
                                        <input 
                                            type="radio" 
                                            name="payment" 
                                            id="method-cod" 
                                            value="COD"
                                            checked={paymentMethod === 'COD'}
                                            onChange={() => setPaymentMethod('COD')}
                                        />
                                        <label htmlFor="method-cod">Cash on Delivery (COD)</label>
                                        <div className="payment-content">
                                            <p>Pay with cash upon delivery.</p>
                                        </div>
                                    </div>
                                    <div className="payment-single">
                                        <input 
                                            type="radio" 
                                            name="payment" 
                                            id="method-upi" 
                                            value="UPI"
                                            checked={paymentMethod === 'UPI'}
                                            onChange={() => setPaymentMethod('UPI')}
                                        />
                                        <label htmlFor="method-upi">UPI</label>
                                        <div className="payment-content">
                                            <div className="dummy-input-group" style={{marginTop: '10px'}}>
                                                <input 
                                                    type="text" 
                                                    name="upiId" 
                                                    placeholder="Enter UPI ID (e.g. user@upi)" 
                                                    value={paymentData.upiId}
                                                    onChange={handlePaymentDataChange}
                                                    style={{width: '100%', padding: '10px', border: '1px solid #ddd'}}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="payment-single">
                                        <input 
                                            type="radio" 
                                            name="payment" 
                                            id="method-card" 
                                            value="Card"
                                            checked={paymentMethod === 'Card'}
                                            onChange={() => setPaymentMethod('Card')}
                                        />
                                        <label htmlFor="method-card">Card Payment</label>
                                        <div className="payment-content">
                                            <div className="dummy-input-group" style={{marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '10px'}}>
                                                <input 
                                                    type="text" 
                                                    name="cardNumber" 
                                                    placeholder="16 Digit Card Number" 
                                                    maxLength="16"
                                                    value={paymentData.cardNumber}
                                                    onChange={handlePaymentDataChange}
                                                    style={{width: '100%', padding: '10px', border: '1px solid #ddd'}}
                                                />
                                                <div style={{display: 'flex', gap: '10px'}}>
                                                    <input 
                                                        type="text" 
                                                        name="expiry" 
                                                        placeholder="MM/YY" 
                                                        value={paymentData.expiry}
                                                        onChange={handlePaymentDataChange}
                                                        style={{flex: 1, padding: '10px', border: '1px solid #ddd'}}
                                                    />
                                                    <input 
                                                        type="text" 
                                                        name="cvc" 
                                                        placeholder="CVC" 
                                                        maxLength="3"
                                                        value={paymentData.cvc}
                                                        onChange={handlePaymentDataChange}
                                                        style={{flex: 1, padding: '10px', border: '1px solid #ddd'}}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button 
                                    className="place-order-btn" 
                                    onClick={placeOrderHandler}
                                    disabled={processing}
                                >
                                    {processing ? 'PROCESSING...' : 'PAY NOW'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <NeedHelp />
        </div>
    );
};

export default Checkout;
