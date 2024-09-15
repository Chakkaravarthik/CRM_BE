import express from 'express';
import { CustomerModel } from '../../Db_Utils/model.js';
import jwt from 'jsonwebtoken';

const CustomerRouter = express.Router();

// Customer GET API
CustomerRouter.get('/', async (req, res) => {
    try {
        const customers = await CustomerModel.find({});
        if (!customers || customers.length === 0) {
            return res.status(200).send({ msg: "Customer not available" });
        }
        res.status(200).send(customers);
    } catch (e) {
        console.error('Error fetching customers:', e.message);
        res.status(500).send({ msg: 'Something went wrong' });
    }
});

// Customer POST API
CustomerRouter.post('/', async (req, res) => {
    const { name, email, phone, address, contact_preferences, textile_preferences, token } = req.body;
    console.log('token', token);

    try {
        if (name && email && phone) {
            const customerObj = await CustomerModel.findOne({ email });

            if (!customerObj) {
                const newCustomer = new CustomerModel({ id:Date.now().toString(),name, email, phone, address, contact_preferences, textile_preferences });
                const newCus = await newCustomer.save(); // Validate and save
                return res.status(200).send({ msg: 'Customer Data added', code: 1 });
            } else {
                return res.status(400).send({ msg: 'Customer already exists' });
            }
        } else if (token) {
            try {
                const data = await jwt.verify(token, process.env.JWT_SECRET);
                const singleCustomerObj = await CustomerModel.findOne({ email: data.email });
                return res.status(200).send({ msg: 'Customer Data fetched', code: 1, singleCustomerObj });
            } catch (e) {
                return res.status(400).send({ msg: 'Invalid token', code: 0 });
            }
        } else {
            return res.status(400).send({ msg: 'Customer data missing', code: 0 });
        }
    } catch (e) {
        console.log(e);
        res.status(500).send({ msg: 'Internal Server Error' });
    }
});

// Get customer by ID API
CustomerRouter.get('/:customerId', async (req, res) => {
    const { customerId } = req.params;
    try {
        if (customerId) {
            const customerObject = await CustomerModel.findOne({ id: customerId });
            if (customerObject) {
                return res.status(200).send(customerObject);
            } else {
                return res.status(400).send({ msg: 'Customer not available' });
            }
        } else {
            return res.status(400).send({ msg: 'Customer ID not received' });
        }
    } catch (e) {
        console.log(e.message);
        res.status(500).send({ msg: 'Internal Server Error' });
    }
});

// Update customer data API
CustomerRouter.put('/', async (req, res) => {
    try {
        const { type, editedCustomer } = req.body;
        if (type && editedCustomer) {
            const customer = await CustomerModel.findByIdAndUpdate(editedCustomer._id, editedCustomer, {
                new: true,
                runValidators: true,
            });
            if (customer) {
                return res.status(200).send({ msg: 'Customer Data updated', code: 1 ,customer});
            } else {
                return res.status(400).send({ msg: 'Customer not found' });
            }
        } else {
            return res.status(400).send({ msg: 'Customer not updated' });
        }
    } catch (e) {
        console.log(e);
        res.status(500).send({ msg: 'Internal Server Error' });
    }
});

export default CustomerRouter;
