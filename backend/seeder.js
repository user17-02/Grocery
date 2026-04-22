const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');
const users = require('./data/users');
const products = require('./data/products');
const User = require('./models/userModel');
const Product = require('./models/productModel');
const Order = require('./models/orderModel');
const Category = require('./models/categoryModel');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const importData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();
        await Category.deleteMany();

        const createdUsers = await User.insertMany(users);
        const adminUser = createdUsers[0]._id;


        // Create Categories
        const categoriesData = [
            { name: 'Fruits', description: 'Fresh fruits', image: '/images/fruits.jpg' },
            { name: 'Vegetables', description: 'Fresh vegetables', image: '/images/vegetables.jpg' },
            { name: 'Dairy', description: 'Milk and cheese', image: '/images/dairy.jpg' },
        ];
        const createdCategories = await Category.insertMany(categoriesData);

        // Map category names to IDs
        const categoryMap = {};
        createdCategories.forEach(cat => {
            categoryMap[cat.name] = cat._id;
        });

        const sampleProducts = products.map((product) => {
            return {
                ...product,
                user: adminUser,
                category: categoryMap[product.category] // Map string category to ObjectId
            };
        });

        await Product.insertMany(sampleProducts);

        console.log('Data Imported!'.green.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();
        await Category.deleteMany();

        console.log('Data Destroyed!'.red.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
