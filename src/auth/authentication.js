const jwt = require("jsonwebtoken")
const { userSchema } = require("../model/usermodel");
var mongoose = require("mongoose");

const authentication = async function (req, res, next) {
    try {
        let token = req.headers["authorization"];

        if (!token) return res.status(400).send({ status: false, msg: "token is required" })

        token = token.split(" ")
        jwt.verify(token[1], process.env.SECRET_KEY, (error, decodedtoken) => {

            if (error) return res.status(401).send({ status: false, message: "token is invalid or expired" });

            req["decodedtoken"] = decodedtoken;
            next()
        })
    }
    catch (error) {
        return res.status(500).send({ msg: error.message })
    }
}

const authorisation = async function (req, res, next) {
    try {
        let id = req.decodedtoken.userid

        let userId = await userSchema.findByPk(id)
        if (!userId) { return res.status(404).send({ status: false, msg: "you are unautorized" }) }
        next();
    }
    catch (error) {
        console.log(error)
        return res.status(500).send({ msg: error.message })
    }
}

module.exports = { authentication, authorisation }