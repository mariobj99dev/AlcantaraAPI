// src/api/v1/middlewares/hashPasswordMiddleware.js
import bcrypt from 'bcryptjs';

export const hashPassword = async (req, res, next) => {
    const { password } = req.body;

    if (!password) {
        return res.status(400).json({ message: 'La contraseña es requerida.' });
    }

    try {
        // Generar salt y encriptar la contraseña
        const SALT_TIMES = process.env.SALT_TIMES;

        const salt = await bcrypt.genSalt(parseInt(SALT_TIMES));
        req.body.password = await bcrypt.hash(password, salt);  // Reemplazar la contraseña con la versión encriptada

        next();  // Continuar al siguiente middleware o controlador
    } catch (error) {
        return res.status(500).json({ message: 'Error encriptando la contraseña.' });
    }
};
