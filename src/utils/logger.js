const winston = require('winston');
const path = require('path');
const fs = require('fs');

const isVercel = process.env.VERCEL === '1';

const transports = [];

if (isVercel) {
    // Logging on Vercel
    transports.push(
        new winston.transports.Console()
    );
} else {
    // Logging on my local computer
    const logDirectory = path.join(__dirname, '../../logs');

    if (!fs.existsSync(logDirectory)) {
        fs.mkdirSync(logDirectory, { recursive: true });
    }

    transports.push(
        new winston.transports.File({
            filename: path.join(logDirectory, 'application.log')
        })
    );
}

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: transports
});

module.exports = logger;