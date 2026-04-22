const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Order = require('../models/orderModel');
const Product = require('../models/productModel');

// @desc    Get dashboard stats
// @route   GET /api/admin/stats
// @access  Private/Admin
const getDashboardStats = asyncHandler(async (req, res) => {
    const usersCount = await User.countDocuments();
    const productsCount = await Product.countDocuments();
    const ordersCount = await Order.countDocuments();

    const orders = await Order.find();
    const totalRevenue = orders.reduce((acc, order) => acc + (order.isPaid ? order.totalPrice : 0), 0);

    const recentOrders = await Order.find().sort({ createdAt: -1 }).limit(5).populate('user', 'name');

    res.json({
        usersCount,
        productsCount,
        ordersCount,
        totalRevenue,
        recentOrders
    });
});

module.exports = {
    getDashboardStats
};
