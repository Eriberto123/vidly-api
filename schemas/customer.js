const mongoose = require('mongoose');
const Joi = require('joi');

const Customer = mongoose.model('Customer', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    isGold: {
        type: Boolean,
        required: true
    },
    phone: {
        type: String,
        required: true,
    }
}));

function validateCustomer(customer) {
    const customerSchema = {
        name: Joi.string().min(3).max(50).required(),
        isGold: Joi.boolean().required(),
        phone: Joi.string().min(3).max(50).required()
    };

    return Joi.validate(customer, customerSchema);
}


module.exports = {
    Customer: Customer,
    validate: validateCustomer
};