// import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
import { Sequelize } from "sequelize";
import pg from 'pg';
// import ENV from 
const database = new Sequelize(process.env.DB_URL,{
    dialect: 'postgres',
    dialectModule: pg,
    // host: env.POSTRESS_HOST

  })
  export default database;
