const express = require('express');
const {body} = require('express-validator');
const signUpValidationRules = require('./validators/authValidator.js')
// const checkValidation = require('./validators/authValidator.js')

const User = require('../models/user');
const authController = require('../controllers/authController.js');


const router = express.Router();

router.post('/signup', signUpValidationRules(), authController.signup)

// router.post('/login', userValidationRules, authController.login)

module.exports = router;