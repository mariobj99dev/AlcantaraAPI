import logger from '../utils/logger.js';

class CustomError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);

        // Log del error personalizado
        logger.error(`CustomError: ${message} - StatusCode: ${statusCode}`);
    }
}

export default CustomError;
