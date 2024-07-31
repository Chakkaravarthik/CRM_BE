import express from 'express';
import { CustomerModel } from '../../Db_Utils/model.js';

const CustomerRouter = express.Router();

//custoemr get api

CustomerRouter.get('/', async (req,res)=>{
    try {
        // Fetch all customers from the database
        const customers = await CustomerModel.find({});
        
        // Send the customer data as JSON
        if(!customers){
            res.status(200).send({msg:"customer not available"});
        }
        res.status(200).send( customers );
        
        // Log for debugging purposes
        console.log('API hit successfully');
    } catch (e) {
        // Log the error message for debugging
        console.error('Error fetching customers:', e.message);
        
        // Send a 500 status code with an error message
        res.status(500).send({ msg: 'Something went wrong' });
    }
})

export default CustomerRouter;