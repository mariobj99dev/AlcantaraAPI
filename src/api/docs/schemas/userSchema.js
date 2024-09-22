/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - password
 *         - nickname
 *         - rank
 *         - branch
 *       properties:
 *         nickname:
 *           type: string
 *           description: Apodo del usuario
 *           example: johndoe
 *         username:
 *           type: string
 *           description: Nombre de usuario único
 *           example: john123
 *         password:
 *           type: string
 *           description: Contraseña del usuario
 *           example: password123
 *         rank:
 *           type: string
 *           description: Rango del usuario
 *           example: Grand Master
 *         branch:
 *           type: string
 *           description: Rama a la que pertenece el usuario
 *           example: Industrial
 */
