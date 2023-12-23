const { DataTypes } = require("sequelize");
const { dbconnection, modeloptions } = require("../../src/config/config");
const { userSchema } = require("./usermodel");

const schoolmodel = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    school_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    school_photo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: userSchema,
            key: 'id',
        },
    },
}

const schoolSchema = dbconnection.define('schools', schoolmodel, modeloptions);

module.exports = { schoolSchema };