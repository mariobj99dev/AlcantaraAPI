import User from '../models/userModel.js';
import logger from '../../../utils/logger.js';
import CustomError from '../../../errors/CustomError.js';

export async function getAllUsers(filters = {}) {
    try {
        const query = {};

        // Agregar filtros condicionalmente
        if (filters.rank) {
            query.rank = filters.rank;
        }

        if (filters.branch) {
            query.branch = filters.branch;
        }

        if (filters.date_joined) {
            query.date_joined = { $gte: new Date(filters.date_joined) }; // Filtra por fecha de unión mayor o igual a la especificada
        }

        const users = await User.find(query);
        logger.info('Usuarios obtenidos correctamente');
        return users;
    } catch (error) {
        logger.error('Error al obtener todos los usuarios: ' + error.message);
        throw new CustomError('Error al obtener todos los usuarios', 500);
    }
}

export async function getUserById(userId) {
    try {
        const user = await User.findById(userId);
        if (!user) {
            logger.warn(`Usuario no encontrado con ID: ${userId}`);
            throw new CustomError('Usuario no encontrado', 404);
        }
        return user;
    } catch (error) {
        if (!(error instanceof CustomError)) {
            logger.error('Error inesperado al obtener el usuario: ' + error.message);
            throw new CustomError('Error al obtener el usuario', 500);
        }
        throw error;
    }
}

export async function updateUser(userId, userData) {
    try {
        const updatedUser = await User.findByIdAndUpdate(userId, userData, { new: true });
        if (!updatedUser) {
            logger.warn(`Usuario no encontrado con ID: ${userId}`);
            throw new CustomError('Usuario no encontrado', 404);
        }
        logger.info(`Usuario con ID: ${userId} actualizado correctamente`);
        return updatedUser;
    } catch (error) {
        if (!(error instanceof CustomError)) {
            logger.error('Error inesperado al actualizar el usuario: ' + error.message);
            throw new CustomError('Error al actualizar el usuario', 500);
        }
        throw error;
    }
}

export async function deleteUser(userId) {
    try {
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            logger.warn(`Usuario no encontrado con ID: ${userId}`);
            throw new CustomError('Usuario no encontrado', 404);
        }
        logger.info(`Usuario con ID: ${userId} eliminado correctamente`);
        return deletedUser;
    } catch (error) {
        if (!(error instanceof CustomError)) {
            logger.error('Error inesperado al eliminar el usuario: ' + error.message);
            throw new CustomError('Error al eliminar el usuario', 500);
        }
        throw error;
    }
}