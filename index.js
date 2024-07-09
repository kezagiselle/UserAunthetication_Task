import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import connectDB from './DB/connectDB.js';

const app = express();

const start = async () => {
    try{
        connectDB.authenticate()
        // DatabaseError.sync()
        app.listen(process.env.PORT, console.log(`Server is listening on port ${process.env.PORT}`));
    } catch (error){
        console.log(error)
    }
}
start();

// app.listen(process.env.PORT, () => console.log("Connecting to Server..."));