const asyncHandler = require('express-async-handler');
const Wishlist = require('../models/wishlistModel');

// @desc    Get user wishlist
// @route   GET /api/wishlist
// @access  Private
const getWishlist = asyncHandler(async (req, res) => {
    const wishlist = await Wishlist.findOne({ user: req.user._id });

    if (wishlist) {
        res.json(wishlist.wishlistItems);
    } else {
        res.json([]);
    }
});

// @desc    Add item to wishlist
// @route   POST /api/wishlist
// @access  Private
const addToWishlist = asyncHandler(async (req, res) => {
    const { product, name, price, image } = req.body;

    let wishlist = await Wishlist.findOne({ user: req.user._id });

    if (wishlist) {
        const itemExists = wishlist.wishlistItems.find(
            (item) => item.product.toString() === product
        );

        if (itemExists) {
            res.status(400);
            throw new Error('Product already in wishlist');
        } else {
            wishlist.wishlistItems.push({ product, name, price, image });
        }
    } else {
        wishlist = new Wishlist({
            user: req.user._id,
            wishlistItems: [{ product, name, price, image }],
        });
    }

    const updatedWishlist = await wishlist.save();
    res.status(201).json(updatedWishlist.wishlistItems);
});

// @desc    Remove item from wishlist
// @route   DELETE /api/wishlist/:id
// @access  Private
const removeFromWishlist = asyncHandler(async (req, res) => {
    const wishlist = await Wishlist.findOne({ user: req.user._id });

    if (wishlist) {
        wishlist.wishlistItems = wishlist.wishlistItems.filter(
            (item) => item.product.toString() !== req.params.id
        );

        const updatedWishlist = await wishlist.save();
        res.json(updatedWishlist.wishlistItems);
    } else {
        res.status(404);
        throw new Error('Wishlist not found');
    }
});

module.exports = {
    getWishlist,
    addToWishlist,
    removeFromWishlist,
};
