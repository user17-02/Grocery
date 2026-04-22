const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');
const User = require('./models/userModel');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const listUsers = async () => {
    try {
        const users = await User.find({});
        console.log('--- USERS IN DB ---'.green.bold);
        users.forEach(u => {
            console.log(`ID: ${u._id}, Name: ${u.name}, Email: ${u.email}, Admin: ${u.isAdmin}`);
        });
        console.log('-------------------'.green.bold);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
};

listUsers();
