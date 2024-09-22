import express from 'express';
import connectDB from './config/db.js'; // Importa la función de conexión
import { MONGO_URI, PORT } from './config/config.js';
import userRoutes from './api/v1/routes/userRoutes.js';
import authRoutes from './api/v1/routes/authRoutes.js';
import taskRoutes from './api/v1/routes/taskRoutes.js';
import corsMiddleware from './api/v1/middlewares/corsMiddleware.js';
import securityMiddleware from './api/v1/middlewares/securityMiddleware.js';
import compressionMiddleware from './api/v1/middlewares/compressionMiddleware.js';
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from './config/swagger.js';
import logger from './utils/logger.js';
import errorHandler from './api/v1/middlewares/errorHandlerMiddleware.js';
import authMiddleware from './api/v1/middlewares/authMiddleware.js';

const app = express();

app.use(securityMiddleware); // Aplica Helmet para la seguridad
// app.use(compressionMiddleware);
app.use(corsMiddleware);
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

connectDB();

app.use('/users', authMiddleware, userRoutes);
app.use('/auth', authRoutes);
app.use('/task', taskRoutes)
app.use(errorHandler);

// Inicia el servidor

app.listen(PORT, () => {
    logger.info(`Servidor ejecutándose en http://localhost:${PORT} en modo ${process.env.NODE_ENV}`);
});

// export default app;