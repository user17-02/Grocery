const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

const fs = require('fs');
const path = require('path');

const errorHandler = (err, req, res, next) => {
    const errorMsg = `[${new Date().toISOString()}] ${req.method} ${req.originalUrl}\n${err.stack}\n\n`;
    fs.appendFileSync(path.join(__dirname, '../error_debug.log'), errorMsg);

    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};

module.exports = { notFound, errorHandler };
