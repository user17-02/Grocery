const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');
const User = require('./models/userModel');
const connectDB = require('./config/db');
const bcrypt = require('bcryptjs');

dotenv.config();
connectDB();

const createTestUser = async () => {
    try {
        const email = 'alice@example.com';
        const userExists = await User.findOne({ email });

        if (userExists) {
            console.log('User already exists');
            process.exit();
        }

        const user = await User.create({
            name: 'Alice Smith',
            email: email,
            password: 'password123', // Will be hashed by pre-save hook
            isAdmin: false
        });

        console.log('User created:', user.name);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
};

createTestUser();
