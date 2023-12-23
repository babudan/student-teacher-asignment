const { DataTypes } = require("sequelize");
const { dbconnection, modeloptions } = require("../../src/config/config");
const { schoolSchema } = require("./schoolmodel");
const usermodel = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    photo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    parents_invite_code: {
        type: DataTypes.STRING,
        allowNull: true
    },
    teacher_invite_code: {
        type: DataTypes.STRING,
        allowNull: true
    }
}

const userSchema = dbconnection.define('users', usermodel, modeloptions);
schoolSchema.belongsTo(userSchema, { foreignKey: 'user_id' });
userSchema.hasOne(schoolSchema, { foreignKey: 'user_id' });

module.exports = { userSchema };