// src/api/v1/controllers/taskController.js

import { createTask, getAllTasks, getTaskById, updateTask, deleteTask } from '../services/taskService.js';
import logger from '../../../utils/logger.js';
import CustomError from '../../../errors/CustomError.js';


export const createTaskController = async (req, res, next) => {
    try {
        const taskData = req.body;
        logger.info('Intento de crear una nueva tarea');
        const newTask = await createTask(taskData);
        res.status(201).json(newTask);
    } catch (error) {
        if (error instanceof CustomError) {
            logger.error(error.message);
            return next(error);
        }
        next(new CustomError('Error al crear la tarea', 500));
    }
};

export const getAllTasksController = async (req, res, next) => {
    try {
        logger.info('Intento de obtener todas las tareas');
        const tasks = await getAllTasks();
        res.status(200).json(tasks);
    } catch (error) {
        logger.error(`Error inesperado al obtener las tareas: ${error.message}`);

        if (error instanceof CustomError) {
            return next(error);
        }
        next(new CustomError('Error al obtener las tareas', 500));
    }
};

export const getTaskByIdController = async (req, res, next) => {
    try {
        const taskId = req.params.id;
        logger.info(`Intento de obtener la tarea con ID: ${taskId}`);
        const task = await getTaskById(taskId);
        res.status(200).json(task);
    } catch (error) {
        if (error instanceof CustomError) {
            return next(error);
        }
        logger.error(`Error inesperado al obtener la tarea: ${error.message}`);
        next(new CustomError('Error al obtener la tarea', 500));
    }
};

export const updateTaskController = async (req, res, next) => {
    try {
        const taskId = req.params.id;
        const taskData = req.body;
        logger.info(`Intento de actualizar la tarea con ID: ${taskId}`);
        const updatedTask = await updateTask(taskId, taskData);
        res.status(200).json(updatedTask);
    } catch (error) {
        if (error instanceof CustomError) {
            return next(error);
        }
        logger.error(`Error inesperado al actualizar la tarea: ${error.message}`);
        next(new CustomError('Error al actualizar la tarea', 500));
    }
};

export const deleteTaskController = async (req, res, next) => {
    try {
        const taskId = req.params.id;
        logger.info(`Intento de eliminar la tarea con ID: ${taskId}`);
        await deleteTask(taskId);
        res.status(204).send(); // Sin contenido
    } catch (error) {
        if (error instanceof CustomError) {
            return next(error);
        }
        logger.error(`Error inesperado al eliminar la tarea: ${error.message}`);
        next(new CustomError('Error al eliminar la tarea', 500));
    }
};
