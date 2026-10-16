
require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const errorHandler = require('./middleware/errorMiddleware');
const logger = require('./utils/logger');

const app = express();

app.use(helmet());

// Log API requests
app.use((req, res, next) => {
    const startTime = Date.now();

    res.on('finish', () => {
        const logData = {
            method: req.method,
            path: req.path,
            statusCode: res.statusCode,
            responseTime: `${Date.now() - startTime}ms`
        };

        if (res.statusCode >= 400) {
            logger.warn('API request failed', logData);
        } else {
            logger.info('API request completed', logData);
        }

        if (
            req.path === '/api/v1/user/login' ||
            req.path === '/api/v1/user/signup'
        ) {
            logger.info('Authentication attempt', {
                path: req.path,
                statusCode: res.statusCode
            });
        }
    });

    next();
});

app.use(express.json());

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/emp', employeeRoutes);

app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        message: 'Server is running'
    });
});

// Handle unknown routes
app.use((req, res) => {
    res.status(404).json({
        message: 'Route not found'
    });
});

// Centralized error handling
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);

        logger.info('Server started successfully', {
            port: PORT
        });
    });
};

if (process.env.VERCEL === '1') {
    connectDB();
} else {
    startServer();
}

module.exports = app;
