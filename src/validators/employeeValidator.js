
const { body, validationResult } = require('express-validator');

const employeeValidation = [
    body('first_name')
        .isString()
        .withMessage('First name must be a string')
        .bail()
        .trim()
        .notEmpty()
        .withMessage('First name is required')
        .isLength({ min: 2, max: 50 })
        .withMessage('First name must be between 2 and 50 characters'),

    body('last_name')
        .isString()
        .withMessage('Last name must be a string')
        .bail()
        .trim()
        .notEmpty()
        .withMessage('Last name is required')
        .isLength({ min: 2, max: 50 })
        .withMessage('Last name must be between 2 and 50 characters'),

    body('email')
        .isEmail()
        .withMessage('Please provide a valid email')
        .normalizeEmail(),

    body('position')
        .isString()
        .withMessage('Position must be a string')
        .bail()
        .trim()
        .notEmpty()
        .withMessage('Position is required')
        .isLength({ max: 100 })
        .withMessage('Position must not exceed 100 characters'),

    body('salary')
        .isFloat({ gt: 0 })
        .withMessage('Salary must be a positive number')
        .toFloat(),

    body('date_of_joining')
        .isISO8601({ strict: true })
        .withMessage('Please provide a valid date')
        .toDate(),

    body('department')
        .isString()
        .withMessage('Department must be a string')
        .bail()
        .trim()
        .notEmpty()
        .withMessage('Department is required')
        .isLength({ max: 100 })
        .withMessage('Department must not exceed 100 characters')
];

const validateEmployee = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: 'Validation failed',
            errors: errors.array()
        });
    }

    next();
};

module.exports = {
    employeeValidation,
    validateEmployee
};
