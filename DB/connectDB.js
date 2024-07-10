// import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
import { Sequelize } from "sequelize";
import pg from 'pg';
import ENV from '../middleware/utilis/Env.js';
const database = new Sequelize(ENV.POSTGRES_URL,{
    dialect: 'postgres',
    dialectModule: pg,
    // host: env.POSTRESS_HOST

  })
  export default database;
