import Joi from 'joi';

export const createTaskSchema = Joi.object({
    title: Joi.string().min(3).max(255).required(),
    status: Joi.string().valid('to do', 'in progress', 'done', 'blocked').required(),
    branch: Joi.string().valid('Industry', 'Civil', 'Primary').required(),
    description: Joi.string().optional(),
    workers: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)), // Validación de ObjectId
    tasks: Joi.array().items(Joi.string()),
    due_date: Joi.alternatives().try(
        Joi.string().valid('infinite'),
        Joi.date()
    ).required(),
    priority: Joi.string().valid('low', 'medium', 'high').required(),
    assigned_by: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(), // Validación de ObjectId
});

export const updateTaskSchema = Joi.object({
    title: Joi.string().min(3).max(255),
    status: Joi.string().valid('to do', 'in progress', 'done', 'blocked'),
    branch: Joi.string().valid('Industry', 'Civil', 'Primary'),
    description: Joi.string().optional(),
    workers: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)),
    tasks: Joi.array().items(Joi.string()),
    due_date: Joi.alternatives().try(
        Joi.string().valid('infinite'),
        Joi.date()
    ),
    priority: Joi.string().valid('low', 'medium', 'high'),
    assigned_by: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
});