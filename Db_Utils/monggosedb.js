import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Configure dotenv to load environment variables from .env file
dotenv.config();

// Environment variables
const dbuser = process.env.DB_USER;
const dbpass = encodeURIComponent(process.env.DB_PASS);
const dbname = process.env.DB_NAME;


// MongoDB URI
const cloudURI = `mongodb+srv://${dbuser}:${dbpass}@cluster0.b1fwpte.mongodb.net/${dbname}?retryWrites=true&w=majority&appName=Cluster0`

// Function to connect to MongoDB
const mongooseConnect = async () => {
    try {
        await mongoose.connect(cloudURI);
        console.log('Mongoose connected');
    } catch (e) {
        console.error(`Mongoose connection error: ${e.message}`);
    }
};

export {mongooseConnect};
