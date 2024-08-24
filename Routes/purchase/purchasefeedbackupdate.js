import express from 'express';
import jwt from 'jsonwebtoken';
import { CustomerModel } from '../../Db_Utils/model.js';

const feedbackupdateRouter = express.Router();

feedbackupdateRouter.post('/', async (req,res)=>{
    const {token,feedback} = req.body;
    try{
        const pur_data = await jwt.verify(token, process.env.JWT_SECRET);
        console.log('token verified data:',pur_data); 
        // 
        const customerobj = await CustomerModel.findOne({id:pur_data.customerid});
        if(customerobj){
            const purchaseobj = customerobj.purchase_history.filter((p)=>{
                return p.purchase_id == pur_data.purchase_id; 
            })
            console.log('purdata',pur_data.purchase_id);
            if(purchaseobj){
                res.status(200).send({msg:'data', code:1})
                console.log(purchaseobj)
            }
        }else{
            res.status(400).send({msg:'customer data not match'})
        }
    }catch(e){
        console.log(e)
        res.status(400).send({msg:'error'})
    }
})

export default feedbackupdateRouter;