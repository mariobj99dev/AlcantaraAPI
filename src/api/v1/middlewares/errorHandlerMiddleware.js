import logger from '../../../utils/logger.js';

const errorHandlerMiddleware = (err, req, res, next) => {
    // Log del error completo con la pila (stack) para el desarrollador
    logger.error(err.stack);

    // Si es un error de validación o un error conocido, responde con el código de estado y mensaje correspondiente
    if (err.statusCode) {
        return res.status(err.statusCode).json({ message: err.message });
    }

    // Para errores desconocidos, devuelve un 500 y un mensaje genérico
    res.status(500).json({
        message: 'Ocurrió un error en el servidor. Por favor, inténtalo más tarde.'
    });
};

export default errorHandlerMiddleware;
