// src/api/v1/routes/authRoutes.js
import express from 'express';
import { registerController, loginController, getAuthenticatedUserController } from '../controllers/authController.js';
import { createUserSchema } from '../validations/userValidation.js';
import { hashPassword } from '../middlewares/hashPasswordMiddleware.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import authRateLimiter from '../middlewares/rateLimiterMiddleware.js';

const router = express.Router();

// router.post('/register', (req, res, next) => {
router.post('/register', authMiddleware, (req, res, next) => {
    const { error } = createUserSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
}, hashPassword, registerController);

router.post('/login', authRateLimiter, loginController);
router.post('/login', /*authRateLimiter,*/ loginController);

router.post('/me', authMiddleware, getAuthenticatedUserController);
export default router;