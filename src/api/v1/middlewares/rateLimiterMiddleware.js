import rateLimit from 'express-rate-limit';
import CustomError from '../../../errors/CustomError.js';

const authRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 5, // Límite de 5 solicitudes por IP por ventana de tiempo
    handler: (req, res, next) => {
        // Lanza un CustomError cuando se excede el límite
        next(new CustomError('Demasiados intentos de inicio de sesión. Por favor, intenta de nuevo más tarde.', 429));
    },
    keyGenerator: (req) => req.ip, // Usar directamente la IP del cliente, evitando problemas con X-Forwarded-For
    standardHeaders: true, // Incluir información en los headers estándar
    legacyHeaders: false, // Desactivar headers heredados
});

export default authRateLimiter;
