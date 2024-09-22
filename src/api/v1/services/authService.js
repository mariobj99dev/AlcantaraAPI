import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';
import { JWT_SECRET } from '../../../config/config.js';
import logger from '../../../utils/logger.js';
import CustomError from '../../../errors/CustomError.js';

// Registro de usuario
export const registerUser = async (user) => {
    try {
        const existingUser = await User.findOne({ username: user.username });
        if (existingUser) {
            logger.warn(`Intento de registro fallido: El usuario ${user.username} ya existe.`);
            throw new CustomError('El usuario ya existe.', 400);
        }

        const newUser = new User(user);
        await newUser.save();

        logger.info(`Registro exitoso para el usuario: ${user.username}`);
        return newUser;
    } catch (error) {
        if (!(error instanceof CustomError)) {
            logger.error(`Error inesperado al registrar el usuario: ${user.username}, ${error.message}`);
            throw new CustomError('Error al registrar el usuario', 500);
        }
        throw error;
    }
};
// Login de usuario
export const loginUser = async (username, password) => {
    try {
        const user = await User.findOne({ username });
        if (!user) {
            logger.warn(`Intento de login fallido: Usuario ${username} no encontrado.`);
            throw new CustomError('Credenciales incorrectas.', 401);
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            logger.warn(`Intento de login fallido: Contraseña incorrecta para el usuario ${username}.`);
            throw new CustomError('Credenciales incorrectas.', 401);
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
        // const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
        logger.info(`Login exitoso para el usuario: ${username}`);

        return token;
    } catch (error) {
        if (!(error instanceof CustomError)) {
            logger.error(`Error inesperado en el proceso de login para el usuario: ${username}, ${error.message}`);
            throw new CustomError('Error en el proceso de login', 500);
        }
        throw error;
    }
};

// Obtener usuario a través del token
export const getUserFromToken = async (userId) => {
    try {
        const user = await User.findById(userId).select('-password'); // Excluir la contraseña
        if (!user) {
            throw new CustomError('Usuario no encontrado.', 404);
        }
        return user;
    } catch (error) {
        if (!(error instanceof CustomError)) {
            throw new CustomError('Error al obtener el usuario.', 500);
        }
        throw error;
    }
};