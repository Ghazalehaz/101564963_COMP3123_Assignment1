
const { body } = require('express-validator');

const signupValidation = [
    body('username')
        .isString()
        .withMessage('Username must be a string')
        .trim()
        .isLength({ min: 3, max: 30 })
        .withMessage('Username must be between 3 and 30 characters'),

    body('email')
        .isEmail()
        .withMessage('Please provide a valid email')
        .normalizeEmail(),

    body('password')
        .isString()
        .withMessage('Password must be a string')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters')
        .matches(/[a-z]/)
        .withMessage('Password must contain a lowercase letter')
        .matches(/[A-Z]/)
        .withMessage('Password must contain an uppercase letter')
        .matches(/[0-9]/)
        .withMessage('Password must contain a number')
];

module.exports = { signupValidation };
