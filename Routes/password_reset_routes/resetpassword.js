import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import usermodel from '../../Db_Utils/model.js';

const resetpasswordrouter = express.Router();

resetpasswordrouter.post('/', async (req,res)=>{
    const userdata = req.body;
    try{
        const token = userdata.token;
        const data= jwt.verify(token, process.env.JWT_SECRET);
        bcrypt.hash(userdata.password, 10, async(err, hash) => {
            if(err) {
                console.log(err)
                res.status(404).send({msg:'something went wrong'})
            }else{
                await usermodel.updateOne({email:data.email},{$set:{password:hash}})
                res.status(200).send({msg:'password changed success', code:1})
            }
        })
    }catch(err){
        console.log(err)
    }

})

export default resetpasswordrouter;