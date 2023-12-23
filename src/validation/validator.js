const Joi = require("joi");

const userValidationSchema = Joi.object({
    name: Joi.string().required(),
    role: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    photo: Joi.string().uri().required(),
});

const userloginValidationSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

const schoolValidationSchema = Joi.object({
    school_name: Joi.string().required(),
    school_photo: Joi.string().uri().required(),
    user_id: Joi.number().integer()
});

const classValidationSchema = Joi.object({
    class_name: Joi.string().required(),
});

const studentValidationSchema = Joi.object({
    student_name: Joi.string().required(),
    student_photo: Joi.string().required(),
    class_id: Joi.number().integer().required()
});

module.exports = { userValidationSchema, userloginValidationSchema, schoolValidationSchema, classValidationSchema, studentValidationSchema };