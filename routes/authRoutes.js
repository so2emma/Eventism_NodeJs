const express = require('express');
const {body} = require('express-validator');
const userValidationRules = require('./validators/authValidator.js')
// const checkValidation = require('./validators/authValidator.js')

const User = require('../models/user');
const authController = require('../controllers/authController.js');


const router = express.Router();

router.post('/signup', userValidationRules, authController.signup)

module.exports = router;