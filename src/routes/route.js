const express = require('express');
const router = express.Router();
const { usercreate, userlogin, schoolcreate, getschools, createclass, getclass, createstudent, getstudent, getstudentallclasses, getbatchmates } = require('../controllers/controller');
const { authentication, authorisation } = require('../auth/authentication');




router.post("/register", usercreate);

router.post("/login", userlogin);

router.post("/school", authentication, authorisation, schoolcreate)

router.get("/school", authentication, authorisation, getschools)

router.post("/class", authentication, authorisation, createclass)

router.get("/class", authentication, authorisation, getclass)

router.post("/student", authentication, authorisation, createstudent)

router.get("/student", authentication, authorisation, getstudent)

router.get("/studentallclasses", getstudentallclasses)

router.get("/batchmates", getbatchmates)

module.exports = router