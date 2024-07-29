import express from 'express'
import jwt from 'jsonwebtoken'


const verifypassword = express.Router();

verifypassword.post('/', async (req,res)=>{
    const userdata = req.body;
    try{
        const token = userdata.token;
        const data= await jwt.verify(token, process.env.JWT_SECRET);
        if(token){
            if(data){
                res.status(200).send({msg:'User verified Successfuly', code:1});
            }else{
                res.status(404).send({msg:'User verification failed'});
            }
        }else{
            res.status(404).send({msg:'User is not found'});
        }
    }catch(e){
        console.log(`error in verify user ${e.message}`);
    }

})

export default verifypassword;