const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel');

// @desc    Create new contact message
// @route   POST /api/contact
// @access  Public
const createContact = asyncHandler(async (req, res) => {
    const { name, email, message } = req.body;

    const contact = new Contact({
        name,
        email,
        message,
    });

    const createdContact = await contact.save();
    res.status(201).json(createdContact);
});


const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({});
    res.json(contacts);
});

// @desc    Delete contact message
// @route   DELETE /api/contact/:id
// @access  Private/Admin
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);

    if (contact) {
        await contact.deleteOne();
        res.json({ message: 'Message removed' });
    } else {
        res.status(404);
        throw new Error('Message not found');
    }
});

module.exports = {
    createContact,
    getContacts,
    deleteContact
};
