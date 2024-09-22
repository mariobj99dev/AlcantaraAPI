// src/api/v1/services/taskService.js

import Task from '../models/taskModel.js';
import CustomError from '../../../errors/CustomError.js';
import logger from '../../../utils/logger.js';
import User from '../models/userModel.js';

export const createTask = async (taskData) => {
    try {
        const workerIds = taskData.workers || [];
        const assignedById = taskData.assigned_by;

        const allUserIds = [...workerIds, assignedById];

        // Validar que todos los usuarios existan, deteniendo en el primer error
        for (const userId of allUserIds) {
            const userExists = await User.exists({ _id: userId });
            if (!userExists) {
                throw new CustomError(`No se ha podido crear la tarea porque el usuario con ID ${userId} no existe.`, 400);
            }
        }

        // Crear la tarea si todos los usuarios existen
        const newTask = new Task(taskData);
        await newTask.save();
        return newTask;
    } catch (error) {
        logger.error(`Error al crear la tarea: ${error.message}`);
        throw error; // Re-lanzar el error para que sea manejado por el controlador
    }
};

export const getAllTasks = async () => {
    try {
        return await Task.find({}).populate({
            path: 'workers assigned_by',
            select: '-password' // Excluir la contraseña
        });
    } catch (error) {
        logger.error(`Error al crear la tarea: ${error.message}`, error);
        throw new CustomError('Error al obtener las tareas', 500);
    }
};

export const getTaskById = async (taskId) => {
    try {
        const task = await Task.findById(taskId).populate('workers assigned_by');
        if (!task) {
            throw new CustomError('Tarea no encontrada', 404);
        }
        return task;
    } catch (error) {
        throw new CustomError('Error al obtener la tarea', 500);
    }
};

export const updateTask = async (taskId, taskData) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(taskId, taskData, { new: true }).populate('workers assigned_by');
        if (!updatedTask) {
            throw new CustomError('Tarea no encontrada', 404);
        }
        return updatedTask;
    } catch (error) {
        throw new CustomError('Error al actualizar la tarea', 500);
    }
};

export const deleteTask = async (taskId) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(taskId);
        if (!deletedTask) {
            throw new CustomError('Tarea no encontrada', 404);
        }
        return deletedTask;
    } catch (error) {
        throw new CustomError('Error al eliminar la tarea', 500);
    }
};
