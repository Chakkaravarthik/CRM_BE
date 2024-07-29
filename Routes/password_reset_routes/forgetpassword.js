import express from 'express'
import jwt from 'jsonwebtoken';
import usermodel from '../../Db_Utils/model.js';
import { mailOptions, transport } from '../../Mail_utils/mailutils.js';

const forgetpasswordRouter = express.Router();

forgetpasswordRouter.post('/', async (req,res)=>{
    const userdata = req.body;
    try{
        const userobj = await usermodel.findOne({email:userdata.email}, {password:0,})

        //jwt token creation 
        const token = jwt.sign(userobj.toObject(),process.env.JWT_SECRET);

        if(userobj){

            // sent mail for reset password
            await transport.sendMail({
                ...mailOptions,
                to: userdata.email,
                subject: `Password Reset Link `,
                text: `link to reset your password ${process.env.FE_URL}/reset-password?token=${token}`
            });
            res.status(200).send({msg:'password reset link sent ',code:1})
        }else{
            res.status(400).send({msg:'enter valid email '})
        }
    }catch(e){
        console.log(e.message);
    }


})

export default forgetpasswordRouter;