import express from 'express'
import { itemmodel } from '../../Db_Utils/model.js';


//items router 
const ItemRouter = express.Router();

//items get api 

ItemRouter.get('/', async(req,res)=>{
    try{
        const itemlist = await itemmodel.find({});
        if(!itemlist){
            res.status(400).send({msg:"items not available"})
        }
        res.status(200).send(itemlist)
    }catch(e){
        console.log(e)
    }
    
})

ItemRouter.post('/', async(req,res)=>{
    try{
        const {itemdata} = req.body;
        const newitem = await new itemmodel({
            ...itemdata, id:Date.Now().toString()
        })
        const newitm = await newitem.save();
        res.status(400).send({msg:"items added",newitm})
    }catch(e){
        console.log(e)
    }
})

export default ItemRouter;