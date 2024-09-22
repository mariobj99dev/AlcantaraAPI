// src/utils/logger.js
import { createLogger, format, transports } from 'winston';
import path from 'path';
import { IS_PRODUCTION } from '../config/config.js';

const { combine, timestamp, printf, colorize, errors } = format;

const logFormat = printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} [${level}]: ${stack || message}`;
});

const logger = createLogger({
    level: 'info',
    format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        errors({ stack: true }),
        logFormat
    ),
    transports: [
        new transports.File({ filename: path.join('src', 'logs', 'error.log'), level: 'error' }),
        new transports.File({ filename: path.join('src', 'logs', 'trace.log'), level: 'info' }),
        new transports.File({ filename: path.join('src', 'logs', 'combined.log') })
    ]
});

// Mostrar en consola solo si no estamos en producción
if (!IS_PRODUCTION) {
    logger.add(new transports.Console({
        format: combine(
            colorize(),
            logFormat
        )
    }));
}

export default logger;
