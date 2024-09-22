import mongoose from 'mongoose';
import { MONGO_URI } from './config.js';
import logger from '../utils/logger.js';

const connectDB = async () => {
    mongoose.connect(MONGO_URI)
        .then(() => logger.info('Conectado a MongoDB'))
        .catch(err => {
            logger.error('Error conectando a MongoDB:', err);
            throw new CustomError('No se pudo conectar a la base de datos', 500);
        });
};

export default connectDB;
