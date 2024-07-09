import register from './controllers/register.js';
import User from './models/user.js';
import Organisation from './models/organisation.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import BadRequestError from '../Errors/BadRequest.js';

jest.mock('../models/user');
jest.mock('../models/organisation');
jest.mock("bcrypt");
jest.mock("jsonwebtoken");

describe('User Registration', () => {
    let req;
    let res;
    let json;
    let status;

    beforeEach(() => {
        req = {
            body: {
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@example.com',
                password: 'password123',
                phone: '1234567890',
            }
        };
        json = jest.fn();
        status = jest.fn().mockReturnValue({ json });
        res = {
            status,
        };
    });

    it('Should Register User Successfully with Default Organisation', async () => {
        bcrypt.hash.mockResolvedValue('$hashedPassword');
        User.findOne.mockResolvedValue(null);
        User.create.mockResolvedValue({
            userId: 'user-123',
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            password: '$hashedPassword',
            phone: '1234567890',
        });
        Organisation.create.mockResolvedValue({});
        jwt.sign.mockReturnValue('accessToken');

        await register(req, res);

        expect(status).toHaveBeenCalledWith(201);
        expect(json).toHaveBeenCalledWith({
            status: 'success',
            message: 'Registration successful',
            data: {
                accessToken: 'accessToken',
                user: {
                    userId: 'user-123',
                    firstName: 'John',
                    lastName: 'Doe',
                    email: 'john.doe@example.com',
                    phone: '1234567890',
                }
            }
        });
    });

    it('Should Fail If Required Fields Are Missing', async () => {
        const fields = ['firstName', 'lastName', 'email', 'password', 'phone'];

        for (const field of fields) {
            req.body[field] = '';
            await register(req, res);
            expect(BadRequestError).toHaveBeenCalledWith(res, expect.any(Array));
            req.body[field] = 'value'; // Reset field
        }
    });

    it('Should Fail if there’s Duplicate Email', async () => {
        bcrypt.hash.mockResolvedValue('$hashedPassword');
        User.findOne.mockResolvedValue({ email: 'john.doe@example.com' });

        await register(req, res);

        expect(BadRequestError).toHaveBeenCalledWith(res, {
            status: 'Bad request',
            message: 'Registration unsuccessful',
            statusCode: 400
        }, 400);
    });
});
