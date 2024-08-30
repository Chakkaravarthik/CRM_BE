import express from 'express';
import { CustomerModel } from '../../Db_Utils/model.js';
import jwt from 'jsonwebtoken'

const CustomerRouter = express.Router();

//custoemr get api

CustomerRouter.get('/', async (req,res)=>{
    try {
      
        const customers = await CustomerModel.find({});
        if(!customers){
            res.status(200).send({msg:"customer not available"});
        }
        res.status(200).send( customers );

    } catch (e) {
        // Log the error message for debugging
        console.error('Error fetching customers:', e.message);
        
        // Send a 500 status code with an error message
        res.status(500).send({ msg: 'Something went wrong' });
    }
})


CustomerRouter.post('/', async (req,res)=>{
    const {name,email,phone,address,contact_preferences,textile_preferences} = req.body;
    const {token}=req.body;
    console.log('token',token)
    try{
        if(name && email && phone){
            const customerobj = await CustomerModel.findOne({email:email})
            
            if(!customerobj){
                const newcustomer = new CustomerModel({
                    name,email,phone,address,contact_preferences,textile_preferences,
                    id:Date.now().toString(),
                })
    
                const newcus = await newcustomer.save() //validtae and save
                res.status(200).send({msg:'Customer Data added', code:1})
            }else{
                res.status(400).send({msg:'Customer email already added'})
                console.log(customerobj)
            }
            
        }else if(token){
            const data = await jwt.verify(token, process.env.JWT_SECRET);
            const singlecustomerobj = await CustomerModel.findOne({email:data.email})
            res.status(200).send({msg:'Customer Data added', code:1, singlecustomerobj})
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