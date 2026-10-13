
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            message: 'Access denied. No token provided.'
        });
    }

    const token = authHeader.substring(7).trim();

    if (!token) {
        return res.status(401).json({
            message: 'Access denied. No token provided.'
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!mongoose.isValidObjectId(decoded.userId)) {
            return res.status(401).json({
                message: 'Invalid token'
            });
        }

        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(401).json({
                message: 'Invalid token'
            });
        }

        req.user = { id: user._id.toString() };

        next();

    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                message: 'Token expired'
            });
        }

        if (error.name === 'JsonWebTokenError' ||
            error.name === 'NotBeforeError') {
            return res.status(401).json({
                message: 'Invalid token'
            });
        }

        next(error);
    }
};

module.exports = authMiddleware;
