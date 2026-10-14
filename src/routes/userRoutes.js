
const express = require('express');

const { signup, login } = require('../controllers/userController');
const { signupValidation } = require('../validators/userValidator');
const authLimiter = require('../middleware/rateLimiter');

const router = express.Router();

router.post('/signup', authLimiter, signupValidation, signup);

router.post('/login', authLimiter, login);

module.exports = router;
