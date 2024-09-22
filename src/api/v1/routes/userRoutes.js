import express from 'express';
import { getAllUsersController, getUserByIdController, updateUserController, deleteUserController } from '../controllers/userController.js';
import { updateUserSchema } from '../validations/userValidation.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', /*authMiddleware, */getAllUsersController);

router.get('/:id', getUserByIdController);

router.put('/:id', (req, res, next) => {
    const { error } = updateUserSchema.validate(req.body);
    if (error) {

        return res.status(400).json({ error: error.details[0].message });
    }
    next();
}, updateUserController);


router.delete('/:id', deleteUserController);

export default router;
