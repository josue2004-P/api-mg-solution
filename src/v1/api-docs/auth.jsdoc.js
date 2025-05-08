/**
 * @swagger
 * /api/v1/auth:
 *   post:
 *     summary: Iniciar sesión
 *     description: Autentica un usuario existente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - sEmail
 *               - sPassword
 *             properties:
 *               sEmail:
 *                 type: string
 *                 format: email
 *                 example: "usuario@ejemplo.com"
 *               sPassword:
 *                 type: string
 *                 format: password
 *                 example: "contraseña123"
 *     responses:
 *       200:
 *         description: Autenticación exitosa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: Datos de entrada inválidos
 *       401:
 *         description: Credenciales inválidas
 *       422:
 *         description: Validación de campos fallida
 *
 * /auth/new:
 *   post:
 *     summary: Crear nuevo usuario
 *     description: Registra un nuevo usuario en el sistema
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - sNombre
 *               - sApellidoPaterno
 *               - sApellidoMaterno
 *               - sUsuario
 *               - sEmail
 *               - sPassword
 *             properties:
 *               sNombre:
 *                 type: string
 *                 example: "Juan"
 *               sApellidoPaterno:
 *                 type: string
 *                 example: "Pérez"
 *               sApellidoMaterno:
 *                 type: string
 *                 example: "González"
 *               sUsuario:
 *                 type: string
 *                 example: "juanpg"
 *               sEmail:
 *                 type: string
 *                 format: email
 *                 example: "juan@ejemplo.com"
 *               sPassword:
 *                 type: string
 *                 format: password
 *                 example: "contraseña123"
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Usuario creado exitosamente"
 *       400:
 *         description: Datos de entrada inválidos
 *       422:
 *         description: Validación de campos fallida
 *       409:
 *         description: Email o usuario ya existente
 *
 * /auth/renew:
 *   get:
 *     summary: Revalidar token
 *     description: Obtiene un nuevo token de autenticación
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Token renovado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       401:
 *         description: Token inválido o expirado
 */

// Añade este componente para la autenticación
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */