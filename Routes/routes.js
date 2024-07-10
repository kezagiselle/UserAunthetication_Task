import express from 'express';
const taskRouter = express.Router();
import registerController from '../controllers/register.js';
import signInController from '../controllers/signIn.js';
import organisationController from '../controllers/organisation.js';
import UserController from '../controllers/user.js';
import authenticate from '../middleware/utilis/guard.js';



taskRouter.post("/auth/register",registerController.registerUser);
taskRouter.post("/auth/login",signInController.login);
taskRouter.get("/api/users/:id",authenticate,UserController.findUser);
taskRouter.get("/api/organisations",authenticate,organisationController.getAllOrgs);
taskRouter.get("/api/organisations/:orgId",authenticate,organisationController.getSingleOrg);
taskRouter.post("/api/organisations",authenticate,organisationController.createOrganisation);
taskRouter.post("/api/organisations/:orgId/users",organisationController.addOrganisation);

export default taskRouter;