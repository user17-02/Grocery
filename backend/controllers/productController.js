const asyncHandler = require('express-async-handler');
const Product = require('../models/productModel');
const Category = require('../models/categoryModel');

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
    const pageSize = 50;
    const page = Number(req.query.pageNumber) || 1;

    console.log('GET PRODUCTS - pageSize:', pageSize, 'page:', page);

    const keyword = req.query.keyword
        ? {
            name: {
                $regex: req.query.keyword,
                $options: 'i',
            },
        }
        : {};

    const categoryFilter = req.query.category ? { category: req.query.category } : {};

    const count = await Product.countDocuments({ ...keyword, ...categoryFilter });
    const products = await Product.find({ ...keyword, ...categoryFilter })
        .populate('category', 'name')
        .sort({ createdAt: -1 })
        .limit(pageSize)
        .skip(pageSize * (page - 1));

    console.log('GET PRODUCTS - Count:', count, 'Products Length:', products.length);

    res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id).populate('category', 'name');

    if (product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        await product.deleteOne();
        res.json({ message: 'Product removed' });
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
    // Find a valid category to use as default if none provided
    let categoryId = (req.body && req.body.category) ? req.body.category : null;

    if (!categoryId) {
        const category = await Category.findOne({});
        if (category) {
            categoryId = category._id;
        } else {
            res.status(400);
            throw new Error('Please create at least one category first');
        }
    }

    const product = new Product({
        name: 'Sample name',
        price: 0,
        user: req.user._id,
        image: '/uploads/1.webp',
        brand: 'Sample brand',
        category: categoryId,
        countInStock: 0,
        numReviews: 0,
        description: 'Sample description',
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
    console.log('UPDATE PRODUCT START - ID:', req.params.id);
    console.log('Body:', req.body);

    const {
        name,
        price,
        description,
        image,
        brand,
        category,
        countInStock,
        discountPrice,
        isFeatured,
    } = req.body;

    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            product.name = name || product.name;
            product.price = (price !== undefined && price !== null) ? price : product.price;
            product.description = description || product.description;
            product.image = image || product.image;
            product.brand = brand || product.brand;
            product.category = category || product.category;
            product.countInStock = (countInStock !== undefined && countInStock !== null) ? countInStock : product.countInStock;
            product.discountPrice = (discountPrice !== undefined && discountPrice !== null) ? discountPrice : product.discountPrice;
            product.isFeatured = isFeatured !== undefined ? isFeatured : product.isFeatured;

            console.log('Fields set, attempting save...');
            const updatedProduct = await product.save();
            console.log('Product saved successfully');
            res.json(updatedProduct);
        } else {
            console.log('Product not found for ID:', req.params.id);
            res.status(404);
            throw new Error('Product not found');
        }
    } catch (error) {
        console.error('UPDATE PRODUCT ERROR:', error.message);
        console.error(error.stack);
        res.status(res.statusCode === 200 ? 500 : res.statusCode);
        res.json({
            message: error.message,
            stack: process.env.NODE_ENV === 'production' ? null : error.stack,
        });
    }
});

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
        const alreadyReviewed = product.reviews.find(
            (r) => r.user.toString() === req.user._id.toString()
        );

        if (alreadyReviewed) {
            res.status(400);
            throw new Error('Product already reviewed');
        }

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id,
        };

        product.reviews.push(review);

        product.calculateRating(); // Helper method on model

        await product.save();
        res.status(201).json({ message: 'Review added' });
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
const getTopProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({ rating: -1 }).limit(3);
    res.json(products);
});

module.exports = {
    getProducts,
    getProductById,
    deleteProduct,
    createProduct,
    updateProduct,
    createProductReview,
    getTopProducts,
};
