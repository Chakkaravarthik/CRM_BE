import express from 'express';
import { OfferzoneEligibleModel } from '../../Db_Utils/model.js';

const offserzoneRouter = express.Router();

offserzoneRouter.post('/', async (req,res)=>{
    const {customers,zone} = req.body;
    console.log(customers,zone)
    try{
        const EligibleCustomer = await new OfferzoneEligibleModel({
            id:Date.now().toString(),
            OfferzoneName:zone,
            customer_ids:[...customers],
        })
        await EligibleCustomer.save();
        res.status(200).send({msg:"customers added in offserzone",code:1})
    }catch(e){
        console.log(e);
        res.status(400).send({msg:"not saved "})
    }
})

offserzoneRouter.get('/', async(req,res)=>{
    try{
        const offerzonedata = await OfferzoneEligibleModel.find({});
        res.status(200).send(offerzonedata)
    }catch(e){
        console.log(e)
        res.status(400).send({msg:'error fetching events adta'})
    }
})

export default offserzoneRouter;