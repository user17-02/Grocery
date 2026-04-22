const asyncHandler = require('express-async-handler');

// @desc    Process payment
// @route   POST /api/payment
// @access  Private
const processPayment = asyncHandler(async (req, res) => {
    const { paymentMethod, paymentData } = req.body;

    if (!paymentMethod) {
        res.status(400);
        throw new Error('Payment method is required');
    }

    // Basic validation logic
    if (paymentMethod === 'Card') {
        const { cardNumber, expiry, cvc } = paymentData || {};
        if (!cardNumber || cardNumber.replace(/\s/g, '').length !== 16) {
            res.status(400);
            throw new Error('Invalid card number. Must be 16 digits.');
        }
        if (!expiry || !cvc) {
            res.status(400);
            throw new Error('Expiry and CVC are required for Card payment.');
        }
    } else if (paymentMethod === 'UPI') {
        const { upiId } = paymentData || {};
        const upiRegex = /^[\w.-]+@[\w.-]+$/;
        if (!upiId || !upiRegex.test(upiId)) {
            res.status(400);
            throw new Error('Invalid UPI ID format (example: user@upi).');
        }
    } else if (paymentMethod === 'COD') {
        // COD is always valid
    } else {
        res.status(400);
        throw new Error('Unsupported payment method');
    }

    // Generate a fake transaction ID
    const transactionId = 'TXN-' + Math.random().toString(36).substr(2, 9).toUpperCase();

    res.json({
        success: true,
        message: 'Payment processed successfully (Mock)',
        transactionId,
        paymentStatus: 'Paid'
    });
});

module.exports = {
    processPayment
};
