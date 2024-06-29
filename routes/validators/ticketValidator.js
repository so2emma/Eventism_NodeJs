const {body, validationResult} = require('express-validator');
const Ticket = require("../../utils/ticketTypes");

exports.ticketValidation = () => {
    return [
        body("price").isInt(),
        body("type").custom((value) => {
            if (value === undefined || value === null || value === "") {
                return true;
            } else {
                if (!Object.values(Ticket).includes(value)) {
                    throw new Error("Invalid ticket");
                }
            }
            return true;
        }),
    ];
};

exports.checkValidation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    next();
};
