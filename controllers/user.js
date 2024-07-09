// import userModel
import NotFoundError from "../Errors/NotFoundError";
import BadRequestError from "../Errors/BadRequest";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config()
import bcrypt from 'bcrypt';
import asyncWrapper from "../middleware/async";
import userModel from "../models/user";

const findUser = async (req,res) =>{
    const { id } = req.params;
    const user_id = req.user;

    try{
    if(id && id == user_id){
        const user  = await userModel.findByPk(id);
        if(user){
            const response = {
                status: "success",
                message: "User found",
                data: {
                    userId: user.userId,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    phone: user.phone
                }
            };
            res.json(response);
        } else {
            throw new NotFoundError("user not found");
        }
    } else {
        throw new NotFoundError("Authentication failed");
    }
    } catch (err){
     const error = {
        status: "Bad Request",
        message: err.message || "Authentication failed",
        statusCode: 401
     };
     res.status(error.statusCode).json({ status: error.statusCode, message:error.message, statusCode: error.statusCode});
    }
}
const UserController = {
    findUser
}
export default UserController;