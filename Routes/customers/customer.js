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


CustomerRouter.post('/', async (req,res)=>{
    const customerdata = req.body;
    try{
        if(customerdata){
            console.log(customerdata)
            const customerobj = await CustomerModel.findOne({email: customerdata.email})
            
            if(!customerobj){
                const newcustomer = new CustomerModel({
                    ...customerdata,
                    id:Date.now().toString(),
                })
    
                const newcus = await newcustomer.save() //validtae and save
                res.status(200).send({msg:'Customer Data added', code:1, newcus})
            }else{
                res.status(400).send({msg:'Customer email already added'})
                console.log(customerobj)
            }
            
        }else{
            res.status(400).send({msg:'customer data missing', code :0})
        }
    }catch(e){
        console.log(e.message)
    }
})

CustomerRouter.get('/customerId', async (req,res)=>{
    const {customerId}= req.params
    try{
        if(customerId){
            const customerobject = CustomerModel.find({id:customerId})
            if(customerobject){
                res.status(200).send(customerobject);
            }else{
                res.status(400).send({msg:'custoemr not available'})
            }
        }else{
            res.status(400).send({msg:'customer id not received'})
        }
    }catch(e){
        console.log(e.message);
    }
})

export default CustomerRouter;