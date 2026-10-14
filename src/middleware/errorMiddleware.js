const logger = require('../utils/logger');
const errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({
            message: 'Invalid JSON format'
        });
    }

    if (err.code === 11000) {
        return res.status(409).json({
            message: 'Duplicate data already exists'
        });
    }

    if (err.name === 'ValidationError') {
        return res.status(400).json({
            message: 'Validation failed'
        });
    }

    if (err.name === 'CastError') {
        return res.status(400).json({
            message: 'Invalid ID format'
        });
    }

       logger.error('Unexpected server error', {
        method: req.method,
        path: req.path,
        statusCode: 500,
        errorType: err.name
    });

    return res.status(500).json({
        message: 'Internal server error'
    });
};

module.exports = errorHandler;
