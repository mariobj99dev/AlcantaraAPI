import { createLogger, format, transports } from 'winston';
import path from 'path';

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
    transports: []
});

// Si NO estamos en Vercel, añadimos los transportes de archivo
if (process.env.VERCEL !== '1') {
    logger.add(new transports.File({ filename: path.join('src', 'logs', 'error.log'), level: 'error' }));
    logger.add(new transports.File({ filename: path.join('src', 'logs', 'trace.log'), level: 'info' }));
    logger.add(new transports.File({ filename: path.join('src', 'logs', 'combined.log') }));
}

// Mostrar en consola siempre
logger.add(new transports.Console({
    format: combine(
        colorize(),
        logFormat
    )
}));

export default logger;
