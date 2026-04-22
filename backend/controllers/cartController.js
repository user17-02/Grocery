const asyncHandler = require('express-async-handler');
const Cart = require('../models/cartModel');

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
const getCart = asyncHandler(async (req, res) => {
    const cart = await Cart.findOne({ user: req.user._id });

    if (cart) {
        res.json(cart.cartItems);
    } else {
        res.json([]);
    }
});

const addToCart = asyncHandler(async (req, res) => {
    const { product, name, qty, price, image, countInStock } = req.body;
    console.log('Adding to cart - User:', req.user._id, 'Product:', product, 'Qty:', qty);

    let cart = await Cart.findOne({ user: req.user._id });

    if (cart) {
        console.log('Existing cart found');
        const itemIndex = cart.cartItems.findIndex(
            (item) => item.product.toString() === product
        );

        if (itemIndex > -1) {
            console.log('Item exists, incrementing qty');
            cart.cartItems[itemIndex].qty += qty;
        } else {
            console.log('New item, pushing to array');
            cart.cartItems.push({ product, name, qty, price, image, countInStock });
        }
    } else {
        console.log('No cart found, creating new one');
        cart = new Cart({
            user: req.user._id,
            cartItems: [{ product, name, qty, price, image, countInStock }],
        });
    }

    try {
        const updatedCart = await cart.save();
        console.log('Cart saved successfully. Items count:', updatedCart.cartItems.length);
        res.status(201).json(updatedCart.cartItems);
    } catch (error) {
        console.error('Error saving cart:', error);
        res.status(500);
        throw new Error('Failed to save cart');
    }
});

// @desc    Remove item from cart
// @route   DELETE /api/cart/:id
// @access  Private
const removeFromCart = asyncHandler(async (req, res) => {
    const cart = await Cart.findOne({ user: req.user._id });

    if (cart) {
        cart.cartItems = cart.cartItems.filter(
            (item) => item.product.toString() !== req.params.id
        );

        const updatedCart = await cart.save();
        res.json(updatedCart.cartItems);
    } else {
        res.status(404);
        throw new Error('Cart not found');
    }
});

// @desc    Clear cart
// @route   DELETE /api/cart
// @access  Private
const clearCart = asyncHandler(async (req, res) => {
    const cart = await Cart.findOne({ user: req.user._id });

    if (cart) {
        cart.cartItems = [];
        await cart.save();
        res.json({ message: 'Cart cleared' });
    } else {
        res.status(404);
        throw new Error('Cart not found');
    }
});

module.exports = {
    getCart,
    addToCart,
    removeFromCart,
    clearCart,
};
