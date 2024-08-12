import express from 'express'

const purchaseRouter = express.Router();

purchaseRouter.post('/', async(req,res)=>{
    try{
        const data = req.body;
        const customerobj = await CustomerModel.findone({id:data.selectedcustomer})
        if(customerobj){
            //need to complete  purchase
        }else{
            res.status(400).send({msg:'customer not available'})
        }
        
    }catch(e){
        console.log(e)
    }
})

export default purchaseRouter;