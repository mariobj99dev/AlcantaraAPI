/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID de la tarea.
 *         title:
 *           type: string
 *           description: Título de la tarea.
 *         status:
 *           type: string
 *           description: Estado de la tarea.
 *           enum: ['to do', 'in progress', 'done', 'blocked']
 *         branch:
 *           type: string
 *           description: Rama a la que pertenece la tarea.
 *           enum: ['Industry', 'Civil', 'Primary']
 *         description:
 *           type: string
 *           description: Descripción de la tarea.
 *         workers:
 *           type: array
 *           items:
 *             type: string
 *             description: ID de los trabajadores asignados.
 *         tasks:
 *           type: array
 *           items:
 *             type: string
 *             description: Subtareas o pasos específicos de la tarea.
 *         created_at:
 *           type: string
 *           format: date
 *           description: Fecha de creación de la tarea.
 *         due_date:
 *           type: string
 *           description: Fecha límite de la tarea o "infinite" si no tiene límite.
 *         priority:
 *           type: string
 *           description: Prioridad de la tarea.
 *           enum: ['low', 'medium', 'high']
 *         assigned_by:
 *           type: string
 *           description: ID del usuario que asignó la tarea.
 *       required:
 *         - title
 *         - status
 *         - branch
 *         - due_date
 *         - priority
 *         - assigned_by
 */
