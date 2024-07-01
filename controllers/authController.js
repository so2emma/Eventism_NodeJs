const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const User = require("../models/user");
const Roles = require('../utils/roles');

exports.signup = async (req, res, next) => {
    const {firstname, lastname, username, email, password, role: userRole} = req.body;

    let role = userRole;
    if (!role) {
        role = Roles.ATTENDEE;
    }

    try {
        const existingUserByEmail = await User.findOne({email: email});
        if (existingUserByEmail) {
            const error = new Error("Email is not available");
            error.statusCode = 401;
            throw error;
        }

        const existingUserByUsername = await User.findOne({username: username});
        if (existingUserByUsername) {
            const error = new Error("Username is not available");
            error.statusCode = 401;
            throw error;
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = new User({
            firstname: firstname,
            lastname: lastname,
            username: username,
            email: email,
            password: hashedPassword,
            role: role,
        });

        const result = await user.save();
        res.status(201).json({message: "User created", userId: result._id});
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.login = async (req, res, next) => {
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email: email});
        if (!user) {
            const error = new Error("Email or password is incorrect");
            error.statusCode = 401;
            throw error;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            const error = new Error("Email or password is incorrect");
            error.statusCode = 401;
            throw error;
        }
        const token = jwt.sign(
            {email, role: user.role},
            process.env.SECRET_KEY,
            {expiresIn: '1h'});
        res.status(200).json({token: token, userId: user._id.toString(), email: user.email});

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.getUsers = async (req, res, next) => {
    try{
        const users  = await User.find().select('-password');
        if(users.length === 0){
            const error = new Error("No User has been registered");
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            message: 'Users Found Successfully',
            users: users
        });
    }catch(err){
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }
}
