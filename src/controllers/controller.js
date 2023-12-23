const { userSchema } = require("../model/usermodel");
const { schoolSchema } = require("../model/schoolmodel");
const { classSchema } = require("../model/classmodel");
const { studentSchema } = require("../model/studentmodel");
const { Sequelize, json } = require("sequelize");
const { userValidationSchema, userloginValidationSchema, schoolValidationSchema, classValidationSchema, studentValidationSchema } = require("../validation/validator");
const bcrypt = require("bcrypt");
const randomstring = require("randomstring");
const jwt = require("jsonwebtoken");
const { dbconnection } = require("../config/config");

const usercreate = async (req, res) => {
    try {
        let data = req.body;

        const validationResult = userValidationSchema.validate(data);

        if (validationResult.error) {

            return res.status(400).send({ status: false, message: validationResult.error.message })

        } else {

            const existUser = await userSchema.findOne({
                where: {
                    email: data.email
                },
            });

            if (existUser) return res.status(401).send({ status: false, message: "user already exist" })

            const hashPassword = await bcrypt.hash(data.password, 10);
            data.password = hashPassword
            data.parents_invite_code = randomstring.generate(7);
            data.teacher_invite_code = randomstring.generate(7);
            let createUser = await userSchema.create(data)
            return res.status(200).send({ status: true, data: createUser, message: "user created succesfully" });
        }
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

const userlogin = async (req, res) => {
    try {
        const data = req.body;
        const { email, password } = data

        const validationResult = userloginValidationSchema.validate(data);

        if (validationResult.error) {

            return res.status(400).send({ status: false, message: validationResult.error.message })

        } else {
            const existUser = await userSchema.findOne({
                where: {
                    email
                },
            });
            if (!existUser)
                return res.status(401).send({ status: false, message: "Register yourself" })

            const matchPass = await bcrypt.compare(password, existUser.password);
            console.log(matchPass)
            if (!matchPass)
                return res.status(400).send({ status: false, message: "You Entered Wrong password" })

            const token = jwt.sign({ userid: existUser.id, email: existUser.email }, process.env.SECRET_KEY);
            return res.status(200).send({ status: true, token: token, message: "user login succesfully" });
        }
    }
    catch (err) {
        res.status(500).send({ status: false, error: err.message })
    }
}

const schoolcreate = async (req, res) => {
    try {
        let data = req.body;

        const validationResult = schoolValidationSchema.validate(data);

        if (validationResult.error) {

            return res.status(400).send({ status: false, message: validationResult.error.message })

        } else {

            const existSchool = await schoolSchema.findOne({
                where: {
                    school_name: data.school_name
                },
            });

            if (existSchool) return res.status(401).send({ status: false, message: "school already exist" })
            data.user_id = req.decodedtoken.userid
            let createSchool = await schoolSchema.create(data)
            return res.status(200).send({ status: true, data: createSchool, message: "school created succesfully" });
        }
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

const getschools = async (req, res) => {
    try {
        const schools = await schoolSchema.findAll({
            where: {
                user_id: req.decodedtoken.userid
            },
            include: [{
                model: userSchema,
                attributes: ['id', 'role']
            }]
        });
        return res.status(200).send({ status: true, data: schools, message: "school fetched succesfully" });

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

const createclass = async (req, res) => {
    try {
        let data = req.body;

        const validationResult = classValidationSchema.validate(data);

        if (validationResult.error) {

            return res.status(400).send({ status: false, message: validationResult.error.message })

        } else {

            const existclass = await classSchema.findOne({
                where: {
                    class_name: data.class_name
                },
            });

            if (existclass) return res.status(401).send({ status: false, message: "class already exist" })
            let createSchool = await classSchema.create(data)
            return res.status(200).send({ status: true, data: createSchool, message: "class created succesfully" });
        }
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

const getclass = async (req, res) => {
    try {
        const { class_name } = req.query

        if (class_name == undefined) return res.status(400).send({ status: false, message: "plss pass the class_name" })

        const classes = await classSchema.findAll({
            where: {
                class_name: class_name
            }
        });

        return res.status(200).send({ status: true, data: classes, message: "class fetched succesfully" });

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

const createstudent = async (req, res) => {
    try {
        let data = req.body;

        const validationResult = studentValidationSchema.validate(data);

        if (validationResult.error) {

            return res.status(400).send({ status: false, message: validationResult.error.message })

        } else {

            let createSchool = await studentSchema.create(data)
            return res.status(200).send({ status: true, data: createSchool, message: "student created succesfully" });
        }
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

const getstudent = async (req, res) => {
    try {
        const { student_name } = req.query

        if (student_name == undefined) return res.status(400).send({ status: false, message: "plss pass the student_name" })

        const students = await studentSchema.findAll({
            where: {
                student_name: student_name
            }
        });

        return res.status(200).send({ status: true, data: students, message: "students fetched succesfully" });

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

const getstudentallclasses = async (req, res) => {
    try {
        const allClassIds = await classSchema.findAll({ attributes: ['id'], raw: true });

        const classIdArray = allClassIds.map((classObj) => classObj.id);

        const students = await studentSchema.findAll({
            where: {
                class_id: {
                    [Sequelize.Op.in]: classIdArray,
                },
            },
        });

        return res.status(200).send({ status: true, data: students, message: "student who are in all classes fetched succesfully" });

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}


const getbatchmates = async (req, res) => {
    try {
        const targetStudentID = req.query.id
        const targetStudent = await studentSchema.findOne({
            attributes: ['id', 'class_id'],
            where: {
                id: targetStudentID,
            },
        });

        if (!targetStudent) {
            return res.status(400).send({ status: false, message: "student not found" })
        }

        const resultStudent = await studentSchema.findOne({
            attributes: ['id', 'class_id', 'student_name', 'student_photo'],
            where: {
                id: {
                    [Sequelize.Op.ne]: targetStudentID,
                },
                class_id: targetStudent.class_id,
            },
        });

        return res.status(200).send({ status: true, data: resultStudent, message: "student who are in all classes fetched succesfully" });

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

module.exports = {
    usercreate, userlogin, schoolcreate, getschools, createclass, getclass, createstudent, getstudent,
    getstudentallclasses, getbatchmates
};