const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');
};

const User = require('./models/userModel');

const run = async () => {
    await connectDB();

    const users = await User.find({}).select('+password');
    console.log('\n=== Users in DB ===');
    for (const u of users) {
        console.log(`Email: ${u.email}`);
        console.log(`Password hash: ${u.password}`);
        const match = await bcrypt.compare('password123', u.password);
        console.log(`password123 matches: ${match}`);
        console.log('---');
    }

    mongoose.disconnect();
};

run().catch(console.error);
