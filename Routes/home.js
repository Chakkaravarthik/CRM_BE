import express from 'express'

//router creation
const HomeRouter = express.Router();

//get api for home
HomeRouter.get('/',(req,res)=>{
    res.send({msg:"Home Page"})
})

//importing home router 
export default HomeRouter;