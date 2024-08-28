import express from 'express';
import jwt from 'jsonwebtoken';
import { CustomerModel, FeedbackModel} from '../../Db_Utils/model.js';
import purchaseRouter from './purchase.js';

const feedbackupdateRouter = express.Router();

feedbackupdateRouter.post('/', async (req,res)=>{
    const {token,feedback} = req.body;
    try{
        const pur_data = await jwt.verify(token, process.env.JWT_SECRET);
        // 
        const customerobj = await CustomerModel.findOne({id:pur_data.customerid});
        if(customerobj){
            const purchasefeedback = new FeedbackModel({
                id:Date.now().toString(),
                purchase_id:pur_data.purchase_id,
                customer_id:pur_data.customerid,
                Customer_name:customerobj.name,
                Feedback:feedback,
            })

            const resp = await purchasefeedback.save();

            res.status(200).send({msg:"feedback sebmitted", code:1})

        }else{
            res.status(400).send({msg:'customer data not match'})
        }
    }catch(e){
        console.log(e)
        res.status(400).send({msg:'error'})
    }
})

feedbackupdateRouter.get('/', async (req,res)=>{
    try{
        const feedback = await FeedbackModel.find({})
        res.status(200).send(feedback);
    }catch(e){
        console.log(e)
    }
})

export default feedbackupdateRouter;