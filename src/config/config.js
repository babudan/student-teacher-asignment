const { Sequelize } = require('sequelize');
require("dotenv").config();

// Replace these with your actual database connection details
var dbconnection = new Sequelize(
    "postgres",
    "postgres",
    "Arindam@12345",
    {
        dialect: "postgres",
        host: "localhost",
        logging: true,
    },
);
const modeloptions = {
    freezeTableName: true,
    createdAt: "CreatedAt",
    uppdatedAt: "UpdatedAt"
}


module.exports = { dbconnection, modeloptions };    