const { DataTypes } = require("sequelize");
const { dbconnection, modeloptions } = require("../../src/config/config");
const { classSchema } = require("./classmodel");
const studentmodel = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    student_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    student_photo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    class_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: classSchema,
            key: 'id',
        },
    }
}

const studentSchema = dbconnection.define('student', studentmodel, modeloptions);

module.exports = { studentSchema };