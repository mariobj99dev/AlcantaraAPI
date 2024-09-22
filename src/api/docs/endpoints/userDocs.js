/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Operaciones de gestión de Users
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Obtener todos los Users con filtros opcionales
 *     description: Retorna una lista de todos los Users con la posibilidad de aplicar filtros por rank, branch y date_joined.
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: rank
 *         schema:
 *           type: string
 *         description: Filtrar Users por rango.
 *       - in: query
 *         name: branch
 *         schema:
 *           type: string
 *         description: Filtrar Users por rama.
 *       - in: query
 *         name: date_joined
 *         schema:
 *           type: string
 *           format: date
 *         description: Filtrar Users por fecha de unión (en formato YYYY-MM-DD).
 *     responses:
 *       200:
 *         description: Lista de Users obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       400:
 *         description: Parámetros de filtro inválidos.
 */

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Obtener un usuario por ID
 *     description: Retorna un usuario específico basado en su ID.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuario no encontrado.
 */

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Actualizar un usuario
 *     description: Actualiza los detalles de un usuario basado en su ID.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a actualizar.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente.
 *       400:
 *         description: Error de validación.
 */

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Eliminar un usuario
 *     description: Elimina un usuario de la base de datos basado en su ID.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a eliminar.
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Usuario eliminado exitosamente.
 *       404:
 *         description: Usuario no encontrado.
 */
