// src/api/v1/routes/taskRoutes.js

import express from 'express';
import { createTaskController, getAllTasksController, getTaskByIdController, updateTaskController, deleteTaskController } from '../controllers/taskController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import { createTaskSchema, updateTaskSchema } from '../validations/taskValidation.js';

const router = express.Router();

// Validar datos antes de crear una tarea
router.post('/',/*authMiddleware,*/(req, res, next) => {
    const { error } = createTaskSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
}, createTaskController);
router.get('/', getAllTasksController);
router.get('/:id', getTaskByIdController);
router.put('/:id', (req, res, next) => {
    const { error } = updateTaskSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
}, updateTaskController);
router.delete('/:id', deleteTaskController);

export default router;
