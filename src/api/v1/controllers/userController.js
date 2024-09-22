import { getAllUsers, getUserById, updateUser, deleteUser } from '../services/userService.js';
import logger from '../../../utils/logger.js';
import CustomError from '../../../errors/CustomError.js';

export async function getAllUsersController(req, res, next) {
    try {
        logger.info('Intento de obtener todos los usuarios');

        const { rank, branch, date_joined } = req.query; // Extraer los filtros de los parámetros de consulta

        const filters = {
            rank,
            branch,
            date_joined
        };

        const users = await getAllUsers(filters); // Pasar los filtros al servicio

        res.status(200).json(users);
    } catch (error) {
        if (error instanceof CustomError) {
            return next(error);
        }
        logger.error(`Error inesperado al obtener todos los usuarios: ${error.message}`);
        next(new CustomError('Error al obtener todos los usuarios', 500));
    }
}

export async function getUserByIdController(req, res, next) {
    const userId = req.params.id;
    try {
        logger.info(`Intento de obtener el usuario con ID: ${userId}`);
        const user = await getUserById(userId);
        res.status(200).json(user);
    } catch (error) {
        if (error instanceof CustomError) {
            return next(error);
        }
        logger.error(`Error inesperado al obtener el usuario con ID: ${userId}, Error: ${error.message}`);
        next(new CustomError('Error al obtener el usuario', 500));
    }
}

export async function updateUserController(req, res, next) {
    const userId = req.params.id;
    const userData = req.body;
    try {
        logger.info(`Intento de actualizar el usuario con ID: ${userId}`);
        const updatedUser = await updateUser(userId, userData);
        res.status(200).json(updatedUser);
    } catch (error) {
        if (error instanceof CustomError) {
            return next(error);
        }
        logger.error(`Error inesperado al actualizar el usuario con ID: ${userId}, Error: ${error.message}`);
        next(new CustomError('Error al actualizar el usuario', 500));
    }
}

export async function deleteUserController(req, res, next) {
    const userId = req.params.id;
    try {
        logger.info(`Intento de eliminar el usuario con ID: ${userId}`);
        await deleteUser(userId);
        res.status(204).send(); // Sin contenido
    } catch (error) {
        if (error instanceof CustomError) {
            return next(error);
        }
        logger.error(`Error inesperado al eliminar el usuario con ID: ${userId}, Error: ${error.message}`);
        next(new CustomError('Error al eliminar el usuario', 500));
    }
}