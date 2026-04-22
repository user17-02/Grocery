const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/userModel');
const connectDB = require('./config/db');
const bcrypt = require('bcryptjs');
require('colors');

dotenv.config();

const run = async () => {
    try {
        await connectDB();
        console.log('DB Connected for verification');

        const admin = await User.findOne({ email: 'admin@example.com' });
        if (!admin) {
            console.log('Admin user NOT found');
        } else {
            console.log('Admin user found');
            console.log('Stored password:', admin.password);
            const isMatch = await bcrypt.compare('password123', admin.password);
            console.log('Password match with bcrypt:', isMatch);

            // Check if it's plain text
            if (admin.password === 'password123') {
                console.log('CRITICAL: Password is stored as PLAIN TEXT');
            }
        }
        process.exit();
    } catch (error) {
        console.error('Verification Error:', error);
        process.exit(1);
    }
};

run();
