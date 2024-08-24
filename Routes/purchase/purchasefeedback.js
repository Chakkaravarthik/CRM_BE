import express from 'express';
import jwt from 'jsonwebtoken';

const purchasefeedbackrouter = express.Router();


purchasefeedbackrouter.post('/', async(req,res)=>{
    const {token} = req.body;
    try{
        const data = await jwt.verify(token, process.env.JWT_SECRET);
        if(data){
            console.log(token)
            res.status(200).send({msg:'token got',code:1})
        }else{
            res.status(400).send({msg:'not found'})
        }
    }catch(e){
        console.log(e.message);
    }
})


export default purchasefeedbackrouter;