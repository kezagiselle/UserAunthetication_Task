import NotFoundError from '../Errors/NotFoundError.js';
import BadRequestError from '../Errors/BadRequest.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
// import user from '../models/user.js';
import asyncWrapper from '../middleware/async.js';
import userModel from '../models/user.js';

const login = asyncWrapper(async (req, res) =>{
    const { email, password} = req.body;

    if(!password || password.trim() === ''){
        const error = [{
            field: "password",
            message: "password field is required"
        }];
        return NotFoundError(res,error);
    }
    if(!email || email.trim() === ''){
        const error = [{
            field: "email",
            message: "Email field is required"
        }];
        return NotFoundError(res,error);
    }
    try {
        const data = await userModel.findOne({ where: {email} });
        if(!data){
            const error = {
                status: "Bad request",
                message: "Authentication failed",
                statusCode: 401
            };
           return BadRequestError(res,error)
        }
    const isPasswordValid = await bcrypt.compare(password, data.password);
    if(isPasswordValid){
        const accessToken = jwt.sign({ userId: data.userId}, env.JWT_SECRET);
        const response  = {
            status: "success",
            message: "Login successful",
            data: {
                accessToken,
                user: {
                    userId: data.userId,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    phone: data.phone
                }
            }
        };
        res.json(response);
    } else {
        const error = {
            status: "Bad Request",
            message: "Aunthication failed",
            statusCode: 401
        };
        return BadRequestError(res,error);
    }
} catch (err) {
    console.log(err);
    const error = {
        status: "Bad request",
        message: "Aunthication failed",
        statusCode: 401
    };
    return BadRequestError(res, error);
}   
});
const signInController = {
    login
}
export default signInController;