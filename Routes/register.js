import express from 'express'
import bcrypt from 'bcrypt'
import usermodel from '../Db_Utils/model.js';

// register rouuter
const registerRouter = express.Router();

//GET api 

registerRouter.post('/', async (req, res) => {
    const userdata = req.body;
    try {
        bcrypt.hash(userdata.password, 10, async(err, hash) => {
            if(err) {
                console.log(err);
                res.status(404).send({ msg: 'check password' });
            } else {
                //check user already exist 
                const userobj = await usermodel.findOne({ email: userdata.email });

                if(userobj) {
                    res.status(400).send({ msg: 'User already exists' });
                } else {
                    // Create a new user object
                    const newuser = new usermodel({
                        ...userdata,password:hash,
                        id: Date.now().toString()
                    });

                    // Save the new user to the database
                    await newuser.save();

                    res.status(201).send({ msg: 'User registered successfully', code:1 });
                }
            }
        })

    } catch (e) {
        console.log(e)
    }


})

export default registerRouter;