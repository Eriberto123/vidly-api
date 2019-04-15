const express = require('express');
const customerRouter = express.Router();
const Joi = require('joi');
const Customer = require('../schemas/customer');

customerRouter.get('/', async (req, res) => {
    let customers = await Customer.find().sort({ name: 1 }).exec()
    res.send(customers);
});

customerRouter.get('/:id', async (req, res) => {
    let customer = await Customer.findById(req.params.id).exec();
    if (!customer) res.status(404).send('The customer with the given ID was not found');
    res.send(customer);
});

customerRouter.post('/', async (req, res) => {
    try {
        let { error } = validateSchema(req.body);
        if (error) res.status(400).send(error.details[0].message);
        let customer = new Customer({
            name: req.body.name,
            isGold: req.body.isGold,
            phone: req.body.phone
        });  
        await customer.validate();
        customer = await customer.save();
        res.send(customer);
    } catch (error) {
        console.error(error);
    }
});

customerRouter.put('/:id', async (req, res) => {

    let { error } = validateSchema(req.body);
    if (error) res.status(400).send(error.details[0].message);

    let customer = await Customer.findOneAndUpdate(req.params.id, {
        $set: {
            isGold: req.body.isGold,
            name: req.body.name,
            phone: req.body.phone
        }
    });

    if (!customer) res.status(404).send('The customer with the given ID was not found');

    res.send(customer);

});


customerRouter.delete('/:id', async (req, res) => {
    let deleted = await Customer.findOneAndDelete(req.params.id);
    if (!deleted) res.status(404).send('The customer with the given ID was not found');
    res.send(deleted);
});

function validateSchema(customer) {
    const customerSchema = {
        name: Joi.string().min(3).required(),
        isGold: Joi.boolean().required(),
        phone: Joi.string().required()
    };

    return Joi.validate(customer, customerSchema);
}

module.exports = customerRouter;