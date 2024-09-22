// src/api/v1/services/taskService.js

import Task from '../models/taskModel.js';
import CustomError from '../../../errors/CustomError.js';
import logger from '../../../utils/logger.js';

export const createTask = async (taskData) => {
    try {
        const newTask = new Task(taskData);
        await newTask.save();
        return newTask;
    } catch (error) {
        // Loguear el mensaje completo y el stack trace del error
        logger.error(`Error al crear la tarea: ${error.message}`, error);

        // También incluir el error original en la instancia de CustomError para que sea más fácil rastrear el problema
        throw new CustomError(`Error al crear la tarea: ${error.message}`, 500);
    }
};

export const getAllTasks = async () => {
    try {
        return await Task.find({}).populate('workers assigned_by');
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
