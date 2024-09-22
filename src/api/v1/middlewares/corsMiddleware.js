// src/api/v1/middlewares/corsMiddleware.js
import cors from 'cors';

const corsOptions = {
    origin: ['http://localhost:5173', 'http://localhost:5174', 'https://kkrhfxq4-5173.uks1.devtunnels.ms'],  // Cambia esto a tu origen específico
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
};

const corsMiddleware = cors(corsOptions);

export default corsMiddleware;
