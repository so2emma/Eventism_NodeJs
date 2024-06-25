const {validationResult} = require("express-validator");
const bcrypt = require("bcrypt");
const User = require("../models/user")
const Roles = require('../utils/roles')

exports.signup = async (req, res, next) => {
    const { firstname, lastname, username, email, password, role: userRole } = req.body;

    let role = userRole;
    if (!role) {
        role = Roles.ATTENDEE;
    }

    try {
        const existingUserByEmail = await User.findOne({ email: email });
        if (existingUserByEmail) {
            const error = new Error("Email is not available");
            error.statusCode = 401;
            throw error;
        }

        const existingUserByUsername = await User.findOne({ username: username });
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
        res.status(201).json({ message: "User created", userId: result._id });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

// exports.login = (req, res, next) => {
//
// }
