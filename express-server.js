import express from 'express'
import cors from 'cors'
import HomeRouter from './Routes/home.js';
import  { mongooseConnect} from './Db_Utils/monggosedb.js';
import loginRouter from './Routes/login.js';
import registerRouter from './Routes/register.js';
import forgetpasswordRouter from './Routes/password_reset_routes/forgetpassword.js';
import verifypassword from './Routes/password_reset_routes/verifypassword.js';
import resetpasswordrouter from './Routes/password_reset_routes/resetpassword.js';
import CustomerRouter from './Routes/customers/customer.js';
import ItemRouter from './Routes/items/items.js';
import purchaseRouter from './Routes/purchase/purchase.js';
import purchasefeedbackrouter from './Routes/purchase/purchasefeedback.js';
import feedbackupdateRouter from './Routes/purchase/purchasefeedbackupdate.js';
import offserzoneRouter from './Routes/offserzone/offserzone.js';
import bulkemailRouter from './Routes/offserzone/bulkemail.js';


// creating a server
const server = express();


//middelware
server.use(express.json());


//cors middleware
server.use(cors());

// connecting db 
await mongooseConnect();

//router 
server.use('/home', HomeRouter); // home router
server.use('/login', loginRouter);//login router
server.use('/register', registerRouter)//register router
server.use('/forgetpassword', forgetpasswordRouter); // forget password initiation
server.use('/verifypassword', verifypassword);//verify jwt token and user
server.use('/resetpassword', resetpasswordrouter)//reset password
server.use('/customer-list', CustomerRouter)//reset password
server.use('/itemlist', ItemRouter)//item router
server.use('/purchase', purchaseRouter)//purchase router
server.use('/purchasefeedback', purchasefeedbackrouter)//purchase feedbackchecking
server.use('/purchasefeedbackupdate', feedbackupdateRouter)//purchase feedbackchecking
server.use('/offerzone', offserzoneRouter)//purchase feedbackchecking
server.use('/bulkemail', bulkemailRouter)//purchase feedbackchecking





//port asssigning for server 
const port = 7000;
server.listen(port,()=>{
    console.log(`server is listening in port : ${port}`)
});