import BadRequestError from "../Errors/BadRequest";
import NotFoundError from "../Errors/NotFoundError";
import asyncWrapper from "../middleware/async.js";
import organisationModel from "../models/organisation.js";

const getAllOrgs = asyncWrapper(async (req, res) =>{
  const user = req.user;
  try {
  const org = await organisationModel.findAll({
    where: {
        orgId: user
    }
  });
const response = {
    status: "success",
    message: "organisations",
    data: org
};
res.json(response);
  } catch (err){
    const error = {
        status: "BadRequest",
        message: "An error occurred",
        statusCode: 500
    };
    res.status(error.statusCode).json({ status: error.statusCode, message: error.message, statusCode: error.statusCode});
  }
});

const getSingleOrg = asyncWrapper(async (req,res) =>{
    const user = req.user;
     try {
        const org  = await organisationModel.findOne({
            where: {
                orgId: user
            }
        });
        if(org){
            const response = {
                status: "success",
                message: "organisation found",
                data: org
            };
            res.json(response);
        } else {
            throw new NotFoundError("Organisation not found");
        }
     } catch (err){
        const error = {
            status: "Bad request",
            message: "An error occurred",
            statusCode: 500
        };
        res.status(error.statusCode).json({status:error.status, message:error.message, statusCode:error.statusCode});
     }
});

const addOrganisation = asyncWrapper(async (req,res) =>{
    const { userId } = req.body;
    const { orgId } = req.params;
  
    if(!userId || !orgId){
        return res.status(400).json({
            status: "Bad Request",
            message: "client error: userId or orgId missing",
            statusCode: 400
        });
    }
    try {
        await organisationModel.update(
             {orgId: userId},
             { where: { orgId } }
        );
        const response = {
            status: "success",
            message: "user added to organisation successfully",
        }
        res.json(response);
    } catch (err){
        const error = {
            status: "Bad request",
            message: "client error",
            statusCode: 400
    
    }
    res.status(error.statusCode).json({ status: error.status, message: error.message, statusCode: error.statusCode });
}

});

const createOrganisation = asyncWrapper(async (req,res) =>{
    const user = req.user;

    try {
        const { name, description} = req.body;
        if(!name){
            return res.status(400).json({
                status: "Bad Request",
                message: "client error: name is required",
                statusCode: 400
            });
        }
        const neworg = await organisationModel.create({ orgId: user, name, description});

        const response = {
            status: "success",
            message: "organisation created successfully!",
            data: {
                orgId: neworg.orgId,
                name: neworg.name,
                description: neworg.description
            }
        };
        res.status(201).json(response);
    } catch (err) {
       const error = {
        status: "Bad Request",
        message: "client error",
        statusCode: 400
       } 
       res.status(error.statusCode).json({ status: error.statusCode, message: error.message, statusCode: error.statusCode})
    }
});

const organisationController = {
    getAllOrgs,
    getSingleOrg,
    addOrganisation,
    createOrganisation
}
export default organisationController;
