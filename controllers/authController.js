const {validationResult} = require("express-validator");
const bcrypt = require("bcrypt");
const User = require("../models/user")
const Roles = require('../utils/roles')

exports.signup = (req, res, next) => {

    let {firstname, lastname, username, email, password, role} = req.body;
    if (role.isEmpty) {
        role = Roles.ATTENDEE
    }
    User.findOne({email: email})
        .then((user) => {
            if (user) {
                const error = new Error("Email is not available")
                error.statusCode = 401;
                throw error;
            }
            User.findOne({username: username})
        })
        .then((username) => {
            if (username) {
                const error = new Error("Username is not available")
                error.statusCode = 401;
                throw error;
            }
            bcrypt.hash(password, 12)
        })
        .then((hashPw) => {
            const user = new User({
                firstname: firstname,
                lastname: lastname,
                username: username,
                email: email,
                password: hashPw,
                // role: role,
            });
            return user.save();
        })
        .then((result) => {
            res.status(201).json({message: "User created", userId: result._id});
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};
