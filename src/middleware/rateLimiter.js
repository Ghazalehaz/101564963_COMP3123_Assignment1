
const { rateLimit } = require('express-rate-limit');

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 5,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    message: {
        message: 'Too many requests. Please try again after 15 minutes.'
    }
});

module.exports = authLimiter;
