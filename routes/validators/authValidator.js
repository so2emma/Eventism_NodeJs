const { body, validationResult } = require("express-validator");
const Roles = require("../../utils/roles");

const signUpValidationRules = () => {
  return [
    body("firstname")
      .isLength({ min: 1 })
      .withMessage("Firstname should not be empty"),
    body("lastname")
      .isLength({ min: 1 })
      .withMessage("Lastname should not be empty"),
    body("username")
      .isLength({ min: 5 })
      .withMessage("Username should not be less than 5 characters"),
    body("email").isEmail().withMessage("The email is invalid"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password should not be less than 8 characters"),
    body("role").custom((value) => {
      if(value === undefined || value === null || value === ""){
        return true;
      }else {
        if (!Object.values(Roles).includes(value)) {
          throw new Error("Invalid role");
        }
      }
      return true;
    }),
  ];
};

const checkValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = [signUpValidationRules(), checkValidation];
