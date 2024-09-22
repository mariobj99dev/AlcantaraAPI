/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Operaciones de gestión de tareas
 */

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Crear una nueva tarea
 *     description: Crea una nueva tarea con los datos proporcionados.
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       201:
 *         description: Tarea creada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         description: Datos de entrada inválidos.
 *       500:
 *         description: Error inesperado en el servidor.
 */

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Obtener todas las tareas
 *     description: Retorna una lista de todas las tareas.
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: Lista de tareas obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *       500:
 *         description: Error inesperado en el servidor.
 */

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Obtener una tarea por ID
 *     description: Retorna una tarea específica basada en su ID.
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la tarea a obtener.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tarea encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       404:
 *         description: Tarea no encontrada.
 *       500:
 *         description: Error inesperado en el servidor.
 */

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Actualizar una tarea
 *     description: Actualiza los detalles de una tarea basada en su ID.
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la tarea a actualizar.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       200:
 *         description: Tarea actualizada correctamente.
 *       400:
 *         description: Datos de entrada inválidos.
 *       404:
 *         description: Tarea no encontrada.
 *       500:
 *         description: Error inesperado en el servidor.
 */

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Eliminar una tarea
 *     description: Elimina una tarea de la base de datos basada en su ID.
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la tarea a eliminar.
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Tarea eliminada exitosamente.
 *       404:
 *         description: Tarea no encontrada.
 *       500:
 *         description: Error inesperado en el servidor.
 */
