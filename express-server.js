import express from 'express'
import cors from 'cors'
import HomeRouter from './Routes/home.js';
import  { mongooseConnect} from './Db_Utils/monggosedb.js';
import loginRouter from './Routes/login.js';
import registerRouter from './Routes/register.js';
import forgetpasswordRouter from './Routes/password_reset_routes/forgetpassword.js';
import verifypassword from './Routes/password_reset_routes/verifypassword.js';
import resetpasswordrouter from './Routes/password_reset_routes/resetpassword.js';


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




//port asssigning for server 
const port = 7000;
server.listen(port,()=>{
    console.log(`server is listening in port : ${port}`)
});