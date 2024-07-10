import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import connectDB from './DB/connectDB.js';
import taskRouter from './Routes/routes.js';

const app = express();

app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.json({ limit: '10mb' }));
app.use(taskRouter);


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