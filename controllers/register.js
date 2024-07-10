import organisation from '../models/organisation.js';
import NotFoundError from '../Errors/NotFoundError.js';
import BadRequestError from '../Errors/BadRequest.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import user from '../models/user.js';
import asyncWrapper from '../middleware/async.js';
import userModel from '../models/user.js';
import organisationModel from '../models/organisation.js';

const registerUser = asyncWrapper(async (req,res) =>{
    const { firstName, lastName, email, password, phone} = req.body;
    if(!firstName || firstName.trim() === ''){
        const error = [{
            field: "firstName",
            message: "First name is required"
        }];
        return NotFoundError(res,error);
    }
    if(!lastName || lastName.trim() === ''){
        const error = [{
            field: "last name",
            message: "Last name field is required"
        }];
        return NotFoundError(res,error)
    }
    if(!email || email.trim() === ''){
        const error = [{
            field: "email",
            message: "Email field is required"
        }];
        return NotFoundError(res,error)
    }
    if(!password || password.trim() === ''){
        const error = [{
            field: "password",
            message: "password field is required"
        }];
        return NotFoundError(res,error);
    }
    if(!phone || phone.trim() === ''){
        const error = [{
            field: "phone",
            message: "phone field is required"
        }];
        return NotFoundError(res,error);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const findUser = await userModel.findOne({ where:{email} });
    if(findUser){
        const error = {
        status: "Bad request",
        message: "Registration unsuccessful",
        statusCode: 400
        }
        return BadRequestError(res,error, 400);
    } else {
      const newUser = await userModel.create({ firstName,lastName, email, password: hashedPassword, phone});
      await organisationModel.create({ orgId: newUser.userId, name: `${newUser.firstName}'s organisation`});

      const accessToken = jwt.sign({ userId: newUser.userId}, env.JWT_SECRET);
      const response = {
        status: "success",
        message: "Registration successful",
        data: {
            accessToken,
            user: {
                userId: newUser.userId,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
                phone: newUser.phone
            }
        }
      };
      res.status(201).json(response);
    }
});

const registerController = {
    registerUser
}
export default registerController;