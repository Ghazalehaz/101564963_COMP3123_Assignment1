
const winston = require('winston');
const path = require('path');
const fs = require('fs');

const logDirectory = path.join(__dirname, '../../logs');

if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory, { recursive: true });
}

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.File({
            filename: path.join(logDirectory, 'application.log')
        })
    ]
});

module.exports = logger;
