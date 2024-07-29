import mongoose from 'mongoose'

// schema creation 

const userschema = new mongoose.Schema({
    id:{
        type:"String",
        required:true,
    },
    name:{
        type:"String",
        required:true,
    },
    email:{
        type:"String",
        required:true,
    },
    password:{
        type:"String",
        required:true,
    },
})

const usermodel = new mongoose.model('user', userschema , 'users');

export default usermodel;