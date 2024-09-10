import express from 'express'
import { CustomerModel, purchaseModel } from '../../Db_Utils/model.js';
import { mailOptions, transport } from '../../Mail_utils/mailutils.js';
import jwt from 'jsonwebtoken';

const purchaseRouter = express.Router();


purchaseRouter.get('/',async(req,res)=>{
    try{
        const purchasedata = await purchaseModel.find({});
        res.status(200).send(purchasedata)
    }catch(e){
        res.status(400).send({msg:'something went wrong'})
        console.log(e)
    }
})

purchaseRouter.post('/', async(req,res)=>{
    try{
        const data = req.body;
        const customerobj = await CustomerModel.findOne({id:data.selectedCustomer})
        if(customerobj){
            customerobj.purchase_history.push({
                purchase_id:Date.now().toString(),
                date:Date.now(),
                total_amount:data.totalAmount,
                payment_method:data.paymentType,
                items:{...data.selectedItem,item_id:data.selectedItem.id,quantity:data.quantity},
            })
            const response = await customerobj.save();
            const resp = response.toObject()

            //purchase data addition
            const purchase = await new purchaseModel({
                purchase_id:Date.now().toString(),
                date:Date.now(),
                total_amount:data.totalAmount,
                payment_method:data.paymentType,
                items:{...data.selectedItem,item_id:data.selectedItem.id,quantity:data.quantity},
                CustomerName:customerobj.name,
                customerid:customerobj.id,
            })

           
            const pres = await purchase.save();
            


            //jwt token creation 
            const token = jwt.sign(pres.toObject(), process.env.JWT_SECRET);

             //feedback mail to customer 
            await transport.sendMail({
                ...mailOptions,
                to:customerobj.email,
                subject:`Feedback for Purchase `,
                text : `link for feedback ${process.env.FE_URL}/purchasefeedbackcustomer?token=${token}`
             })



            res.status(200).send({msg:'Purchase updated in customer ',code:1})
        }else{
            res.status(400).send({msg:'customer not available'})
        }
        
    }catch(e){
        console.log(e)
    }
})

export default purchaseRouter;