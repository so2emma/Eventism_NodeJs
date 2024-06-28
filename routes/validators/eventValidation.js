const {body, validationResult} = require('express-validator');

exports.eventValidation = () => {
    return [
        body('title').isLength({min: 3}).withMessage('Title should be at least 3 characters'),
        body('description').isLength({min: 15}).withMessage('Description should be at least 15 characters'),
        body('date').isDate().withMessage('Date of the event Should be stated'),
        body('location').isLength({min: 5}).withMessage('Location should be at least 5 characters'),
        body('category').isLength({min: 4}).withMessage('Category should be at least 4 characters'),
    ];
}

exports.checkValidation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    next();
};