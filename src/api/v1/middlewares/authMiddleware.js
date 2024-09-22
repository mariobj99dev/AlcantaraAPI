// src/api/v1/middlewares/authMiddleware.js
import jwt from 'jsonwebtoken';
import CustomError from '../../../errors/CustomError.js';
const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        // Usar CustomError para manejar el error de token faltante
        return next(new CustomError('Acceso denegado. No hay token.', 401));
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return next(new CustomError('Token ha caducado.', 401));
        }
        return next(new CustomError('Token no válido.', 401));
    }
};

export default authMiddleware;
