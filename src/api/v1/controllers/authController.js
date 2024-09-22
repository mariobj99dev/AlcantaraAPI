import { registerUser, loginUser, getUserFromToken } from '../services/authService.js';
import logger from '../../../utils/logger.js';
import CustomError from '../../../errors/CustomError.js';

export const registerController = async (req, res, next) => {
    const user = req.body;

    try {
        logger.info(`Intento de registro para el usuario: ${user.username}`);

        await registerUser(user);

        res.status(201).json({ message: 'Usuario registrado correctamente.' });
    } catch (error) {
        if (error instanceof CustomError) {
            // Si es un CustomError, dejamos que el middleware de errores lo maneje
            return next(error);
        }
        // Si es otro tipo de error, lo convertimos en un CustomError
        next(new CustomError('Error en el registro del usuario', 500));
    }
};

export const loginController = async (req, res, next) => {
    const { username, password } = req.body;

    try {
        logger.info(`Intento de login para el usuario: ${username}`);

        const token = await loginUser(username, password);

        res.status(200).json({ token });
    } catch (error) {
        if (error instanceof CustomError) {
            // Si es un CustomError, dejamos que el middleware de errores lo maneje
            return next(error);
        }
        // Si es otro tipo de error, lo convertimos en un CustomError
        next(new CustomError('Error en el login del usuario', 500));
    }
};

export const getAuthenticatedUserController = async (req, res, next) => {
    try {
        const userId = req.user.userId; // Obtener el userId del token decodificado
        logger.info(`Intento de obtener datos del usuario con ID: ${userId}`);

        const user = await getUserFromToken(userId);

        res.status(200).json(user);
    } catch (error) {
        if (error instanceof CustomError) {
            return next(error);
        }
        next(new CustomError('Error al obtener los datos del usuario.', 500));
    }
};