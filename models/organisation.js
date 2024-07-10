import database from "../DB/connectDB.js";
import { DataTypes } from "sequelize";

const organisationModel = database.define("organisation",{
    orgId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
         type: DataTypes.STRING,
         allowNull: true
    }
});
export default organisationModel;