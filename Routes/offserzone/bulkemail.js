import express from 'express'
import { mailOptions, transport } from '../../Mail_utils/mailutils.js';
import { CustomerModel, OfferzoneEligibleModel } from '../../Db_Utils/model.js';

const bulkemailRouter = express.Router();

bulkemailRouter.post('/', async(req,res)=>{
    try{
        const {text,subject,events} = req.body;

        const offerzone = await OfferzoneEligibleModel.find({id:events});
        if(offerzone){
            const customerid = [];
            const customermail = [];
            // get customer id from events 
            offerzone.map(obj =>{
               const customermail = obj.customer_ids.map(id =>{
                customerid.push(id.id)
               })
            } )
            const customerobj = await CustomerModel.find({});
            const filteredcus = customerobj.filter(cus=>customerid.includes(cus.id))
            filteredcus.map(cus => customermail.push(cus.email))

            console.log(customermail)
            // send mail to customers email 
             await transport.sendMail({
            ...mailOptions,
            to: customermail,
            subject: subject,
            text: text,
        });
        res.status(200).send({msg:'mail sent',code:1})
        }else{
            res.status(400).send({msg: "nozone matched"})
        }

        
    }catch(e){
        console.log(e)
        res.status(400).send({msg:'mail not sent'})
    }
})


export default bulkemailRouter;