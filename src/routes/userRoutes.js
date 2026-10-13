
const express = require('express');
const { signup, login } = require('../controllers/userController');
const { signupValidation } = require('../validators/userValidator');

const router = express.Router();

router.post('/signup', signupValidation, signup);
router.post('/login', login);

module.exports = router;
