
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { validationResult } = require('express-validator');

const signup = async (req, res, next) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: 'Validation failed',
                errors: errors.array()
            });
        }

        const { username, email, password } = req.body;

        const existingUser = await User.findOne({
            $or: [
                { username: username.trim() },
                { email: email.trim().toLowerCase() }
            ]
        });

        if (existingUser) {
            return res.status(409).json({
                message: 'Username or email already exists'
            });
        }

        const user = await User.create({
            username: username.trim(),
            email: email.trim().toLowerCase(),
            password
        });

        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                message: 'Username or email already exists'
            });
        }

        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        const identifier = username || email;

        if (!identifier || typeof identifier !== 'string' ||
            !password || typeof password !== 'string') {
            return res.status(400).json({
                message: 'Username or email and password are required'
            });
        }

        const user = await User.findOne({
            $or: [
                { username: identifier.trim() },
                { email: identifier.trim().toLowerCase() }
            ]
        }).select('+password');

        if (!user) {
            return res.status(401).json({
                message: 'Invalid credentials'
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                message: 'Invalid credentials'
            });
        }

        const token = jwt.sign(
            { userId: user._id.toString() },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        next(error);
    }
};


module.exports = { signup, login };
