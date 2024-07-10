import jwt from 'jsonwebtoken';
import NotFoundError from '../../Errors/NotFoundError.js';
import ENV from '../utilis/Env.js';

const authenticate = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if(token){
            jwt.verify(token, ENV.JWT_SECRET, (err, decoded) =>{
                if(err){
                    throw err;
                } else {
                    req.user = decoded.userId;
                    next();
                }
            });
        } else {
            throw new NotFoundError('No token provided');
        }
    } catch (err){
        const error = {
            status: "Bad Request",
            message: "Authentication failed",
            statusCode: 401
        };
        res.status(error.statusCode).json({ status: error.statusCode, message: error.message, statusCode: error.statusCode});
    }
};
export default authenticate;