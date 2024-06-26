const jwt = require('jsonwebtoken');
require('dotenv').config()

const validateAuthenticated = () => {
    return (req, res, next) => {
        try {
            if (!req.headers.authorization ||
                !req.headers.authorization.startsWith("Bearer")) {
                const error = new Error("No token");
                error.statusCode = 401;
                throw error;
            }

            const token = req.headers.authorization.split(" ")[1];
            
            req.user = jwt.verify(token, process.env.SECRET_KEY);

            next();
        } catch (err) {
            if (err.name === 'JsonWebTokenError') {
                err.statusCode = 403;
            }
            next(err);
        }
    }
}

const authorizeRole = (...allowedRoles) => {
    return (req, res, next) => {
        try {
            if (!allowedRoles.includes(req.user.role)) {
                const error = new Error('Forbidden: You do not have the required permissions');
                error.statusCode = 403;
                throw error;
            }
            next();
        } catch (err) {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        }
    };
};

module.exports = {validateAuthenticated, authorizeRole};
