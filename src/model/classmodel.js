const { DataTypes } = require("sequelize");
const { dbconnection, modeloptions } = require("../../src/config/config");
const { studentSchema } = require("./studentmodel");

const classmodel = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    class_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}

const classSchema = dbconnection.define('class', classmodel, modeloptions);
studentSchema.belongsTo(classSchema, { foreignKey: 'class_id' });
classSchema.hasOne(studentSchema, { foreignKey: 'class_id' });

module.exports = { classSchema };