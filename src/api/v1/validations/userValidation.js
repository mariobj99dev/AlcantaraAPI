import Joi from 'joi';

// Esquema de validación para crear un nuevo usuario con saneamiento
export const createUserSchema = Joi.object({
    nickname: Joi.string().min(4).trim().required(),
    username: Joi.string().min(4).trim().required(),
    password: Joi.string().min(8).required(),
    rank: Joi.string().valid('Grand Master', 'Master', 'Superior Official', 'Official', 'Acolyte').required(),
    branch: Joi.string().valid('Industrial', 'Civil', 'Primary').required()
});

// Esquema de validación para actualizar un usuario con saneamiento
export const updateUserSchema = Joi.object({
    nickname: Joi.string().min(4).trim(),
    username: Joi.string().min(4).trim(),
    password: Joi.string().min(8),
    rank: Joi.string().valid('Grand Master', 'Master', 'Superior Official', 'Official', 'Acolyte'),
    branch: Joi.string().valid('Industrial', 'Civil', 'Primary')
});
