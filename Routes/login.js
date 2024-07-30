
import bcrypt from 'bcrypt';
import express from 'express';
import {usermodel} from '../Db_Utils/model.js';

const loginRouter = express.Router();

loginRouter.post('/', async(req, res)=>{
    const logindata = req.body;

    //check user exist 
    const userobj = await usermodel.findOne({email:logindata.email});
    if(userobj){
        
        bcrypt.compare(logindata.password , userobj.password, async (err, result )=>{
            if(err){
                res.status(404).send({msg:'something went wrong'})
                console.log(err.message)
            }else{
                if(result){
                    res.status(200).send({msg:'user credentials matched',code:1})
                }else{
                    res.status(404).send({msg:'passsword mot match',code:0})
                }
            }
        })
    }else{
        res.status(404).send({msg:'user not found'});
    }
})


export default loginRouter;