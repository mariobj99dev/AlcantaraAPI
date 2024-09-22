// config.js
import dotenv from 'dotenv';

// Determinar si estamos en desarrollo o producción (o algún otro entorno)
const ENVIRONMENT = process.env.NODE_ENV || 'development';

// Cargar el archivo .env correspondiente según el entorno
dotenv.config({ path: ENVIRONMENT === 'production' ? './src/config/env/prod.env' : './src/config/env/dev.env' });

// Exportar las variables de entorno
export const JWT_SECRET = process.env.JWT_SECRET;
export const MONGO_URI = process.env.MONGO_URI;
export const PORT = process.env.PORT || 3000;
export const IS_PRODUCTION = ENVIRONMENT === 'production';
